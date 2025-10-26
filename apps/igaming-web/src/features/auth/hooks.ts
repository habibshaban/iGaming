import { authApi } from "@/lib/api/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AuthContextType } from "./types";
import { AuthContext } from "./context";
import { useContext } from "react";

export const AUTH_KEY = ["auth", "me"];

export function useMe() {
  return useQuery({
    queryKey: AUTH_KEY,
    queryFn: authApi.getMe,
    retry: false,
    staleTime: Infinity,
  });
}

export function useLogin() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: authApi.login,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: AUTH_KEY });
    },
  });
}

export function useLogout() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: async () => {
      qc.setQueryData(AUTH_KEY, null);
      qc.removeQueries({ queryKey: AUTH_KEY });
    },
  });
}

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
};
