import React, { useCallback, useContext, useState } from "react";
import {
  MAX_MOLES_AT_THE_SAME_TIME,
  MIN_BOARD_WIDTH,
  MAX_BOARD_WIDTH,
  MIN_BOARD_HEIGHT,
  MAX_BOARD_HEIGHT,
  SettingsContext,
  EASY,
  MEDIUM,
  HARD,
} from "./Providers/SettingsContext";
import { ENGLISH, SPANISH } from "./Languages";
import NumericInput from "./Commons/NumericInput";

interface OptionsProps {
  disabledOpen: boolean;
}

const Options: React.FC<OptionsProps> = ({ disabledOpen }) => {
  const {
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
  } = useContext(SettingsContext);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const handleOpenOptions = useCallback(() => {
    setShowOptions(true);
  }, []);

  const handleCloseOptions = useCallback(() => {
    setShowOptions(false);
  }, []);

  return (
    <div>
      <button onClick={handleOpenOptions} disabled={disabledOpen}>
        OPTIONS
      </button>
      {showOptions && (
        <div>
          <h1>####################</h1>
          <h1>OPTIONS</h1>
          <button onClick={handleCloseOptions}>CLOSE</button>
          <div>
            <h3>-----------</h3>
            <span>Language:</span>
            <button
              onClick={() => {
                setLanguage(ENGLISH);
              }}
              disabled={language === ENGLISH}
            >
              ENGLISH
            </button>
            <button
              onClick={() => {
                setLanguage(SPANISH);
              }}
              disabled={language === SPANISH}
            >
              SPANISH
            </button>
            <h3>-----------</h3>
          </div>
          <div>
            <h3>-----------</h3>
            <NumericInput
              title="Moles At The Same Time"
              value={molesAtTheSameTime}
              setValue={setMolesAtTheSameTime}
              minValue={1}
              maxValue={MAX_MOLES_AT_THE_SAME_TIME}
            />
            <h3>-----------</h3>
          </div>
          <div>
            <h3>-----------</h3>
            <NumericInput
              title="Board Width"
              value={boardWidth}
              setValue={setBoardWidth}
              minValue={MIN_BOARD_WIDTH}
              maxValue={MAX_BOARD_WIDTH}
            />
            <h3>-----------</h3>
          </div>
          <div>
            <h3>-----------</h3>
            <NumericInput
              title="Board Height"
              value={boardHeight}
              setValue={setBoardHeight}
              minValue={MIN_BOARD_HEIGHT}
              maxValue={MAX_BOARD_HEIGHT}
            />
            <h3>-----------</h3>
          </div>
          <div>
            <h3>-----------</h3>
            <span>Difficulty:</span>
            <button
              onClick={() => {
                setDifficulty(EASY);
              }}
              disabled={difficulty === EASY}
            >
              EASY
            </button>
            <button
              onClick={() => {
                setDifficulty(MEDIUM);
              }}
              disabled={difficulty === MEDIUM}
            >
              MEDIUM
            </button>
            <button
              onClick={() => {
                setDifficulty(HARD);
              }}
              disabled={difficulty === HARD}
            >
              HARD
            </button>
            <h3>-----------</h3>
          </div>
          <h1>####################</h1>
        </div>
      )}
    </div>
  );
};

export default Options;
