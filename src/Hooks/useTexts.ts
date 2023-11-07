import { useCallback, useContext } from "react";
import { getTextLanguage } from "../Languages";
import { SettingsContext } from "../Providers/SettingsContext";

export interface TextsHook {
  getText: (textKey: string) => string;
}
export const useTexts = (): TextsHook => {
  const { language } = useContext(SettingsContext);

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
