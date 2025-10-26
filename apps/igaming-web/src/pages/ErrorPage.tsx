import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import type { FallbackProps } from "react-error-boundary";
import ErrorDisplay from "@/components/ErrorDisplay";

const ErrorPage = ({ error, resetErrorBoundary }: FallbackProps) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    resetErrorBoundary();
    navigate("/");
  };

  return (
    <ErrorDisplay
      code="Error"
      message={error?.message || "An unexpected error occurred"}
      actions={
        <>
          <Button onClick={resetErrorBoundary}>Try Again</Button>
          <Button onClick={handleGoHome}>Go Home</Button>
        </>
      }
    />
  );
};

export default ErrorPage;
