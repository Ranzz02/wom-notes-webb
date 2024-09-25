import { Outlet, useNavigate } from "react-router-dom";
import AuthProvider from "../contexts/AuthContext";
import { setupAxiosInterceptors } from "@/utils/api";
import { useEffect } from "react";

export default function DefaultLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    setupAxiosInterceptors(navigate);
  }, [navigate]);

  return (
    <>
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </>
  );
}
