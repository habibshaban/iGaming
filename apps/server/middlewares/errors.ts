import type { ErrorRequestHandler } from "express";
import { AppError } from "../errors/AppError.js";
import { ZodError } from "igaming-shared";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof AppError) {
    return res.status(err.status).json({ error: err.message });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      error: "validation_error",
      details: err.issues,
    });
  }

  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({ error: "invalid_json" });
  }

  console.error("Unhandled error:", err);
  res.status(500).json({ error: "internal_error" });
};
