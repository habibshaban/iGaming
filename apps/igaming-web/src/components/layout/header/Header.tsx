import FinnPlayLogo from "@/assets/images/logo.png";
import LogoutButton from "./LogoutButton";
import { useAuth } from "@/features/auth";

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="header" role="banner">
      <div className="header__container">
        <img src={FinnPlayLogo} alt="FinnPlay" className="header__logo" />
        <nav className="header__user-section" aria-label="User menu">
          <span className="header__username" aria-label={`Logged in as ${user?.username}`}>
            {user?.username}
          </span>
          <LogoutButton />
        </nav>
      </div>
    </header>
  );
};
export default Header;
