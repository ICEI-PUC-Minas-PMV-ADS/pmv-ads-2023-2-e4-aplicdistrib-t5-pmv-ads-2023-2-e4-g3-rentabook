import { createContext } from "react";
import { PrivateUser } from "../../types/PrivateUser";
import { LoginForm } from "../../types/LoginForm";
import { RegisterForm } from "../../types/RegisterForm";
import { PrivateAddress } from "../../types/PrivateAddress";

export type AuthContextType = {
  user: PrivateUser | null;
  defaultAddress: PrivateAddress | null;
  login: (form: LoginForm) => Promise<boolean>;
  logout: () => Promise<boolean>;
  signup: (form: RegisterForm) => Promise<boolean>;
  setDefaultAddressLocalStorage: (address: PrivateAddress) => void;
  removeDefaultAddress: () => void;
  infosLoaded: boolean
  //registrationForm: RegisterForm | null;
  //registrationErrors: string[];
};

export const AuthContext = createContext<AuthContextType>(null!);