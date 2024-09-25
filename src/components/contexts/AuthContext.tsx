import { useAuthStore } from "@/stores/AuthStore";
import { useContext, createContext, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

export type User = {
  id: string;
  username: string;
  email: string;
};

export type AuthContextType = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const { user, setUser } = useAuthStore();
  const navigate = useNavigate();

  const login = (user: User) => {
    setUser(user);
    navigate("/");
  };

  const logout = () => {
    setUser(null);
    navigate("/signin");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UseAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
