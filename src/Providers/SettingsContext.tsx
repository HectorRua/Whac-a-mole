import React, { useState } from "react";
import { ENGLISH } from "../Languages";

const DEFAULT_LANGUAGE = ENGLISH;
const DEFAULT_MOLES_AT_THE_SAME_TIME = 1;
export const MAX_MOLES_AT_THE_SAME_TIME = 8;
const DEFAULT_BOARD_WIDTH = 3;
const DEFAULT_BOARD_HEIGHT = 3;
export const MIN_BOARD_WIDTH = 2;
export const MIN_BOARD_HEIGHT = 2;
export const MAX_BOARD_WIDTH = 8;
export const MAX_BOARD_HEIGHT = 8;

export type DifficultyType = "EASY" | "MEDIUM" | "HARD";
export const EASY: DifficultyType = "EASY";
export const MEDIUM: DifficultyType = "MEDIUM";
export const HARD: DifficultyType = "HARD";

const DEFAULT_DIFFICULTY = EASY;

export const SCORE_SUCCESS_EASY = 10;
export const SCORE_SUCCESS_MEDIUM = 20;
export const SCORE_SUCCESS_HARD = 30;

export const VISIBILITY_TIME_EASY = 1000;
export const VISIBILITY_TIME_MEDIUM = 750;
export const VISIBILITY_TIME_HARD = 500;

export interface SettingsContextType {
  language: string;
  setLanguage: (Language: string) => void;
  molesAtTheSameTime: number;
  setMolesAtTheSameTime: (molesAtTheSameTime: number) => void;
  boardWidth: number;
  setBoardWidth: (boardWidth: number) => void;
  boardHeight: number;
  setBoardHeight: (boardHeight: number) => void;
  difficulty: DifficultyType;
  setDifficulty: (difficulty: DifficultyType) => void;
}

export const SettingsContext = React.createContext<SettingsContextType>(
  undefined as unknown as SettingsContextType
);

export const SettingsProvider: React.FC<any> = ({ children }) => {
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);
  const [molesAtTheSameTime, setMolesAtTheSameTime] = useState(
    DEFAULT_MOLES_AT_THE_SAME_TIME
  );
  const [boardWidth, setBoardWidth] = useState(DEFAULT_BOARD_WIDTH);
  const [boardHeight, setBoardHeight] = useState(DEFAULT_BOARD_HEIGHT);

  const [difficulty, setDifficulty] =
    useState<DifficultyType>(DEFAULT_DIFFICULTY);

  return (
    <SettingsContext.Provider
      value={{
        language,
        setLanguage,
        molesAtTheSameTime,
        setMolesAtTheSameTime,
        boardWidth,
        setBoardWidth,
        boardHeight,
        setBoardHeight,
        difficulty,
        setDifficulty,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
