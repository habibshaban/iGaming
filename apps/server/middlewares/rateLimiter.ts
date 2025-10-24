import type { RequestHandler } from "express";

type RateLimitStore = {
  [key: string]: { count: number; resetTime: number };
};

export function createRateLimiter(windowMs: number, maxRequests: number): RequestHandler {
  const store: RateLimitStore = {};

  const cleanupInterval = setInterval(() => {
    const now = Date.now();
    Object.keys(store).forEach((key) => {
      if (store[key] && store[key].resetTime < now) {
        delete store[key];
      }
    });
  }, 60000);

  if (cleanupInterval.unref) {
    cleanupInterval.unref();
  }

  return (req, res, next) => {
    const key = req.ip || req.socket.remoteAddress || "unknown";
    const now = Date.now();

    if (!store[key] || store[key].resetTime < now) {
      store[key] = {
        count: 1,
        resetTime: now + windowMs,
      };
      return next();
    }

    store[key].count++;

    if (store[key].count > maxRequests) {
      const retryAfter = Math.ceil((store[key].resetTime - now) / 1000);
      res.set("Retry-After", String(retryAfter));
      return res.status(429).json({
        error: "too_many_requests",
        message: "Too many requests, please try again later",
        retryAfter,
      });
    }

    next();
  };
}
