// AppWrapper.js
import React from 'react';
import App from './App';
import { LoginProvider } from './LoginContext';

const AppWrapper = () => (
  <LoginProvider>
    <App />
  </LoginProvider>
);

export default AppWrapper;
