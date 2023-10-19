import { createContext } from "react";
import { PrivateUser } from "../../types/PrivateUser";
import { LoginForm } from "../../types/LoginForm";
import { RegisterForm } from "../../types/RegisterForm";

export type AuthContextType = {
  user: PrivateUser | null;
  login: (form: LoginForm) => Promise<boolean>;
  logout: () => Promise<boolean>;
  signup: (form: RegisterForm) => Promise<boolean>;
};

export const AuthContext = createContext<AuthContextType>(null!);