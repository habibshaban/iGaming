import { useLogout } from "@/features/auth";
import { useNavigate } from "react-router-dom";
import RoundUserIcon from "@/assets/icons/round-user.svg";

const LogoutButton = () => {
  const logout = useLogout();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout.mutateAsync();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button className="logout-button" onClick={handleLogout} aria-label="Logout">
      <img src={RoundUserIcon} alt="" aria-hidden="true" className="logout-button__icon" />
      Logout
    </button>
  );
};
export default LogoutButton;
