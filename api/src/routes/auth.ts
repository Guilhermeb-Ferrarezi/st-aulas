import {
  Router,
  type Request,
  type Response,
  type NextFunction,
} from "express";
import { pool } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, type user } from "../models/user.model";

type AuthenticatedRequest = Request & {
  user?: any;
};

const router = Router();
const JWT_SECRET: any = process.env.JWT_SECRET;

// Middleware para verificar token
export function verifyToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1]; // "Bearer token"

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET as string);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido ou expirado" });
  }
}

export default async function auth() {
  async function verifyExistUser(user: user, res: Response) {
    const userInput = user;

    if (!userInput) {
      return res.status(401).json({ message: "Digite um usuario válido" });
    }

    if (userInput) {
      try {
        const data = await pool.query<user>(
          `
        SELECT id, email
        FROM "user"
        WHERE LOWER(email) = LOWER($1)`,
          [user],
        );

        const User: any = data.rows[0];

        if (!User) {
          return user;
        }
        if (User) {
          return res.status(401).json({ message: "Usuario ja existente" });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  router.post("/register", async (req, res) => {
    const { email, password, age, name, choice } = req.body;
    const user: user = {
      id: req.body.id,
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      age: req.body.age
    }
    console.log("Informaçoes de cadastro chegaram:", user);
    const UserExists = verifyExistUser(user, res)

    if (!UserExists){
      return user 
    }


    if (!createUser(user)){
      return res.json({message:"erro"})
    }

  });

  async function AuthSign(user: user) {
    return jwt.sign(
      {
        sub: String(user.id),
        email: user.email,
        role: user.role,
      },
      JWT_SECRET as string,
      {
        expiresIn: "4h",
      },
    );
  }

  async function authPass(inputPassword: string, storedHash: string) {
    return bcrypt.compare(inputPassword, storedHash);
  }

  router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    console.log("Informaçoes chegaram:", email, password);
    const userInput = email.trim();

    try {
      const data = await pool.query<user>(
        `
    SELECT id, name, email, role, age, password 
    FROM "user"
    WHERE LOWER(email) = LOWER($1) OR LOWER(name) = LOWER($1)
    `,
        [userInput],
      );

      const user: any = data.rows[0];
      if (!user) {
        return res.status(401).json({ message: "Usuario ou senha inválidas" });
      }

      if (!user.password || user.password.trim() === "") {
        return res.status(401).json({ message: "Usuario ou senha inválida" });
      }

      const passwordValid = await authPass(password, user.password);

      if (!passwordValid) {
        return res.status(401).json({ message: "Usuario ou senha inválida" });
      }

      const token = await AuthSign(user);

      return res.status(200).json({
        message: "Login realizado com sucesso",
        token: token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          age: user.age,
          role: user.role,
        },
      });
    } catch (error) {
      console.error("Erro no login:", error);
      res.status(500).json({ message: "Erro interno do servidor", error });
    }
  });

  router.get("/", (req, res) => {
    res.json("Login funcionando");
  });

  // Rota protegida para testar
  router.get("/user/me", verifyToken, (req: any, res) => {
    res.json({
      message: "Acesso autorizado!",
      user: req.user,
    });
  });
  return router;
}
