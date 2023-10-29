import * as React from 'react';
import { AuthProvider } from "./src/contexts/Auth/AuthProvider";
import Router from "./src/routes";
import { HomeProvider } from './src/contexts/Home/HomeProvider';

export default function App() {
  return (
    <React.StrictMode>
      <AuthProvider>
        <HomeProvider>
          <Router />
        </HomeProvider>
      </AuthProvider>
    </React.StrictMode>
  );
}
