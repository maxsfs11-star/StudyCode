import "dotenv/config";
import crypto from "node:crypto";
import { createServer } from "node:http";
import jwt from "jsonwebtoken";
import pg from "pg";
import Stripe from "stripe";

const { Pool } = pg;
const PORT = Number(process.env.PORT || 8790);
const MAX_BODY_SIZE = 64 * 1024;
const STUDYCODE_PRODUCT_ID = "StudyCode";
const PREMIUM_PLAN_ID = "premium";

const required = [
  "DATABASE_URL",
  "JWT_SECRET",
  "STRIPE_SECRET_KEY",
  "STRIPE_WEBHOOK_SECRET",
  "STRIPE_PRICE_PREMIUM_ID",
];
for (const name of required) {
  if (!process.env[name]) throw new Error(`Variável obrigatória ausente: ${name}`);
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const jwtSecret = process.env.JWT_SECRET;

async function migrate() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS studycode_subscriptions (
      id UUID PRIMARY KEY,
      student_id TEXT NOT NULL,
      tenant_id TEXT,
      product_id TEXT NOT NULL,
      plan_id TEXT NOT NULL,
      status TEXT NOT NULL CHECK (status IN ('pending','active','expired','cancelled','failed')),
      stripe_customer_id TEXT,
      stripe_subscription_id TEXT,
      stripe_checkout_session_id TEXT UNIQUE,
      stripe_payment_intent_id TEXT UNIQUE,
      amount_cents INTEGER NOT NULL DEFAULT 0,
      currency TEXT NOT NULL DEFAULT 'brl',
      payment_method TEXT,
      started_at TIMESTAMPTZ,
      next_billing_at TIMESTAMPTZ,
      cancelled_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    CREATE INDEX IF NOT EXISTS studycode_subscriptions_student_idx
      ON studycode_subscriptions(student_id, updated_at DESC);
    CREATE TABLE IF NOT EXISTS studycode_payment_events (
      stripe_event_id TEXT PRIMARY KEY,
      event_type TEXT NOT NULL,
      checkout_session_id TEXT,
      payment_intent_id TEXT,
      payload JSONB NOT NULL,
      received_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
}

function sendJson(response, status, body) {
  response.writeHead(status, {
    "Access-Control-Allow-Origin": process.env.CORS_ORIGIN || "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, Stripe-Signature",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Content-Type": "application/json; charset=utf-8",
  });
  response.end(JSON.stringify(body));
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (Buffer.byteLength(body, "utf8") > MAX_BODY_SIZE) {
        reject(new Error("payload_too_large"));
        request.destroy();
      }
    });
    request.on("end", () => resolve(body));
    request.on("error", reject);
  });
}

function authenticatedStudent(request) {
  const token = request.headers.authorization?.replace(/^Bearer\s+/i, "");
  if (!token) throw Object.assign(new Error("Sessão do StudyCode necessária."), { status: 401 });
  const payload = jwt.verify(token, jwtSecret);
  if (payload.role !== "studycode_student" || !payload.sub) {
    throw Object.assign(new Error("Sessão do StudyCode inválida."), { status: 401 });
  }
  return payload;
}

function metadataFor(session) {
  return {
    studyCodeUserId: String(session.metadata?.studyCode_user_id || ""),
    tenantId: session.metadata?.tenant_id || null,
    productId: session.metadata?.product_id || STUDYCODE_PRODUCT_ID,
    planId: session.metadata?.plan_id || PREMIUM_PLAN_ID,
  };
}

function timestampToDate(seconds) {
  return seconds ? new Date(seconds * 1000) : null;
}

