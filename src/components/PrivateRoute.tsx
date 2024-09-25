import { Navigate, Outlet } from "react-router-dom";
import { UseAuth } from "@/components/contexts/AuthContext";

const PrivateRoute = () => {
  const user = UseAuth();
  if (!user.user) return <Navigate to="/signin" />;
  return <Outlet />;
};

export default PrivateRoute;
