import { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ZodError } from "igaming-shared";
import { userSchema } from "igaming-shared";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Alert from "@/components/Alert";
import Spinner from "@/components/Spinner";
import LoginImage from "@/assets/images/logo.png";
import { useLogin, useAuth } from "@/features/auth";
import { getErrorMessage, getValidationErrors } from "@/lib/utils/errors";

interface ValidationErrors {
  username?: string;
  password?: string;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { mutate: login, isPending } = useLogin();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setValidationErrors((prev) => {
      if (prev[name as keyof ValidationErrors]) {
        return {
          ...prev,
          [name]: undefined,
        };
      }
      return prev;
    });
    setServerError((prev) => (prev ? null : prev));
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidationErrors({});
    setServerError(null);
    try {
      userSchema.parse(formData);
      login(formData, {
        onSuccess: () => {
          navigate("/");
        },
        onError: (error: unknown) => {
          setServerError(getErrorMessage(error));
        },
      });
    } catch (error) {
      if (error instanceof ZodError) {
        setValidationErrors(getValidationErrors<typeof formData>(error));
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, authLoading, navigate]);

  if (authLoading) {
    return <Spinner />;
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-logo">
          <img src={LoginImage} alt="FinnPlay Logo" width="70" height="70" />
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          {serverError && (
            <Alert variant="error" onClose={() => setServerError(null)}>
              {serverError}
            </Alert>
          )}
          <div className="login-inputs">
            <Input
              type="text"
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              error={validationErrors.username}
            />
            <Input
              type="password"
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={validationErrors.password}
            />
          </div>
          <Button type="submit" loading={isPending}>
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
