import { useCallback, useContext } from "react";
import { getTextLanguage } from "../Languages";
import { LanguageContext } from "../Providers/LanguageContext";

export interface TextsHook {
  getText: (textKey: string) => string;
}
export const useTexts = (): TextsHook => {
  const { language } = useContext(LanguageContext);

  const getText = useCallback(
    (textKey: string) => {
      return getTextLanguage(textKey, language);
    },
    [language]
  );

  return {
    getText,
  };
};
