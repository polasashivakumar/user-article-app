import { Link, useNavigate } from "react-router";
import {
  navbarClass,
  navContainerClass,
  navBrandClass,
  navLinksClass,
  navLinkClass,
  navLinkActiveClass,
  primaryBtn,
  secondaryBtn,
} from "../styles/common";
import { useAuthStore } from "../services/authService";

function Header() {
  const { currentUser, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className={navbarClass}>
      <div className={navContainerClass}>
        <Link to="/home" className={navBrandClass}>
          <span className="grid h-9 w-9 place-items-center rounded-2xl bg-slate-950 text-sm font-bold text-white shadow-lg shadow-slate-950/15">
            UA
          </span>
          <span>User Articles</span>
        </Link>
        <div className={navLinksClass}>
          {currentUser ? (
            <>
              <span className="hidden rounded-full bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 sm:inline-flex">
                {currentUser.firstName}
              </span>
              {currentUser.role === "AUTHOR" && (
                <Link to="/author-dashboard" className={navLinkActiveClass}>
                  Dashboard
                </Link>
              )}
              <button onClick={handleLogout} className={secondaryBtn}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={navLinkClass}>Login</Link>
              <Link to="/register" className={primaryBtn}>Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;