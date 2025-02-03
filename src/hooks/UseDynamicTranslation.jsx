import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { translateText } from "../utils/lingvaAPI";

const useDynamicTranslation = (text) => {
  const { selectedLanguage } = useContext(LanguageContext);
  const [translatedText, setTranslatedText] = useState(text);

  useEffect(() => {
    const fetchTranslation = async () => {
      if (selectedLanguage === "en") {
        setTranslatedText(text);
        return;
      }

      try {
        const translation = await translateText(text, selectedLanguage);
        setTranslatedText(translation);
      } catch (error) {
        console.error("Translation error:", error);
        setTranslatedText(text); // Fallback to original text
      }
    };

    fetchTranslation();
  }, [text, selectedLanguage]);

  return translatedText;
};

export default useDynamicTranslation;
