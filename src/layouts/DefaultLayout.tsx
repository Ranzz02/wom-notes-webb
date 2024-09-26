import { Outlet, useNavigate } from "react-router-dom";
import AuthProvider from "../contexts/AuthContext";
import { setupAxiosInterceptors } from "@/utils/api";
import { useEffect } from "react";
import NavBar from "@/components/NavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DefaultLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    setupAxiosInterceptors(navigate);
  }, [navigate]);

  return (
    <>
      <AuthProvider>
        <NavBar />
        <Outlet />
        <ToastContainer newestOnTop autoClose={1500} />
      </AuthProvider>
    </>
  );
}
