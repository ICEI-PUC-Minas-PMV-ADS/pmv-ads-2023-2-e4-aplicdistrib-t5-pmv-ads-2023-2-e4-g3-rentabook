import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./src/contexts/Auth/AuthProvider";
import Router from "./src/routes";
export default function App() {
  return (
      <AuthProvider>
        <Router />
      </AuthProvider>
  );
}
