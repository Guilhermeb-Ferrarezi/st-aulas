import { pool } from "../db";

export type user = {
  id: number;
  name: string;
  email: string;
  password: string;
  age: number;
  role?: number;
};

export function createUser(user: user){
    const data = pool.query<user>(`
      INSERT INTO "user" (name, email, password, age, role)
      VALUES ($1, $2, $3, $4, $5) 
      `, [user.name.trim(), user.email.trim(), user.password.trim(), user.role]
    )
    if(!data){
        return false
    }
    return true
}

