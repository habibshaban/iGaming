import FinnPlayLogo from "@/assets/images/logo.png";
import LogoutButton from "./LogoutButton";
import { useAuth } from "@/features/auth";

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="header">
      <div className="header__container">
        <img src={FinnPlayLogo} alt="FinnPlay Logo" className="header__logo" />
        <div className="header__user-section">
          <span className="header__username">{user?.username}</span>
          <LogoutButton />
        </div>
      </div>
    </header>
  );
};
export default Header;
