import axios from "axios";

export type role = 3 | 2 | 1;
export type TokenPayload = {
  sub?: string;
  email?: string;
  role?: role | string | number;
};

function decodeBase64Url(value: string) {
  const normalizedValue = value.replace(/-/g, "+").replace(/_/g, "/");
  const paddedValue = normalizedValue.padEnd(
    Math.ceil(normalizedValue.length / 4) * 4,
    "=",
  );

  return window.atob(paddedValue);
}

function normalizeUserRole(value: TokenPayload["role"]) {
  if (value === 1 || value === 2 || value === 3) {
    return value;
  }

  if (value === "1" || value === "2" || value === "3") {
    return Number(value) as role;
  }

  return null;
}

export function getToken() {
  return localStorage.getItem("token");
}

export function setToken(token: string) {
  return localStorage.setItem("token", token);
}

export function clearToken() {
  localStorage.removeItem("token");
}

export function getTokenPayload() {
  const token = getToken();

  if (!token) {
    return null;
  }

  try {
    const payload = token.split(".")[1];

    if (!payload) {
      return null;
    }

    return JSON.parse(decodeBase64Url(payload)) as TokenPayload;
  } catch (_error) {
    return null;
  }
}

export function getUserRole() {
  return normalizeUserRole(getTokenPayload()?.role);
}

export async function IsLoggedIn() {
  const token = getToken();

  if (!token) {
    return false;
  }

  try {
    const res = await axios.get("http://localhost:3000/api/auth/user/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.status === 200;
  } catch (_error) {
    console.log("Token invalido ou expirado");
    clearToken();
    return false;
  }
}