async function persistSubscription({ session, status, event }) {
  const metadata = metadataFor(session);
  if (!metadata.studyCodeUserId) throw new Error("checkout_metadata_missing_user");
  if (metadata.productId !== STUDYCODE_PRODUCT_ID || metadata.planId !== PREMIUM_PLAN_ID) {
    throw new Error("checkout_metadata_invalid_product");
  }

  const subscriptionId = typeof session.subscription === "string" ? session.subscription : session.subscription?.id;
  let subscription = null;
  if (subscriptionId) {
    subscription = await stripe.subscriptions.retrieve(subscriptionId);
  }
  const paymentIntentId = typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id;
  const paymentMethod = session.payment_method_types?.[0] || null;
  const amountCents = Number(session.amount_total || session.amount_subtotal || 0);
  const nextBillingAt = subscription?.current_period_end
    ? timestampToDate(subscription.current_period_end)
    : null;
  const startedAt = timestampToDate(session.created) || new Date();

  await pool.query(
    `INSERT INTO studycode_subscriptions
      (id, student_id, tenant_id, product_id, plan_id, status, stripe_customer_id,
       stripe_subscription_id, stripe_checkout_session_id, stripe_payment_intent_id,
       amount_cents, currency, payment_method, started_at, next_billing_at, updated_at)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,NOW())
     ON CONFLICT (stripe_checkout_session_id) DO UPDATE SET
       status = EXCLUDED.status,
       stripe_customer_id = COALESCE(EXCLUDED.stripe_customer_id, studycode_subscriptions.stripe_customer_id),
       stripe_subscription_id = COALESCE(EXCLUDED.stripe_subscription_id, studycode_subscriptions.stripe_subscription_id),
       stripe_payment_intent_id = COALESCE(EXCLUDED.stripe_payment_intent_id, studycode_subscriptions.stripe_payment_intent_id),
       amount_cents = EXCLUDED.amount_cents,
       currency = EXCLUDED.currency,
       payment_method = COALESCE(EXCLUDED.payment_method, studycode_subscriptions.payment_method),
       next_billing_at = EXCLUDED.next_billing_at,
       updated_at = NOW()`,
    [
      crypto.randomUUID(),
      metadata.studyCodeUserId,
      metadata.tenantId,
      metadata.productId,
      metadata.planId,
      status,
      typeof session.customer === "string" ? session.customer : session.customer?.id || null,
      subscriptionId,
      session.id,
      paymentIntentId,
      amountCents,
      session.currency || "brl",
      paymentMethod,
      startedAt,
      nextBillingAt,
    ],
  );

}

async function validatePremiumPrice() {
  const price = await stripe.prices.retrieve(process.env.STRIPE_PRICE_PREMIUM_ID);
  if (price.unit_amount !== 2990 || price.currency !== "brl" || price.type !== "recurring" || price.recurring?.interval !== "month") {
    throw Object.assign(new Error("STRIPE_PRICE_PREMIUM_ID deve ser um preço recorrente mensal de R$ 29,90."), { status: 500 });
  }
  return price;
}

async function createCheckout(request, response) {
  const student = authenticatedStudent(request);
  await validatePremiumPrice();
  const body = JSON.parse(await readBody(request) || "{}");
  const requestedStudent = body.student || {};
  const studentId = String(student.sub);
  const email = String(student.email || requestedStudent.email || "").trim().toLowerCase();
  const name = String(requestedStudent.name || "Estudante").trim().slice(0, 80) || "Estudante";
  if (!email) return sendJson(response, 400, { error: "E-mail do aluno ausente." });

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: process.env.STRIPE_PRICE_PREMIUM_ID, quantity: 1 }],
    customer_email: email,
    success_url: process.env.STRIPE_SUCCESS_URL || "studycode://billing/success",
    cancel_url: process.env.STRIPE_CANCEL_URL || "studycode://billing/cancelled",
    metadata: {
      studyCode_user_id: studentId,
      tenant_id: body.tenant_id ? String(body.tenant_id) : "",
      product_id: STUDYCODE_PRODUCT_ID,
      plan_id: PREMIUM_PLAN_ID,
      student_name: name,
      student_email: email,
      amount_brl: "29.90",
    },
    subscription_data: {
      metadata: {
        studyCode_user_id: studentId,
        tenant_id: body.tenant_id ? String(body.tenant_id) : "",
        product_id: STUDYCODE_PRODUCT_ID,
        plan_id: PREMIUM_PLAN_ID,
      },
    },
  });

  await pool.query(
    `INSERT INTO studycode_subscriptions
      (id, student_id, tenant_id, product_id, plan_id, status, stripe_customer_id,
       stripe_checkout_session_id, amount_cents, currency, created_at, updated_at)
     VALUES ($1,$2,$3,$4,$5,'pending',$6,$7,2990,'brl',NOW(),NOW())
     ON CONFLICT (stripe_checkout_session_id) DO NOTHING`,
    [crypto.randomUUID(), studentId, body.tenant_id || null, STUDYCODE_PRODUCT_ID, PREMIUM_PLAN_ID, session.customer || null, session.id],
  );

  return sendJson(response, 200, { checkoutUrl: session.url, sessionId: session.id, status: "pending" });
}

async function getStatus(request, response) {
  const student = authenticatedStudent(request);
  const result = await pool.query(
    `SELECT plan_id AS "planId", status, amount_cents AS "amountCents", currency,
            payment_method AS "paymentMethod", started_at AS "startedAt",
            next_billing_at AS "nextBillingAt", stripe_subscription_id AS "stripeSubscriptionId"
     FROM studycode_subscriptions WHERE student_id = $1 ORDER BY updated_at DESC LIMIT 1`,
    [student.sub],
  );
  return sendJson(response, 200, { subscription: result.rows[0] || { planId: "free", status: "cancelled" } });
}

