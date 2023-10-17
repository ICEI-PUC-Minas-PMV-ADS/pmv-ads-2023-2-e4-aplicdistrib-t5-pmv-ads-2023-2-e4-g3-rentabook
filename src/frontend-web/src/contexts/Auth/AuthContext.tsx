import { createContext } from "react";
import { PrivateUser } from "../../types/PrivateUser";
import { LoginForm } from "../../types/LoginForm";

export type AuthContextType = {
  user: PrivateUser | null;
  login: (form: LoginForm) => Promise<boolean>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>(null!);