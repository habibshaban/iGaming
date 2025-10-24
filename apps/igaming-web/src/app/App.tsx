import { Suspense } from "react";
import { QueryProvider, Router } from "./providers";

export const App = () => {
  return (
    <QueryProvider>
      {/* TODO: Should Add better UI for loading state */}
      <Suspense fallback={<div className="app-loading">Loading...</div>}>
        <Router />
      </Suspense>
    </QueryProvider>
  );
};
