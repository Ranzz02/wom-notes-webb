import { NavLink } from "react-router-dom";
import { UseAuth } from "../contexts/AuthContext";
import "@/styles/header.css";

export default function NavBar() {
  const { user, logout } = UseAuth();

  return (
    <header>
      <div className="header-content">
        <NavLink to={"/"} className="header-name">
          Notes
        </NavLink>
        {user && (
          <div className="header-profile-content">
            <NavLink to={"/profile"} className="header-profile-name">
              {user?.username}
            </NavLink>
            <button onClick={logout}>Logout</button>
          </div>
        )}
      </div>
    </header>
  );
}
