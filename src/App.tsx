import React, { useState } from "react";
import Board from "./Board";
import { GROUND, MOLE } from "./Board/Tile";
import { LanguageProvider } from "./Providers/LanguageContext";
import "./PRUEBA.css";

const boardWidth = 4;
const boardHeight = 4;

const createArray = (size: number, element: any) => {
  return Array.from(Array(size)).map(() => element);
};

const createMatrix = (width: number, height: number, element: any) => {
  const array = createArray(height, undefined);
  return array.map(() => {
    return createArray(width, element);
  });
};

function App() {
  const [matrix, setMatrix] = useState(createMatrix(5, 3, 0));

  const boardMatrix = matrix.map((row) => {
    return row.map((e) => {
      return e === 0 ? GROUND : MOLE;
    });
  });

  const handleClickBoard = (indexX: number, indexY: number) => {
    const AAA = JSON.parse(JSON.stringify(matrix));
    AAA[indexY][indexX] = 1 - AAA[indexY][indexX];
    setMatrix(AAA);
  };

  const screenHeight = window.innerHeight;
  const screenWidth = window.innerWidth;

  return (
    <LanguageProvider>
      <div>
        <Board
          boardMatrix={boardMatrix}
          onClick={handleClickBoard}
          width={screenWidth}
          height={screenHeight}
        />
      </div>
    </LanguageProvider>
  );
}

export default App;
