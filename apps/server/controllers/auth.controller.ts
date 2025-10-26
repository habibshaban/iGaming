import type { RequestHandler } from "express";
import type { AuthService } from "../services/auth.service.js";
import { userSchema } from "igaming-shared";

type AuthControllerType = {
  login: RequestHandler;
  logout: RequestHandler;
  getMe: RequestHandler;
};

export function AuthController(auth: AuthService): AuthControllerType {
  const login: RequestHandler = (req, res, next) => {
    try {
      const parsed = userSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ errors: parsed.error.issues });
      }
      const { username, password } = parsed.data;

      const user = auth.login(username, password);
      req.session.user = user;
      res.json({ ok: true, user });
    } catch (error) {
      next(error);
    }
  };

  const logout: RequestHandler = (req, res, next) => {
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.json({ ok: true });
    });
  };

  const getMe: RequestHandler = (req, res) => {
    const user = req.session.user;
    if (!user) {
      return res.status(401).json({ error: "unauthorized" });
    }
    res.json({ user });
  };

  return { login, logout, getMe };
}
