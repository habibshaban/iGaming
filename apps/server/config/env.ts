import "dotenv/config";

type Env = {
  NODE_ENV: string;
  PORT: number;
  SESSION_SECRET: string;
  CLIENT_URL: string;
};

const envObject: Env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: Number(process.env.PORT) || 3000,
  SESSION_SECRET: process.env.SESSION_SECRET || "",
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173",
};

if (!envObject.SESSION_SECRET) {
  throw new Error("SESSION_SECRET is required in environment variables");
}

export const env = envObject;
