import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { LoginProvider } from './LoginContext'; // Import LoginProvider
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LoginProvider>  {/* Wrap the app with LoginProvider */}
      <App />
    </LoginProvider>
  </React.StrictMode>
);

reportWebVitals();
