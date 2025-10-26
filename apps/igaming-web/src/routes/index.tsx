import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { AuthGuard } from "@/features/auth";
import Layout from "@/components/layout/Layout";
import RouteErrorPage from "@/pages/RouteErrorPage";

const Home = lazy(() => import("@/pages/Home"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: (
      <AuthGuard>
        <Layout>
          <Home />
        </Layout>
      </AuthGuard>
    ),
    errorElement: <RouteErrorPage />,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
