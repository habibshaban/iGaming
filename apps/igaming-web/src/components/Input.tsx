import { useState } from "react";
import ShowPasswordIcon from "@/assets/icons/show-password.svg";
import HidePasswordIcon from "@/assets/icons/hide-password.svg";

interface InputProps {
  label: string;
  type: "text" | "password";
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  autoComplete?: string;
}

const Input = ({ label, type, name, value, onChange, error, autoComplete }: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;
  const errorId = error ? `${name}-error` : undefined;

  return (
    <div className="input-wrapper">
      <div className="input-container">
        <input
          id={name}
          className={`input ${isPassword ? "input--password" : ""} ${error ? "input--error" : ""}`}
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
          placeholder=" "
          aria-invalid={error ? "true" : "false"}
          aria-describedby={errorId}
          autoComplete={autoComplete}
        />
        <label htmlFor={name} className="input-label">
          {label}
        </label>
        {isPassword && (
          <button
            type="button"
            className="input-eye-icon"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <img
              src={showPassword ? HidePasswordIcon : ShowPasswordIcon}
              alt=""
              aria-hidden="true"
            />
          </button>
        )}
      </div>
      {error && <span className="input-error" id={errorId} role="alert">{error}</span>}
    </div>
  );
};

export default Input;
