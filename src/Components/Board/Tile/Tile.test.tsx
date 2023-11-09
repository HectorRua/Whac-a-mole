import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Tile, { GROUND, MOLE } from ".";
import { SettingsProvider } from "../../../Providers/SettingsContext";
import GROUND_IMG from "../../../Assets/Img/ground.png";
import MOLE_IMG from "../../../Assets/Img/mole.png";

describe("Tile", () => {
  it("Renders ground tile and check onClick function", () => {
    const mockOnClick = jest.fn((indexX: number, indexY: number) => {});

    render(
      <SettingsProvider>
        <Tile
          size={100}
          value={GROUND}
          indexX={2}
          indexY={3}
          onClick={mockOnClick}
        />
      </SettingsProvider>
    );

    const image: HTMLImageElement = screen.getByTestId("tile_img");
    expect(image.src).toContain(GROUND_IMG);

    fireEvent.click(image);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("Renders mole tile and check onClick function", () => {
    const mockOnClick = jest.fn((indexX: number, indexY: number) => {});

    render(
      <SettingsProvider>
        <Tile
          size={100}
          value={MOLE}
          indexX={2}
          indexY={3}
          onClick={mockOnClick}
        />
      </SettingsProvider>
    );

    const image: HTMLImageElement = screen.getByTestId("tile_img");
    expect(image.src).toContain(MOLE_IMG);

    fireEvent.click(image);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
