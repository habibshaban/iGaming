import { Router, type IRouter } from "express";
import type { GameService } from "../services/game.service.js";
import { GameController } from "../controllers/game.controller.js";
import { requireAuth } from "../middlewares/requireAuth.js";

export function gameRoutes(gameService: GameService): IRouter {
  const router = Router();
  const controller = GameController(gameService);

  router.use(requireAuth);

  router.get("/games", controller.getGames);
  router.get("/providers", controller.getProviders);
  router.get("/groups", controller.getGroups);

  return router;
}
