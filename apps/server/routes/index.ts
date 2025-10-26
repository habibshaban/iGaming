import type { Express } from "express";
import { authRoutes } from "./auth.js";
import { createAuthService } from "../services/auth.service.js";
import { createGameService } from "../services/game.service.js";
import { gameRoutes } from "./games.js";
import type { Repo } from "../data/repo.js";

export function registerRoutes(app: Express, repo: Repo): void {
  app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
  });
  const apiPrefix = "/api";

  const authService = createAuthService();
  app.use(`${apiPrefix}/auth`, authRoutes(authService));

  const gameService = createGameService(repo);

  app.use(`${apiPrefix}`, gameRoutes(gameService));

  app.use((_req, res) => {
    res.status(404).json({ error: "not_found", message: "Route not found" });
  });
}
