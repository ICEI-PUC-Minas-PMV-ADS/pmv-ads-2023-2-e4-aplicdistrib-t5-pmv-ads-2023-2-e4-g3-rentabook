import { createContext } from "react";
import { HomeProps } from "../../types/HomeProps";

export const HomeContext = createContext<HomeProps>(null!);