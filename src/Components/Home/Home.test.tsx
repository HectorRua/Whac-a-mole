import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import Home from "../Home";
import { SettingsProvider } from "../../Providers/SettingsContext";

import { BrowserRouter } from "react-router-dom";
import ENGLISH_TEXTS from "../../Languages/English";
import { createMemoryHistory } from "@remix-run/router";

describe("Home", () => {
  it("Renders Home component, there is app title and there isn't player name error", () => {
    render(
      <SettingsProvider>
        <Home />
      </SettingsProvider>,
      { wrapper: BrowserRouter }
    );
    const { getByText } = within(screen.getByTestId("app-title"));
    expect(getByText(ENGLISH_TEXTS.APP_TITLE)).toBeInTheDocument();

    expect(screen.queryByTestId("text-input-error")).toBeNull();
  });

  it("Click play button and there is an error", () => {
    const history = createMemoryHistory();
    render(
      <SettingsProvider>
        <Home />
      </SettingsProvider>,
      { wrapper: BrowserRouter }
    );
    fireEvent.click(screen.getByTestId("play-button"));
    expect(history.location.pathname).toBe("/");

    expect(screen.getByTestId("text-input-error")).toBeInTheDocument();
  });

  it("Change the player name, click play button and there isn't an error", () => {
    render(
      <SettingsProvider>
        <Home />
      </SettingsProvider>,
      { wrapper: BrowserRouter }
    );
    const playerNameInput = screen.getByTestId("text-input");
    fireEvent.change(playerNameInput, { target: { value: "PLAYER" } });
    expect((playerNameInput as HTMLInputElement).value).toBe("PLAYER");

    fireEvent.click(screen.getByTestId("play-button"));
    expect(screen.queryByTestId("text-input-error")).toBeNull();
  });
});
