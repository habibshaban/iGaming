import Button from "@/components/Button";
import ErrorDisplay from "@/components/ErrorDisplay";
import { useNavigate, useRevalidator, useRouteError } from "react-router-dom";

interface RouteError {
  status?: number;
  statusText?: string;
  message?: string;
  data?: string;
}

export const RouteErrorPage = () => {
  const error = useRouteError() as RouteError;
  const navigate = useNavigate();
  const revalidator = useRevalidator();

  const getErrorMessage = () => {
    if (error?.message) return error.message;
    if (error?.statusText) return error.statusText;
    if (error?.data) return error.data;
    return "Something went wrong";
  };

  const getErrorCode = () => {
    return error?.status || 404;
  };

  return (
    <ErrorDisplay
      code={getErrorCode()}
      message={getErrorMessage()}
      actions={
        <>
          <Button onClick={() => revalidator.revalidate()}>Try Again</Button>
          <Button onClick={() => navigate("/")}>Go Home</Button>
        </>
      }
    />
  );
};

export default RouteErrorPage;
