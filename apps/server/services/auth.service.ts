import { USERS } from "../constants/user.js";
import { AppError } from "../errors/AppError.js";

export type AuthService = {
  login: (username: string, password: string) => { username: string };
};

export function createAuthService(): AuthService {
  return {
    login(username, password) {
      const stored = USERS.get(username);
      if (!stored || stored !== password) {
        throw new AppError(401, "invalid_credentials");
      }
      return { username };
    },
  };
}
