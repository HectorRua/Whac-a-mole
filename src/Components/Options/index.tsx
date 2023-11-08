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
} from "../../Providers/SettingsContext";
import { TEXTS, ENGLISH, SPANISH } from "../../Languages";
import NumericInput from "../Commons/NumericInput";
import Modal from "../Commons/Modal";
import OptionSelector from "../Commons/OptionSelector";
import { useTexts } from "../../Hooks/useTexts";

interface OptionsProps {
  classNameButton?: string;
  disabledOpen?: boolean;
}

const Options: React.FC<OptionsProps> = ({ disabledOpen, classNameButton }) => {
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
  const { getText } = useTexts();

  const [showOptions, setShowOptions] = useState<boolean>(false);
  const handleOpenOptions = useCallback(() => {
    setShowOptions(true);
  }, []);

  const handleCloseOptions = useCallback(() => {
    setShowOptions(false);
  }, []);

  return (
    <>
      <button
        className={classNameButton}
        onClick={handleOpenOptions}
        disabled={disabledOpen}
      >
        {getText(TEXTS.OPTIONS)}
      </button>
      {showOptions && (
        <Modal closeModal={handleCloseOptions}>
          <h1>{getText(TEXTS.OPTIONS).toUpperCase()}</h1>
          <OptionSelector
            title={getText(TEXTS.LANGUAGE)}
            value={language}
            setValue={setLanguage}
            options={[ENGLISH, SPANISH].map((e) => {
              return { label: getText(e), value: e };
            })}
          />
          <NumericInput
            title={getText(TEXTS.MOLES_AT_THE_SAME_TIME)}
            value={molesAtTheSameTime}
            setValue={setMolesAtTheSameTime}
            minValue={1}
            maxValue={MAX_MOLES_AT_THE_SAME_TIME}
          />
          <NumericInput
            title={getText(TEXTS.BOARD_WIDTH)}
            value={boardWidth}
            setValue={setBoardWidth}
            minValue={MIN_BOARD_WIDTH}
            maxValue={MAX_BOARD_WIDTH}
          />
          <NumericInput
            title={getText(TEXTS.BOARD_HEIGHT)}
            value={boardHeight}
            setValue={setBoardHeight}
            minValue={MIN_BOARD_HEIGHT}
            maxValue={MAX_BOARD_HEIGHT}
          />
          <OptionSelector
            title={getText(TEXTS.DIFFICULTY)}
            value={difficulty}
            setValue={setDifficulty}
            options={[EASY, MEDIUM, HARD].map((e) => {
              return { label: getText(e), value: e };
            })}
          />
        </Modal>
      )}
    </>
  );
};

export default Options;
