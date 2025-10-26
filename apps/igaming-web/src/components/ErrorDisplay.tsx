import type { ReactNode } from "react";

interface ErrorDisplayProps {
  code: string | number;
  message: string;
  actions: ReactNode;
}

const ErrorDisplay = ({ code, message, actions }: ErrorDisplayProps) => {
  return (
    <div className="error-page">
      <div className="error-container">
        <div className="error-content">
          <div className="error-code">{code}</div>
          <h1 className="error-title">Oops! Something went wrong</h1>
          <p className="error-message">{message}</p>
          <div className="error-actions">{actions}</div>
        </div>
      </div>
    </div>
  );
};

export default ErrorDisplay;
