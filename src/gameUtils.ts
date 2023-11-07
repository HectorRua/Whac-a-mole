import { GROUND, MOLE, TileType } from "./Board/Tile";
import { copyObject, createRange, shuffleArray } from "./Utils/utils";

const clearBoardAndCountMoles = (boardMatrix: Array<Array<TileType>>) => {
  const rowsNumber = boardMatrix.length;
  const columnsNumber = boardMatrix[0].length;
  let molesPositions: Array<Number> = [];

  for (let j: number = 0; j < rowsNumber; j++) {
    for (let i: number = 0; i < columnsNumber; i++) {
      if (boardMatrix[j][i] === MOLE) {
        molesPositions.push(j * columnsNumber + i);
        boardMatrix[j][i] = GROUND;
      }
    }
  }
  return molesPositions;
};

export const clearBoardAndAddNewMoles = (
  boardMatrix: Array<Array<TileType>>,
  molesAtTheSameTime: number
) => {
  const newMatrix = copyObject(boardMatrix);
  const lostMolesPositions = clearBoardAndCountMoles(newMatrix);

  const rowsNumber = boardMatrix.length;
  const columnsNumber = boardMatrix[0].length;

  let range = createRange(0, rowsNumber * columnsNumber - 1);
  range = shuffleArray(range);

  range = range.filter((pos) => {
    return !lostMolesPositions.includes(pos);
  });

  const newMolesPositions = range.splice(0, molesAtTheSameTime);

  newMolesPositions.forEach((pos: number) => {
    const indexY = Math.floor(pos / columnsNumber);
    const indexX = Math.floor(pos % columnsNumber);
    newMatrix[indexY][indexX] = MOLE;
  });

  return {
    lostMoles: lostMolesPositions.length,
    newBoardMatrix: newMatrix,
  };
};
