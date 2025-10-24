import Spinner from "./Spinner";

interface ButtonProps {
  children: React.ReactNode;
  loading?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
}

const Button = ({ children, loading = false, onClick, type = "button" }: ButtonProps) => {
  return (
    <button
      className={`btn ${loading ? "btn--loading" : ""}`}
      disabled={loading}
      onClick={onClick}
      type={type}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
};

export default Button;
