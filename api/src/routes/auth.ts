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
  user?: jwt.JwtPayload | string;
};

type RegisterBody = {
  email?: string;
  password?: string;
  age?: number | string;
  name?: string;
  role?: "aluno" | "professor" | number;
};

type LoginBody = {
  email?: string;
  password?: string;
};

const router = Router();
const JWT_SECRET: string = process.env.JWT_SECRET ?? "";

export function verifyToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token nao fornecido" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (_error) {
    return res.status(401).json({ message: "Token invalido ou expirado" });
  }
}

export default async function auth() {
  async function verifyExistUser(email: string) {
    const data = await pool.query<Pick<user, "email">>(
      `
        SELECT email
        FROM "user"
        WHERE LOWER(email) = LOWER($1)
      `,
      [email.trim()],
    );

    return Boolean(data.rows[0]);
  }

  function normalizeRole(role: RegisterBody["role"]) {
    if (role === "aluno" || role === 1) {
      return 1;
    }

    if (role === "professor" || role === 2) {
      return 2;
    }

    return null;
  }

  async function AuthSign(user: user) {
    return jwt.sign(
      {
        sub: String(user.id),
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      {
        expiresIn: "4h",
      },
    );
  }

  async function authPass(inputPassword: string, storedHash: string) {
    return bcrypt.compare(inputPassword, storedHash);
  }

  router.post("/register", async (req, res) => {
    const { email, password, age, name, role } = req.body as RegisterBody;
    const userRole = normalizeRole(role);

    if (!name?.trim() || !email?.trim() || !password) {
      return res.status(400).json({ message: "Preencha todos os campos" });
    }

    if (!Number.isInteger(Number(age)) || Number(age) <= 0) {
      return res.status(400).json({ message: "Informe uma idade valida" });
    }

    if (!userRole) {
      return res.status(400).json({ message: "Cargo invalido" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "A senha deve ter no minimo 8 caracteres" });
    }

    try {
      const userExists = await verifyExistUser(email.trim());

      if (userExists) {
        return res.status(409).json({ message: "Usuario ja existente" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser: user = {
        email: email.trim(),
        password: hashedPassword,
        name: name.trim(),
        age: Number(age),
        role: userRole,
      };

      const userCreated = await createUser(newUser);

      if (!userCreated) {
        return res.status(500).json({ message: "Erro ao criar usuario" });
      }

      return res.status(201).json({ message: "Cadastro realizado com sucesso" });
    } catch (error) {
      console.error("Erro no cadastro:", error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  });

  router.post("/login", async (req, res) => {
    const { email, password } = req.body as LoginBody;
    const userInput = email?.trim();

    if (!userInput || !password) {
      return res.status(400).json({ message: "Preencha email e senha" });
    }

    try {
      const data = await pool.query<user>(
        `
          SELECT id, name, email, role, age, password
          FROM "user"
          WHERE LOWER(email) = LOWER($1) OR LOWER(name) = LOWER($1)
        `,
        [userInput],
      );

      const foundUser = data.rows[0];

      if (!foundUser) {
        return res.status(401).json({ message: "Usuario ou senha invalida" });
      }

      if (!foundUser.password || foundUser.password.trim() === "") {
        return res.status(401).json({ message: "Usuario ou senha invalida" });
      }

      const passwordValid = await authPass(password, foundUser.password);

      if (!passwordValid) {
        return res.status(401).json({ message: "Usuario ou senha invalida" });
      }

      const token = await AuthSign(foundUser);

      return res.status(200).json({
        message: "Login realizado com sucesso",
        token,
        user: {
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email,
          age: foundUser.age,
          role: foundUser.role,
        },
      });
    } catch (error) {
      console.error("Erro no login:", error);
      return res.status(500).json({ message: "Erro interno do servidor", error });
    }
  });

  router.get("/", (_req, res) => {
    res.json("Login funcionando");
  });

  router.get("/user/me", verifyToken, (req: AuthenticatedRequest, res) => {
    res.json({
      message: "Acesso autorizado!",
      user: req.user,
    });
  });

  return router;
}
