import type { AuthUser } from "@/lib/interfaces";

export type AuthContextType = {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isError: boolean;
  refetch: () => void;
};
