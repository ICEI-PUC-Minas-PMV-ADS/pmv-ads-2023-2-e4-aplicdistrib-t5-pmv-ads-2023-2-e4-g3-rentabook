import * as React from 'react';
import { AuthProvider } from "./src/contexts/Auth/AuthProvider";
import Router from "./src/routes";

export default function App() {
  return (
    <React.StrictMode>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </React.StrictMode>
  );
}
