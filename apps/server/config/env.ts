import "dotenv/config";

type Env = {
  NODE_ENV: string;
  PORT: number;
  SESSION_SECRET: string;
};

const envObject: Env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: Number(process.env.PORT) || 3000,
  SESSION_SECRET: process.env.SESSION_SECRET || "",
};

if (!envObject.SESSION_SECRET) {
  throw new Error("SESSION_SECRET is required in environment variables");
}

export const env = envObject;
