import { useState } from "react";
import type { FormEvent } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

type Role = "aluno" | "professor";
type MessageType = "error" | "success";

export default function Cadastro() {
  const [role, setRole] = useState<Role>("aluno");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<MessageType>("error");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  function setFeedback(type: MessageType, text: string) {
    setMessageType(type);
    setMessage(text);
  }

  function clearMessage() {
    if (message) {
      setMessage("");
    }
  }

  function validateForm() {
    const normalizedName = name.trim();
    const normalizedEmail = email.trim();
    const parsedAge = Number(age);

    if (!normalizedName) {
      return "Preencha o seu nome";
    }

    if (!normalizedEmail) {
      return "Preencha o seu email";
    }

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);
    if (!isValidEmail) {
      return "Digite um email valido";
    }

    if (!age) {
      return "Preencha a sua idade";
    }

    if (!Number.isInteger(parsedAge) || parsedAge <= 0) {
      return "Digite uma idade valida";
    }

    if (!password) {
      return "Preencha a sua senha";
    }

    if (password.length < 8) {
      return "A senha precisa ter no minimo 8 caracteres";
    }

    if (!confirmPassword) {
      return "Confirme a sua senha";
    }

    if (password !== confirmPassword) {
      return "As senhas nao coincidem";
    }

    return null;
  }

  async function cadastro(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errorMessage = validateForm();

    if (errorMessage) {
      setFeedback("error", errorMessage);
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await axios.post<{ message: string }>(
        "http://localhost:3000/api/auth/register",
        {
          email: email.trim(),
          password,
          age: Number(age),
          role,
          name: name.trim(),
        },
      );

      setFeedback("success", response.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      console.error(err);
      const errorMessage = axios.isAxiosError(err)
        ? err.response?.data?.message || "Erro ao realizar cadastro"
        : "Erro ao realizar cadastro";

      setFeedback("error", errorMessage);
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
              Comece sua jornada.
            </h1>
            <p className="mt-3 text-sm leading-6 text-[#5f7399]">
              Crie sua conta em menos de um minuto.
            </p>
          </header>

          <form className="space-y-5" onSubmit={cadastro} noValidate>
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm text-[#0e1b33]">
                Nome
              </label>
              <input
                id="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  clearMessage();
                }}
                type="text"
                placeholder="Ex: Joao Silva"
                autoComplete="name"
                className="h-12 w-full rounded-xl border border-[#d8dde7] bg-white px-4 text-[0.95rem] text-[#44638f] outline-none transition focus:border-[#0e1b33]"
              />
            </div>

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
                placeholder="joao@exemplo.com"
                autoComplete="email"
                className="h-12 w-full rounded-xl border border-[#d8dde7] bg-white px-4 text-[0.95rem] text-[#44638f] outline-none transition focus:border-[#0e1b33]"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="age" className="block text-sm text-[#0e1b33]">
                Idade
              </label>
              <input
                id="age"
                type="number"
                value={age}
                onChange={(e) => {
                  setAge(e.target.value);
                  clearMessage();
                }}
                placeholder="Ex: 25"
                min={1}
                className="h-12 w-full rounded-xl border border-[#d8dde7] bg-white px-4 text-[0.95rem] text-[#44638f] outline-none transition focus:border-[#0e1b33]"
              />
            </div>

            <div className="space-y-2">
              <span className="block text-sm text-[#0e1b33]">Voce e</span>
              <div className="grid grid-cols-2 rounded-xl bg-[#eceff3] p-1">
                <button
                  type="button"
                  onClick={() => {
                    setRole("aluno");
                    clearMessage();
                  }}
                  className={`rounded-[0.9rem] px-4 py-3 text-sm transition ${
                    role === "aluno"
                      ? "bg-white text-[#0e1b33] shadow-[0_6px_18px_rgba(17,33,61,0.08)]"
                      : "text-[#5f7399]"
                  }`}
                >
                  Aluno
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setRole("professor");
                    clearMessage();
                  }}
                  className={`rounded-[0.9rem] px-4 py-3 text-sm transition ${
                    role === "professor"
                      ? "bg-white text-[#0e1b33] shadow-[0_6px_18px_rgba(17,33,61,0.08)]"
                      : "text-[#5f7399]"
                  }`}
                >
                  Professor
                </button>
              </div>
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
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  clearMessage();
                }}
                minLength={8}
                placeholder="Minimo 8 caracteres"
                autoComplete="new-password"
                className="h-12 w-full rounded-xl border border-[#d8dde7] bg-white px-4 text-[0.95rem] text-[#44638f] outline-none transition focus:border-[#0e1b33]"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="block text-sm text-[#0e1b33]"
              >
                Confirme a senha
              </label>
              <input
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  clearMessage();
                }}
                minLength={8}
                type="password"
                placeholder="Digite novamente a senha"
                autoComplete="new-password"
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
              {isSubmitting ? "Criando conta..." : "Criar conta"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm leading-6 text-[#5f7399]">
            Ja tem conta?{" "}
            <Link
              to="/login"
              className="font-semibold text-[#0e1b33] transition hover:text-[#1f3b69]"
            >
              Fazer login
            </Link>
          </p>

          <p className="mt-3 text-center text-xs leading-5 text-[#5f7399]">
            Ao clicar, voce aceita nossos Termos de Servico.
          </p>
        </section>
      </div>
    </main>
  );
}
