import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import GameControls from ".";
import { EASY, SettingsProvider } from "../../../Providers/SettingsContext";
import ENGLISH_TEXTS from "../../../Languages/English";

describe("GameControls", () => {
  it("Check if renders game controls and content, and check onClicks functions", async () => {
    const mockClickStart = jest.fn(() => {});
    const mockClickStop = jest.fn(() => {});
    const mockClickReset = jest.fn(() => {});

    render(
      <SettingsProvider>
        <GameControls
          userName="PLAYER"
          difficulty={EASY}
          score={10}
          lostMoles={33}
          timer={undefined}
          timerCycles={0}
          onClickStart={mockClickStart}
          onClickStop={mockClickStop}
          onClickReset={mockClickReset}
        />
      </SettingsProvider>
    );

    const container = screen.getByTestId("game-controls-container");
    expect(container).toHaveTextContent("PLAYER");
    expect(container).toHaveTextContent(ENGLISH_TEXTS.EASY);
    expect(container).toHaveTextContent("10");

    const startButton = screen.getByTestId("game-controls-button-start");
    expect(screen.queryByTestId("game-controls-button-reset")).toBeNull();
    expect(screen.queryByTestId("game-controls-button-pause")).toBeNull();

    expect(mockClickStart).toHaveBeenCalledTimes(0);
    fireEvent.click(startButton);
    expect(mockClickStart).toHaveBeenCalledTimes(1);
  });

  it("Check stop button", async () => {
    const mockClickStart = jest.fn(() => {});
    const mockClickStop = jest.fn(() => {});
    const mockClickReset = jest.fn(() => {});

    render(
      <SettingsProvider>
        <GameControls
          userName="PLAYER"
          difficulty={EASY}
          score={10}
          lostMoles={33}
          timer={setInterval(() => {}, 100000)}
          timerCycles={0}
          onClickStart={mockClickStart}
          onClickStop={mockClickStop}
          onClickReset={mockClickReset}
        />
      </SettingsProvider>
    );

    const stopButton = screen.getByTestId("game-controls-button-pause");
    expect(screen.queryByTestId("game-controls-button-reset")).toBeNull();
    expect(screen.queryByTestId("game-controls-button-start")).toBeNull();

    expect(mockClickStop).toHaveBeenCalledTimes(0);
    fireEvent.click(stopButton);
    expect(mockClickStop).toHaveBeenCalledTimes(1);
  });
  it("Check reset button", async () => {
    const mockClickStart = jest.fn(() => {});
    const mockClickStop = jest.fn(() => {});
    const mockClickReset = jest.fn(() => {});

    render(
      <SettingsProvider>
        <GameControls
          userName="PLAYER"
          difficulty={EASY}
          score={10}
          lostMoles={33}
          timer={undefined}
          timerCycles={55}
          onClickStart={mockClickStart}
          onClickStop={mockClickStop}
          onClickReset={mockClickReset}
        />
      </SettingsProvider>
    );

    const startButton = screen.getByTestId("game-controls-button-start");
    const resetButton = screen.getByTestId("game-controls-button-reset");
    expect(screen.queryByTestId("game-controls-button-pause")).toBeNull();

    expect(mockClickStart).toHaveBeenCalledTimes(0);
    fireEvent.click(startButton);
    expect(mockClickStart).toHaveBeenCalledTimes(1);

    expect(mockClickReset).toHaveBeenCalledTimes(0);
    fireEvent.click(resetButton);
    expect(mockClickReset).toHaveBeenCalledTimes(1);
  });
});
