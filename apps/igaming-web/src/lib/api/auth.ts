import { apiClient } from "./client";
import type { AuthResponse, LoginCredentials, MeResponse } from "@/lib/interfaces";

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const { data } = await apiClient.post<AuthResponse>("/auth/login", credentials);
    return data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post("/auth/logout");
  },

  getMe: async (): Promise<MeResponse> => {
    const { data } = await apiClient.get<MeResponse>("/auth/me");
    return data;
  },
};
