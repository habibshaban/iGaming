import { Suspense } from "react";
import { AuthProvider, QueryProvider, Router } from "./providers";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "@/pages/ErrorPage";
import LoadingFallback from "@/components/LoadingFallback";

export const App = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorPage}>
      <QueryProvider>
        <AuthProvider>
          <Suspense fallback={<LoadingFallback />}>
            <Router />
          </Suspense>
        </AuthProvider>
      </QueryProvider>
    </ErrorBoundary>
  );
};
