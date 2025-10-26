import type { ReactNode } from "react";

interface AlertProps {
  variant?: "error" | "success" | "warning" | "info";
  children: ReactNode;
  onClose?: () => void;
}

const Alert = ({ variant = "error", children, onClose }: AlertProps) => {
  return (
    <div className={`alert alert--${variant}`} role="alert" aria-live="polite">
      <div className="alert-content">{children}</div>
      {onClose && (
        <button type="button" className="alert-close" onClick={onClose} aria-label="Close alert">
          ×
        </button>
      )}
    </div>
  );
};

export default Alert;
