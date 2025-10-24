import { useState } from "react";
import ShowPasswordIcon from "@/assets/icons/show-password.svg";
import HidePasswordIcon from "@/assets/icons/hide-password.svg";

interface InputProps {
  label: string;
  type: "text" | "password";
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ label, type, name, value, onChange }: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="input-wrapper">
      <input
        id={name}
        className={`input ${isPassword ? "input--password" : ""}`}
        type={inputType}
        name={name}
        value={value}
        onChange={onChange}
        placeholder=" "
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
            alt="Toggle password visibility"
          />
        </button>
      )}
    </div>
  );
};

export default Input;
