import { Pool, type PoolConfig } from "pg";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
export async function db() {
  const res = await pool.connect();

  if (!res) {
    console.log("Erro ao conectar ao banco");
    return;
  }
  console.log("Parabéns voce esta conectado");
}

