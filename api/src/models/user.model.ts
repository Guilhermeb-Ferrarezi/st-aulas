import { pool } from "../db";

export type user = {
  id?: number;
  name: string;
  email: string;
  password: string;
  age: number;
  role: number;
};

export async function createUser(user: user) {
  const data = await pool.query(
    `
      INSERT INTO "user" (name, email, password, age, role)
      VALUES ($1, $2, $3, $4, $5)
    `,
    [user.name.trim(), user.email.trim(), user.password.trim(), user.age, user.role],
  );

  return data.rowCount === 1;
}
