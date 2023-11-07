import React from "react";
import GROUND_IMG from "../../Assets/Img/ground.png";
import MOLE_IMG from "../../Assets/Img/mole.png";
import { useTexts } from "../../Hooks/useTexts";
import { TEXTS } from "../../Languages";

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
  const style: any = {
    position: "absolute",
    top: indexY * size,
    left: indexX * size,
  };

  const handleClick = () => {
    onClick(indexX, indexY);
  };

  return (
    <>
      {value === GROUND && (
        <img
          src={GROUND_IMG}
          alt={getText(TEXTS.GROUND)}
          height={size}
          title={getText(TEXTS.GROUND)}
          style={style}
          onClick={handleClick}
        />
      )}
      {value === MOLE && (
        <img
          src={MOLE_IMG}
          alt={getText(TEXTS.MOLE)}
          height={size}
          title={getText(TEXTS.MOLE)}
          style={style}
          onClick={handleClick}
        />
      )}
    </>
  );
};

export default Tile;