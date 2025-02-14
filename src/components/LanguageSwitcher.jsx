import React, { useState } from "react";
import { translateWithRetry } from "../utils/lingvaAPI";
import { debounce } from "lodash";

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "zh", name: "Chinese" },
];

const LanguageSwitcher = () => {
  const [currentLang, setCurrentLang] = useState("en");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const debouncedTranslate = debounce(async (text, targetLang) => {
    return await translateWithRetry(text, targetLang);
  }, 500);

  const handleLanguageChange = async (e) => {  // Added async here
    const selectedLang = e.target.value;
    setCurrentLang(selectedLang);
    setIsLoading(true);
    setError(null);

    const textElements = document.querySelectorAll("[data-translate]");
    
    try {
      await Promise.all(
        Array.from(textElements).map(async (element) => {
          const originalText = element.getAttribute("data-original") || element.innerText;
          console.log("Original Text: ", originalText);

          try {
            const translatedText = await debouncedTranslate(originalText, selectedLang);
            if (translatedText) {
              element.innerText = translatedText;
              element.setAttribute("data-original", originalText);
            }
          } catch (translationError) {
            console.error("Translation failed for element:", translationError);
            element.innerText = originalText;
          }
        })
      );
    } catch (error) {
      setError("Translation failed. Please try again later.");
      console.error("Translation failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <label htmlFor="language" className="mr-2 text-gray-700">
        Select Language:
      </label>
      <select
        id="language"
        value={currentLang}
        onChange={handleLanguageChange}
        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={isLoading}
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
      {isLoading && (
        <span className="ml-2 text-gray-600">Translating...</span>
      )}
      {error && (
        <div className="mt-2 text-red-500">{error}</div>
      )}
    </div>
  );
};

export default LanguageSwitcher;