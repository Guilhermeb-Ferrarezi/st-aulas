import mongoose from "mongoose";
import { Pool } from "pg";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function db() {
  const mongoUri = process.env.MONGO_STRING ?? process.env.MONGODB_URI;

  if (!mongoUri) {
    console.log("MONGO_STRING ou MONGODB_URI nao configurada");
    return;
  }

  if (mongoose.connection.readyState === 1) {
    console.log("MongoDB conectado");
    return mongoose.connection;
  }

  if (mongoose.connection.readyState === 2) {
    return mongoose.connection.asPromise();
  }

  await mongoose.connect(mongoUri);
  console.log("MongoDB conectado");

  return mongoose.connection;
}

interface IFeedback {
  ranking: number;
  comentario: string;
  data_criacao: Date;
}

async function models() {
  const feedbackModel = await mongoose.model<IFeedback>(
    "Feedback",
    new mongoose.Schema<IFeedback>({
      ranking: { type: Number, required: true },
      comentario: { type: String, required: true },
      data_criacao: { type: Date, default: Date.now },
    }), "feedback"
  );
  return feedbackModel.find().lean();
}
const feedbacks = await models()
console.log(feedbacks);