import React, { useState } from "react";

// List of supported languages
const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "zh", name: "Chinese" },
];

const LanguageSwitcher = () => {
  const [currentLang, setCurrentLang] = useState("en");

  const handleLanguageChange = async (e) => {
    const selectedLang = e.target.value;
    setCurrentLang(selectedLang);

    const textElements = document.querySelectorAll("[data-translate]");
    textElements.forEach(async (element) => {
      const originalText =
        element.getAttribute("data-original") || element.innerText;
      console.log("Original Text: ", originalText);

      // CORS Proxy and API URL (alternative CORS proxy)
      const proxyUrl = "https://api.allorigins.win/get?url=";
      const apiUrl = `https://lingva.ml/translate?text=${encodeURIComponent(originalText)}&target_lang=${selectedLang}`;
      const finalUrl = proxyUrl + encodeURIComponent(apiUrl); // Combining proxy and actual API URL

      try {
        const response = await fetch(finalUrl, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.contents && data.contents.text) {
          console.log("Translated Text: ", data.contents.text);
          element.innerText = data.contents.text; // Update the element's text with translated text
          element.setAttribute("data-original", originalText); // Store original text in a data attribute
        } else {
          throw new Error("No translation data returned");
        }
      } catch (error) {
        console.error("Translation failed:", error);
      }
    });
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
        className="p-2 border rounded-md focus:outline-none"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;
