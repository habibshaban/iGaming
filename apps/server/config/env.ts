import "dotenv/config";

type Env = {
  NODE_ENV: string;
  PORT: number;
};

const envObject: Env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: Number(process.env.PORT) || 3000,
};

export const env = envObject;
