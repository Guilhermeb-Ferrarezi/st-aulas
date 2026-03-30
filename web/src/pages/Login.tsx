import axios from "axios";
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IsLoggedIn, setToken } from "../auth/auth";

type MessageType = "error" | "success";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<MessageType>("error");
  const [isLogged, setIsLogged] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = async () => {
      const logged = await IsLoggedIn();
      setIsLogged(Boolean(logged));
    };

    checkLogin();
  }, []);

  useEffect(() => {
    if (isLogged) {
      navigate("/home");
    }
  }, [isLogged, navigate]);

  function clearMessage() {
    if (message) {
      setMessage("");
    }
  }

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", {
        email: email.trim(),
        password,
      });

      setMessageType("success");
      setMessage(res.data.message);
      setToken(res.data.token);

      setTimeout(() => {
        navigate("/home");
      }, 1500);
    } catch (err) {
      const errorMessage = axios.isAxiosError(err)
        ? err.response?.data?.message || "Erro ao fazer login"
        : "Erro ao fazer login";

      setMessageType("error");
      setMessage(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f5f5f3] px-4 py-10 text-[#11213d] sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl items-center justify-center">
        <section className="w-full max-w-[25rem] rounded-[1.75rem] border border-[#d8d8d4] bg-[#fbfbfa] p-8 shadow-[0_18px_60px_rgba(17,33,61,0.08)] sm:p-10">
          <header className="mb-8">
            <h1 className="text-[2rem] leading-none font-semibold tracking-[-0.08em] text-[#0e1b33]">
              Bem-vindo de volta.
            </h1>
            <p className="mt-3 text-sm leading-6 text-[#5f7399]">
              Entre para continuar sua jornada.
            </p>
          </header>

          <form className="space-y-5" onSubmit={handleLogin}>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm text-[#0e1b33]">
                Email
              </label>
              <input
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  clearMessage();
                }}
                type="email"
                name="email"
                placeholder="joao@exemplo.com"
                autoComplete="email"
                required
                className="h-12 w-full rounded-xl border border-[#d8dde7] bg-white px-4 text-[0.95rem] text-[#44638f] outline-none transition focus:border-[#0e1b33]"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm text-[#0e1b33]"
              >
                Senha
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  clearMessage();
                }}
                placeholder="Digite sua senha"
                autoComplete="current-password"
                required
                className="h-12 w-full rounded-xl border border-[#d8dde7] bg-white px-4 text-[0.95rem] text-[#44638f] outline-none transition focus:border-[#0e1b33]"
              />
            </div>

            <p
              className={`text-center text-sm ${
                messageType === "success" ? "text-green-700" : "text-red-600"
              }`}
              aria-live="polite"
            >
              {message}
            </p>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 h-12 w-full rounded-xl bg-[#151f31] text-sm font-semibold text-white transition hover:bg-[#0e1726] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm leading-6 text-[#5f7399]">
            Ainda nao tem conta?{" "}
            <Link
              to="/cadastro"
              className="font-semibold text-[#0e1b33] transition hover:text-[#1f3b69]"
            >
              Criar conta
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
