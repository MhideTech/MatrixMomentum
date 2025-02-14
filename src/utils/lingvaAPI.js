import axios from "axios";

// Using LibreTranslate public instance
const BASE_URL = "https://libretranslate.de/translate";

export const translateText = async (text, targetLanguage, sourceLanguage = "en") => {
  try {
    const response = await axios.post(BASE_URL, {
      q: text,
      source: sourceLanguage,
      target: targetLanguage,
      format: "text"
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 15000
    });

    if (response.data && response.data.translatedText) {
      return response.data.translatedText;
    }
    throw new Error("Invalid translation response format");
  } catch (error) {
    console.error("Translation error:", error);
    throw new Error('Translation failed. Please try again later.');
  }
};

export const translateWithRetry = async (text, targetLanguage, sourceLanguage = "en", maxRetries = 2) => {
  let lastError;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await translateText(text, targetLanguage, sourceLanguage);
    } catch (error) {
      console.log(`Attempt ${i + 1} failed:`, error.message);
      lastError = error;
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
  
  throw lastError;
};