import { useMemo } from "react";
import { useMe } from "@/features/auth/hooks";
import { AuthContext } from "@/features/auth/context";
import type { AuthContextType } from "@/features/auth/types";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data, isLoading, isError, refetch } = useMe();
  const value = useMemo<AuthContextType>(
    () => ({
      user: data?.user ?? null,
      isLoading,
      isError,
      isAuthenticated: !!data?.user && !isError,
      refetch,
    }),
    [data?.user, isLoading, isError, refetch]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
