import { Link, useNavigate } from "react-router-dom";
import { clearToken } from "../auth/auth";

export default function Administracao() {
  const navigate = useNavigate();

  function handleSignOut() {
    clearToken();
    navigate("/login", { replace: true });
  }

  return (
    <main className="min-h-screen bg-[#08111a] px-4 py-10 text-[#eef6ff] sm:px-6">
      <div className="mx-auto max-w-5xl">
        <section className="rounded-[2rem] border border-[rgba(0,255,163,0.08)] bg-[linear-gradient(135deg,rgba(10,14,22,0.96),rgba(10,13,20,0.82))] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.22)] sm:p-10">
          <p className="text-sm uppercase tracking-[0.24em] text-[#8ca3c6]">
            Area restrita
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-white sm:text-5xl">
            Administracao
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#b2c1d9]">
            Somente usuarios com cargo de admin podem acessar esta pagina.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/home"
              className="inline-flex rounded-2xl border border-[rgba(0,255,163,0.18)] px-5 py-3 text-sm font-medium text-[#9fe8d0] transition hover:border-[rgba(0,255,163,0.3)] hover:text-white"
            >
              Voltar para o dashboard
            </Link>
            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex rounded-2xl border border-[rgba(255,95,95,0.18)] bg-[rgba(255,95,95,0.06)] px-5 py-3 text-sm font-medium text-[#ffb4b4] transition hover:border-[rgba(255,95,95,0.32)] hover:bg-[rgba(255,95,95,0.1)] hover:text-white"
            >
              Sair
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
