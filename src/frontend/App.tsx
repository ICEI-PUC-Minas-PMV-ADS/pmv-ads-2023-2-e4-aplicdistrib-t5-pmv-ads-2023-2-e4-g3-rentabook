import * as React from 'react';
import { AuthProvider } from "./src/contexts/Auth/AuthProvider";
import Router from "./src/routes";
import { HomeProvider } from './src/contexts/Home/HomeProvider';
import { MessageContextProvider } from './src/contexts/Message';

export default function App() {
  return (
    <React.StrictMode>
      <AuthProvider>
        <HomeProvider>
          <MessageContextProvider>
            <Router />
          </MessageContextProvider>
        </HomeProvider>
      </AuthProvider>
    </React.StrictMode>
  );
}
