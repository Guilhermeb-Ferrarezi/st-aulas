import axios from "axios";
import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import {  useNavigate } from "react-router-dom";
import { setToken, IsLoggedIn } from "../auth/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();

 useEffect(() => {
    const checkLogin = async () => {
      const logged = await IsLoggedIn()
      setIsLogged(logged!)
    }
    checkLogin()
  }, [])

  if (isLogged){
    navigate("/home")
  }
  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Enviando:", { email, password });

    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password,
      });

      console.log("Resposta recebida:", res.data);
      setResponse(res.data.message);
      setTimeout(() => {
        navigate("/home");
      }, 2000);
      setToken(res.data.token);
    } catch (err: any) {
      console.log("Erro:", err);
      setResponse(err.response?.data?.message || "Erro na requisição");
    }
  }

  return (
    <div className="flex flex-col align-center justify-center items-center h-screen bg-black text-white">
      <h1 className="text-2xl">Login</h1>
      <form
        onSubmit={handleLogin}
        action=""
        className="flex flex-col text-white border-2 rounded-2xl border-slate-50 p-6 md:w-100 "
      >
        <label className="mb-2">Email ou usuario</label>
        <input
          className="outline-none border border-red-500 rounded-xl p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          name="email"
          id="email"
          placeholder="Digite seu email ou usuario"
          required
        />

        <label className="mt-2">Senha</label>
        <input
          className="outline-none border border-red-500 rounded-xl p-2"
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Digite sua senha"
          required
        />

        <p className="text-center m-2">{response}</p>

        <button
          type="submit"
          className="mx-auto md:w-30 rounded-2xl bg-blue-400 p-1 mt-2 text-xl"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
