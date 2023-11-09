import { ENGLISH, getTextLanguage, SPANISH } from ".";
import ENGLISH_TEXTS from "./English";
import SPANISH_TEXTS from "./Spanish";

describe("Language", () => {
  it("Check if languages dictionaries have the same keys and getTextLanguage return that keys", () => {
    const EnglishDictionaryWords = Object.keys(ENGLISH_TEXTS);
    const SpanishDictionaryWords = Object.keys(SPANISH_TEXTS);
    expect(EnglishDictionaryWords.length).toEqual(
      SpanishDictionaryWords.length
    );

    EnglishDictionaryWords.forEach((w) => {
      const EnglishWord = getTextLanguage(w, ENGLISH);
      const SpanishWord = getTextLanguage(w, SPANISH);
      expect((ENGLISH_TEXTS as any)[w]).toEqual(EnglishWord);
      expect((SPANISH_TEXTS as any)[w]).toEqual(SpanishWord);
    });
  });
});
