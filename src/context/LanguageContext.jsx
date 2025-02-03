import React, { createContext, useState } from "react";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const switchLanguage = (lang) => {
    setSelectedLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ selectedLanguage, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
