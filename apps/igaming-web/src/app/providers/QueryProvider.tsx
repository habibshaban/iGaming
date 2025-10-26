import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/config/query-client";

interface QueryProviderProps {
  children: React.ReactNode;
}

export const QueryProvider = ({ children }: QueryProviderProps) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
