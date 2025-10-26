import "express-session";

declare module "express-session" {
  interface SessionData {
    user?: {
      username: string;
    };
  }
}

declare module "express" {
  interface Request {
    session: import("express-session").Session & {
      user?: {
        username: string;
      };
    };
  }
}
