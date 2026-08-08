const BILLING_API_URL = (
  process.env.EXPO_PUBLIC_BILLING_API_URL ||
  process.env.EXPO_PUBLIC_API_URL ||
  // O VM Nexus API é a fonte oficial de planos, valores e pagamentos.
  "https://vm-nexus-api.onrender.com"
).replace(/\/$/, "");

async function request(path, { token, method = "GET", body } = {}) {
  const response = await fetch(`${BILLING_API_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(payload.error || "Não foi possível consultar a assinatura.");
    error.status = response.status;
    throw error;
  }
  return payload;
}

export async function getStudyCodeCatalog() {
  return request("/api/studycode/catalog?productKey=studycode");
}

export function createPremiumCheckout({ token, student, tenantId }) {
  return request("/api/studycode/billing/checkout-session", {
    method: "POST",
    token,
    body: {
      tenant_id: tenantId || null,
      student: {
        id: student?.id,
        name: student?.name,
        email: student?.email,
      },
    },
  }).then((payload) => ({ ...payload, checkoutUrl: payload.checkoutUrl || payload.url }));
}

export async function getSubscriptionStatus(token) {
  const payload = await request("/api/studycode/billing/status", { token });
  const subscription = payload.subscription;
  return {
    subscription: subscription ? {
      ...subscription,
      planId: subscription.plan_slug || subscription.plan_id || subscription.planId || "free",
      nextBillingAt: subscription.next_billing_at || subscription.nextBillingAt,
    } : { planId: "free", status: "cancelled" },
  };
}

export async function getBillingHistory(token) {
  const payload = await request("/api/studycode/billing/history", { token });
  const payments = payload.payments || payload.history || [];
  return {
    history: payments.map((payment) => ({
      ...payment,
      planId: payment.plan_slug || payment.planId,
      createdAt: payment.created_at || payment.createdAt,
      amountCents: Math.round(Number(payment.amount || 0) * 100),
    })),
  };
}

export function cancelPremiumSubscription(token) {
  return request("/api/studycode/billing/cancel", {
    method: "POST",
    token,
  });
}

export function getBillingApiUrl() {
  return BILLING_API_URL;
}
