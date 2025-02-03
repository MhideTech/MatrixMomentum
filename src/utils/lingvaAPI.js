import axios from "axios";
const LINGVA_BASE_URL = "https://lingva.ml/api/v1";

export const translateText = async (text, targetLanguage, sourceLanguage = "en") => {
  try {
    const response = await axios.get(
      `${LINGVA_BASE_URL}/${sourceLanguage}/${targetLanguage}/${encodeURIComponent(text)}`
    );
    return response.data.translation;
  } catch (error) {
    console.error("Translation error:", error);
    return text; // Return the original text if translation fails
  }
};
