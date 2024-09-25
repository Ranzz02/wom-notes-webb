import { Outlet } from "react-router-dom";
import { UseAuth } from "../contexts/AuthContext";
import "@/styles/header.css";

export default function NotesLayout() {
  const { user, logout } = UseAuth();

  return (
    <>
      <header>
        <div className="header-content">
          <div className="header-name">Notes:</div>
          <div className="header-profile-content">
            <div className="header-profile-name">{user?.username}</div>
            <button onClick={logout}>Logout</button>
          </div>
        </div>
      </header>
      <Outlet />
    </>
  );
}
