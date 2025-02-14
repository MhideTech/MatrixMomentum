import React from 'react';  // Ensure React is imported
import ReactDOM from 'react-dom/client';  // Correct import for React 18+
import { StrictMode } from 'react';
import App from './App.jsx';
import './index.css';
import { LanguageProvider } from "./context/LanguageContext"; // ✅ Ensure correct import
import axios from 'axios';

const root = ReactDOM.createRoot(document.getElementById("root"));
axios.defaults.baseURL = `${import.meta.env.VITE_HOST_URL}`;

root.render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>
);
