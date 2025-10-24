import { Suspense } from "react";
import { AuthProvider, QueryProvider, Router } from "./providers";

export const App = () => {
  return (
    <QueryProvider>
      <AuthProvider>
        {/* TODO: Should Add better UI for loading state */}
        <Suspense fallback={<div className="app-loading">Loading...</div>}>
          <Router />
        </Suspense>
      </AuthProvider>
    </QueryProvider>
  );
};
