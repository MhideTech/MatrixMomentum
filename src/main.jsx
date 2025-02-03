import React from 'react';  // Ensure React is imported
import ReactDOM from 'react-dom/client';  // Correct import for React 18+
import { StrictMode } from 'react';
import App from './App.jsx';
import './index.css';
import { LanguageProvider } from "./context/LanguageContext"; // ✅ Ensure correct import

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>
);
