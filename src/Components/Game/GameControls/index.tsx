import React from "react";
import Options from "../../Options";
import { DifficultyType } from "../../../Providers/SettingsContext";
import "./game-controls.css";
import { TEXTS } from "../../../Languages";
import { useTexts } from "../../../Hooks/useTexts";

interface GameControlsProps {
  userName: string;
  difficulty: DifficultyType;
  score: number;
  lostMoles: number;
  timer: NodeJS.Timer | undefined;
  timerCycles: number;
  handleClickStart: () => void;
  handleClickStop: () => void;
  handleClickReset: () => void;
}

const GameControls: React.FC<GameControlsProps> = ({
  userName,
  difficulty,
  score,
  lostMoles,
  timer,
  timerCycles,
  handleClickStart,
  handleClickStop,
  handleClickReset,
}) => {
  const { getText } = useTexts();
  return (
    <div className="game-controls-container">
      <div className="game-controls-row">
        <h1 className="game-controls-text">
          {getText(TEXTS.PLAYER_NAME)}: {userName}
        </h1>
      </div>
      <div className="game-controls-row">
        <h1 className="game-controls-text">
          {getText(TEXTS.DIFFICULTY)}: {getText(difficulty)}
        </h1>
      </div>
      <div className="game-controls-row">
        <h1 className="game-controls-text">
          {getText(TEXTS.SCORE)}: {score}
        </h1>
        <h1 className="game-controls-text">
          {getText(TEXTS.LOST_MOLES)}: {lostMoles}
        </h1>
      </div>
      <div className="game-controls-row">
        {timer === undefined && timerCycles > 0 && (
          <button className="game-controls-buttons" onClick={handleClickReset}>
            {getText(TEXTS.NEW_GAME)}
          </button>
        )}
        {timer === undefined && (
          <button className="game-controls-buttons" onClick={handleClickStart}>
            {timerCycles === 0
              ? getText(TEXTS.NEW_GAME)
              : getText(TEXTS.CONTINUE)}
          </button>
        )}
        {timer !== undefined && (
          <button className="game-controls-buttons" onClick={handleClickStop}>
            {getText(TEXTS.PAUSE)}
          </button>
        )}
        <Options
          classNameButton="game-controls-buttons"
          disabledOpen={timer !== undefined}
        />
      </div>
    </div>
  );
};

export default GameControls;
