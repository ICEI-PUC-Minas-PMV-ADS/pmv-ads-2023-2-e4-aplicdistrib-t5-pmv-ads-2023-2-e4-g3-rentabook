import * as React from "react";
import Home from "./pages/Template";
import Router from "./routes";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./contexts/Auth/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  )
}

export default App;
