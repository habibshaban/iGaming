import { useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import LoginImage from "@/assets/images/logo.png";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-logo">
          <img src={LoginImage} alt="FinnPlay Logo" width="70" height="70" />
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-inputs">
            <Input
              type="text"
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            <Input
              type="password"
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <Button type="submit" loading={isLoading}>
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
