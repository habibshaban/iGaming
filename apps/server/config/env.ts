import "dotenv/config";
import crypto from "crypto";

type Env = {
  NODE_ENV: string;
  PORT: number;
  SESSION_SECRET: string;
  CLIENT_URL: string;
};

function generateSessionSecret(): string {
  return crypto.randomBytes(32).toString("hex");
}

const envObject: Env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: Number(process.env.PORT) || 3000,
  SESSION_SECRET: process.env.SESSION_SECRET || generateSessionSecret(),
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173",
};

export const env = envObject;
