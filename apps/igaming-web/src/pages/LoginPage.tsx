import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const validate = useCallback((data: typeof formData) => {
    const res = userSchema.safeParse(data);
    if (res.success) return {};
    return getValidationErrors<typeof formData>(res.error);
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

      setServerError(null);
      setValidationErrors((prev) => {
        if (!prev[name as keyof ValidationErrors]) return prev;
        const candidate = { ...formData, [name]: value };
        const nextErrors = validate(candidate);
        return { ...prev, [name]: nextErrors[name as keyof ValidationErrors] };
      });
    },
    [formData, validate]
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError(null);

    const errors = validate(formData);
    setValidationErrors(errors);
    if (Object.keys(errors).length) return;

    login(formData, {
      onSuccess: () => navigate("/"),
      onError: (error: unknown) => setServerError(getErrorMessage(error)),
    });
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
        <h1 className="sr-only">Login to FinnPlay</h1>
        <form className="login-form" onSubmit={handleSubmit} aria-label="Login form">
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
              autoComplete="username"
            />
            <Input
              type="password"
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={validationErrors.password}
              autoComplete="current-password"
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
