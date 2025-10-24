import express from "express";
import { sessionMw } from "./config/session.js";
import { errorHandler } from "./middlewares/errors.js";
import { registerRoutes } from "./routes/index.js";
import cors from "cors";
import { loadData } from "./data/load.js";
import { buildRepo } from "./data/repo.js";

export async function createApp(): Promise<express.Express> {
  const app = express();
  const dataStore = await loadData();
  const repo = buildRepo(dataStore.data);

  app.use(
    cors({
      origin: process.env.CLIENT_URL || "http://localhost:5173",
      credentials: true,
    })
  );

  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));
  app.use(sessionMw);

  registerRoutes(app, repo);

  app.use(errorHandler);

  return app;
}
