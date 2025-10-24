import session from "express-session";
import type { RequestHandler } from "express";
import { env } from "./env.js";

export const sessionMw: RequestHandler = session({
  secret: env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: "lax",
    secure: env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 2,
  },
});
