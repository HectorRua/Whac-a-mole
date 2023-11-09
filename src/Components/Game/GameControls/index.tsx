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
  onClickStart: () => void;
  onClickStop: () => void;
  onClickReset: () => void;
}

const GameControls: React.FC<GameControlsProps> = ({
  userName,
  difficulty,
  score,
  lostMoles,
  timer,
  timerCycles,
  onClickStart,
  onClickStop,
  onClickReset,
}) => {
  const { getText } = useTexts();
  return (
    <div
      className="game-controls-container"
      data-testid="game-controls-container"
    >
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
          <button
            className="game-controls-buttons"
            onClick={onClickReset}
            data-testid="game-controls-button-reset"
          >
            {getText(TEXTS.NEW_GAME)}
          </button>
        )}
        {timer === undefined && (
          <button
            className="game-controls-buttons"
            onClick={onClickStart}
            data-testid="game-controls-button-start"
          >
            {timerCycles === 0
              ? getText(TEXTS.NEW_GAME)
              : getText(TEXTS.CONTINUE)}
          </button>
        )}
        {timer !== undefined && (
          <button
            className="game-controls-buttons"
            onClick={onClickStop}
            data-testid="game-controls-button-pause"
          >
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
