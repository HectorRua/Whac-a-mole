import React, { useCallback, useContext, useEffect, useState } from "react";
import Board from "../Board";
import { GROUND, MOLE } from "../Board/Tile";
import { SettingsContext } from "../../Providers/SettingsContext";
import { copyObject, createMatrix } from "../../Utils/utils";
import {
  clearBoardAndAddNewMoles,
  getScoreSuccess,
  getvisibilityTime,
} from "./gameUtils";
import { useLocation, useNavigate } from "react-router-dom";
import Options from "../Options";

const Game: React.FC<{}> = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { molesAtTheSameTime, boardWidth, boardHeight, difficulty } =
    useContext(SettingsContext);

  const [userName, setUserName] = useState<string>("");
  const [boardMatrix, setBoardMatrix] = useState(
    createMatrix(boardWidth, boardHeight, GROUND)
  );
  const [score, setScore] = useState(0);
  const [timerCycles, setTimerCycles] = useState(0);
  const [lostMoles, setLostMoles] = useState({
    lastTimerCycle: 0,
    lostMoles: 0,
  });
  const [timer, setTimer] = useState<NodeJS.Timer | undefined>(undefined);

  useEffect(() => {
    if (location?.state?.userName) {
      setUserName(location?.state?.userName);
    } else {
      navigate("/");
    }
  }, [location, navigate]);

  useEffect(() => {
    setBoardMatrix(createMatrix(boardWidth, boardHeight, GROUND));
  }, [boardWidth, boardHeight]);

  const handleClickBoard = useCallback(
    (indexX: number, indexY: number) => {
      const NewMatrix = copyObject(boardMatrix);
      const tileValue = NewMatrix[indexY][indexX];
      if (tileValue === MOLE) {
        NewMatrix[indexY][indexX] = GROUND;
        setBoardMatrix(NewMatrix);
        setScore(score + getScoreSuccess(difficulty));
      }
    },
    [boardMatrix, score, difficulty]
  );

  const addRandomMole = useCallback(() => {
    setTimerCycles((newTimerCycles) => {
      console.log(JSON.stringify({ newTimerCycles, timerCycles }));

      setBoardMatrix((boardMatrix) => {
        const { lostMoles, newBoardMatrix } = clearBoardAndAddNewMoles(
          boardMatrix,
          molesAtTheSameTime
        );

        setLostMoles((oldLostMolesObject) => {
          if (oldLostMolesObject.lastTimerCycle < newTimerCycles) {
            return {
              lastTimerCycle: newTimerCycles,
              lostMoles: oldLostMolesObject.lostMoles + lostMoles,
            };
          } else {
            return oldLostMolesObject;
          }
        });
        return newBoardMatrix;
      });
      return newTimerCycles + 1;
    });
  }, [timerCycles, molesAtTheSameTime]);

  const handleClickStart = useCallback(() => {
    addRandomMole();
    const timer = setInterval(() => {
      addRandomMole();
    }, getvisibilityTime(difficulty));
    setTimer(timer);
  }, [addRandomMole, difficulty]);

  const handleClickStop = useCallback(() => {
    clearInterval(timer);
    setTimer(undefined);
  }, [timer]);

  const handleClickReset = useCallback(() => {
    setTimerCycles(0);
    setScore(0);
    setLostMoles({
      lastTimerCycle: 0,
      lostMoles: 0,
    });
    handleClickStart();
  }, [handleClickStart]);

  const screenHeight = window.innerHeight;
  const screenWidth = window.innerWidth;

  return (
    <div>
      <Options disabledOpen={timer !== undefined} />
      <h1>userName: {userName}</h1>
      <h1>difficulty: {difficulty}</h1>
      <h1>
        SCORE: {score} LOST MOLES: {lostMoles.lostMoles}
      </h1>
      {timer === undefined && timerCycles > 0 && (
        <button onClick={handleClickReset}>New game</button>
      )}
      {timer === undefined && (
        <button onClick={handleClickStart}>
          {timerCycles === 0 ? "New game" : "CONTINUE"}
        </button>
      )}
      {timer !== undefined && <button onClick={handleClickStop}>STOP</button>}
      <Board
        boardMatrix={boardMatrix}
        onClick={handleClickBoard}
        width={screenWidth}
        height={screenHeight - 150}
      />
    </div>
  );
};

export default Game;
