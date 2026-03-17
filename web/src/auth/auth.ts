import axios from "axios";

export type role = "admin" | "professor" | "aluno";

export function getToken() {
  return localStorage.getItem("token");
}

export function setToken(token: string) {
  return localStorage.setItem("token", token);
}

export async function IsLoggedIn() {
  const token = getToken();

  if (!token) {
    return false;
  }

  if (token) {
    try {
      const res = await axios.get("http://localhost:3000/api/auth/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        return true;
      }
      return false;
    } catch (error) {
      console.log("Token inválido ou expirado");
      localStorage.removeItem("token");
      return false;
    }
  }
}
