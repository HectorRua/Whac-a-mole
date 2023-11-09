import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Tile, { TileType, GROUND } from "./Tile";
import { SettingsProvider } from "../../Providers/SettingsContext";
import GROUND_IMG from "../../Assets/Img/ground.png";
import { createMatrix } from "../../Utils/utils";
import Board from ".";

describe("Board", () => {
  it("Renders board and check onClick function", async () => {
    const mockOnClick = jest.fn((indexX: number, indexY: number) => {});
    const boardSize = 3;
    const boardMatrix: Array<Array<TileType>> = createMatrix(
      boardSize,
      boardSize,
      GROUND
    );

    render(
      <SettingsProvider>
        <Board
          boardMatrix={boardMatrix}
          onClick={mockOnClick}
          width={300}
          height={300}
        />
      </SettingsProvider>
    );

    const images: Array<HTMLImageElement> = await screen.findAllByTestId(
      "tile_img"
    );
    expect(images.length).toEqual(9);

    images.forEach((image, index) => {
      expect(image.src).toContain(GROUND_IMG);
      fireEvent.click(image);
      expect(mockOnClick).toHaveBeenCalledTimes(index + 1);
      const tileIndexY = Math.floor(index / boardSize);
      const tileIndexX = index % boardSize;
      expect(mockOnClick).lastCalledWith(tileIndexX, tileIndexY);
    });
  });
});
