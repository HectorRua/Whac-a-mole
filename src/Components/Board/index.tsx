import React from "react";
import Tile, { TileType } from "./Tile";
import "./board.css";

interface BoardProps {
  boardMatrix: Array<Array<TileType>>;
  onClick: (indexX: number, indexY: number) => void;
  width: number;
  height: number;
}

const Board: React.FC<BoardProps> = ({
  boardMatrix,
  onClick,
  width,
  height,
}) => {
  const rowsNumber = boardMatrix.length;
  const columnsNumber = boardMatrix[0].length;

  const size = Math.min(
    Math.floor(height / rowsNumber),
    Math.floor(width / columnsNumber)
  );

  return (
    <div className="board">
      {boardMatrix.map((row, indexY) => {
        return row.map((e, indexX) => {
          return (
            <Tile
              key={indexY + ":" + indexX}
              size={size}
              value={e}
              indexX={indexX}
              indexY={indexY}
              onClick={onClick}
            />
          );
        });
      })}
    </div>
  );
};

export default Board;