async function getHistory(request, response) {
  const student = authenticatedStudent(request);
  const result = await pool.query(
    `SELECT plan_id AS "planId", status, amount_cents AS "amountCents", currency,
            payment_method AS "paymentMethod", started_at AS "startedAt",
            next_billing_at AS "nextBillingAt", stripe_checkout_session_id AS "checkoutSessionId",
            stripe_payment_intent_id AS "paymentIntentId", created_at AS "createdAt"
     FROM studycode_subscriptions WHERE student_id = $1 ORDER BY created_at DESC`,
    [student.sub],
  );
  return sendJson(response, 200, { history: result.rows });
}

async function cancelSubscription(request, response) {
  const student = authenticatedStudent(request);
  const result = await pool.query(
    `SELECT stripe_subscription_id AS "stripeSubscriptionId" FROM studycode_subscriptions
     WHERE student_id = $1 AND status = 'active' AND stripe_subscription_id IS NOT NULL
     ORDER BY updated_at DESC LIMIT 1`,
    [student.sub],
  );
  const stripeSubscriptionId = result.rows[0]?.stripeSubscriptionId;
  if (!stripeSubscriptionId) return sendJson(response, 409, { error: "Nenhuma assinatura ativa encontrada." });
  const cancelled = await stripe.subscriptions.cancel(stripeSubscriptionId);
  await pool.query(
    `UPDATE studycode_subscriptions SET status='cancelled', cancelled_at=NOW(), updated_at=NOW()
     WHERE student_id=$1 AND stripe_subscription_id=$2`,
    [student.sub, stripeSubscriptionId],
  );
  return sendJson(response, 200, { status: cancelled.status === "canceled" ? "cancelled" : "pending" });
}

async function handleWebhook(request, response) {
  const raw = await readBody(request);
  let event;
  try {
    event = stripe.webhooks.constructEvent(raw, request.headers["stripe-signature"], process.env.STRIPE_WEBHOOK_SECRET);
  } catch {
    return sendJson(response, 400, { error: "Assinatura do webhook inválida." });
  }

  const claimed = await pool.query(
    `INSERT INTO studycode_payment_events (stripe_event_id,event_type,checkout_session_id,payment_intent_id,payload)
     VALUES ($1,$2,$3,$4,$5) ON CONFLICT (stripe_event_id) DO NOTHING RETURNING stripe_event_id`,
    [event.id, event.type, event.data.object?.id || null, event.data.object?.payment_intent || null, JSON.stringify({ received: true })],
  );
  if (!claimed.rowCount) return sendJson(response, 200, { received: true, duplicate: true });

  if (["checkout.session.completed", "checkout.session.async_payment_succeeded", "checkout.session.async_payment_failed"].includes(event.type)) {
    const session = event.data.object;
    const status = event.type === "checkout.session.async_payment_failed"
      ? "failed"
      : event.type === "checkout.session.async_payment_succeeded" || session.payment_status === "paid"
        ? "active"
        : "pending";
    try {
      await persistSubscription({ session, status, event });
      await pool.query(
        `UPDATE studycode_payment_events SET payload = $2 WHERE stripe_event_id = $1`,
        [event.id, JSON.stringify({ status, sessionId: session.id })],
      );
    } catch (error) {
      await pool.query("DELETE FROM studycode_payment_events WHERE stripe_event_id = $1", [event.id]);
      throw error;
    }
  } else {
    await pool.query(`UPDATE studycode_payment_events SET payload = $2 WHERE stripe_event_id = $1`, [event.id, JSON.stringify({ ignored: true })]);
  }
  return sendJson(response, 200, { received: true });
}

const server = createServer(async (request, response) => {
  if (request.method === "OPTIONS") {
    response.writeHead(204, {
      "Access-Control-Allow-Origin": process.env.CORS_ORIGIN || "*",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, Stripe-Signature",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    });
    return response.end();
  }
  try {
    if (request.method === "GET" && request.url === "/health") return sendJson(response, 200, { ok: true, provider: "stripe-test-ready" });
    if (request.method === "POST" && request.url === "/api/studycode/billing/checkout-session") return createCheckout(request, response);
    if (request.method === "GET" && request.url === "/api/studycode/billing/status") return getStatus(request, response);
    if (request.method === "GET" && request.url === "/api/studycode/billing/history") return getHistory(request, response);
    if (request.method === "POST" && request.url === "/api/studycode/billing/cancel") return cancelSubscription(request, response);
    if (request.method === "POST" && request.url === "/api/webhooks/stripe") return handleWebhook(request, response);
    return sendJson(response, 404, { error: "not_found" });
  } catch (error) {
    console.error("[studycode-billing]", error);
    return sendJson(response, error.status || 500, { error: error.status ? error.message : "Erro interno no serviço de pagamentos." });
  }
});

await migrate();
server.listen(PORT, () => console.log(`StudyCode Billing API listening on port ${PORT}`));
