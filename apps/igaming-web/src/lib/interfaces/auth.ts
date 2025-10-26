import type { User } from "igaming-shared";

export type AuthUser = Omit<User, "password">;

export interface AuthResponse {
  ok: boolean;
  user: AuthUser;
}

export type LoginCredentials = User;

export interface MeResponse {
  user: AuthUser;
}
