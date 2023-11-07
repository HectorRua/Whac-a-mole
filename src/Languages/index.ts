import ENGLISH_TEXTS from "./English";
import SPANISH_TEXTS from "./Spanish";

export const ENGLISH = "ENGLISH";
export const SPANISH = "SPANISH";

// Create other dictionary with keys of language dictionary
export const TEXTS: Record<string, string> = {};
Object.keys(ENGLISH_TEXTS).forEach((k) => {
  TEXTS[k] = k;
});

const getTextFromDictionary = (
  textKey: string,
  dictionary: Record<string, string>
) => {
  if (Object.keys(dictionary).includes(textKey)) {
    return dictionary[textKey];
  }
  return "---";
};

export const getTextLanguage = (textKey: string, language: string) => {
  switch (language) {
    case ENGLISH:
      return getTextFromDictionary(textKey, ENGLISH_TEXTS);
    case SPANISH:
      return getTextFromDictionary(textKey, SPANISH_TEXTS);
    default:
      return "AAA";
    //return getTextFromDictionary(textKey, ENGLISH_TEXTS);
  }
};
