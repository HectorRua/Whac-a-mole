import React, { useCallback, useState } from "react";
import Board from "./Board";
import { GROUND, MOLE } from "./Board/Tile";
import { LanguageProvider } from "./Providers/LanguageContext";
import { copyObject, createMatrix } from "./Utils/utils";
import { clearBoardAndAddNewMoles } from "./gameUtils";

const molesAtTheSameTime = 2;

function Game() {
  const [boardWidth, setBoardWidth] = useState(4);
  const [boardHeight, setBoardHeight] = useState(4);
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

  const handleClickBoard = useCallback(
    (indexX: number, indexY: number) => {
      const NewMatrix = copyObject(boardMatrix);
      const tileValue = NewMatrix[indexY][indexX];
      if (tileValue === MOLE) {
        NewMatrix[indexY][indexX] = GROUND;
        setBoardMatrix(NewMatrix);
        setScore(score + 10);
      }
    },
    [boardMatrix, score]
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
  }, [timerCycles]);

  const handleClickStart = useCallback(() => {
    addRandomMole();
    const timer = setInterval(() => {
      addRandomMole();
    }, 3000);
    setTimer(timer);
  }, [addRandomMole]);

  const handleClickStop = useCallback(() => {
    clearInterval(timer);
    setTimer(undefined);
  }, [timer]);

  const screenHeight = window.innerHeight;
  const screenWidth = window.innerWidth;

  return (
    <LanguageProvider>
      <div>
        <h1>
          SCORE: {score} LOST MOLES: {lostMoles.lostMoles}
        </h1>
        {timer === undefined && (
          <button onClick={handleClickStart}>START</button>
        )}
        {timer !== undefined && <button onClick={handleClickStop}>STOP</button>}
        <Board
          boardMatrix={boardMatrix}
          onClick={handleClickBoard}
          width={screenWidth}
          height={screenHeight - 150}
        />
      </div>
    </LanguageProvider>
  );
}

export default Game;
