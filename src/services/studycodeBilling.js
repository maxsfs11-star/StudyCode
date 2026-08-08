const BILLING_API_URL = (
  process.env.EXPO_PUBLIC_BILLING_API_URL ||
  process.env.EXPO_PUBLIC_API_URL ||
  "https://studycode-billing.onrender.com"
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
  });
}

export function getSubscriptionStatus(token) {
  return request("/api/studycode/billing/status", { token });
}

export function getBillingHistory(token) {
  return request("/api/studycode/billing/history", { token });
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
