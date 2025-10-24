import { Router, type IRouter } from "express";
import { createRateLimiter } from "../middlewares/rateLimiter.js";
import { AuthController } from "../controllers/auth.controller.js";
import type { AuthService } from "../services/auth.service.js";

const loginRateLimiter = createRateLimiter(15 * 60 * 1000, 5);

export function authRoutes(authService: AuthService): IRouter {
  const router = Router();
  const controller = AuthController(authService);

  router.post("/login", loginRateLimiter, controller.login);
  router.post("/logout", controller.logout);
  router.get("/me", controller.getMe);

  return router;
}
