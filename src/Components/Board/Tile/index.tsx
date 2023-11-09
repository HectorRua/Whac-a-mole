import React, { useMemo } from "react";
import GROUND_IMG from "../../../Assets/Img/ground.png";
import MOLE_IMG from "../../../Assets/Img/mole.png";
import { useTexts } from "../../../Hooks/useTexts";
import { TEXTS } from "../../../Languages";
import "./tile.css";

export type TileType = "GROUND" | "MOLE";
export const GROUND: TileType = "GROUND";
export const MOLE: TileType = "MOLE";

interface TileProps {
  size: number;
  value: TileType;
  indexX: number;
  indexY: number;
  onClick: (indexX: number, indexY: number) => void;
}

const Tile: React.FC<TileProps> = ({
  size,
  value,
  indexX,
  indexY,
  onClick,
}) => {
  const { getText } = useTexts();
  const style: any = useMemo(() => {
    return {
      top: indexY * size,
      left: indexX * size,
    };
  }, [indexY, indexX, size]);

  const handleClick = () => {
    onClick(indexX, indexY);
  };

  return (
    <>
      {value === GROUND && (
        <img
          className="tile"
          data-testid="tile_img"
          src={GROUND_IMG}
          alt={getText(TEXTS.GROUND)}
          height={size}
          style={style}
          onClick={handleClick}
        />
      )}
      {value === MOLE && (
        <img
          data-testid="tile_img"
          className="tile"
          src={MOLE_IMG}
          alt={getText(TEXTS.MOLE)}
          height={size}
          style={style}
          onClick={handleClick}
        />
      )}
    </>
  );
};

export default Tile;
