const API_URL = (process.env.EXPO_PUBLIC_API_URL || "https://vm-nexus-api.onrender.com").replace(/\/$/, "");

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(payload.error || "Não foi possível conectar ao StudyCode.");
    error.status = response.status;
    throw error;
  }
  return payload;
}

export function registerStudent({ name, email, password, acceptedTerms, legalVersion }) {
  return request("/api/studycode/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password, acceptedTerms, legalVersion }),
  });
}

export function loginStudent({ email, password }) {
  return request("/api/studycode/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function refreshStudent(refreshToken) {
  return request("/api/studycode/auth/refresh", {
    method: "POST",
    body: JSON.stringify({ refreshToken }),
  });
}

export function getStudyCodeCatalog() {
  return request("/api/studycode/catalog?productKey=studycode");
}

export function getStudyCodeApiUrl() {
  return API_URL;
}
