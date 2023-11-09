import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { SettingsProvider } from "../../Providers/SettingsContext";

import ENGLISH_TEXTS from "../../Languages/English";
import Options from ".";

describe("Options", () => {
  it("Check if options modal start closed", () => {
    render(
      <SettingsProvider>
        <Options />
      </SettingsProvider>
    );

    const { getByText } = within(
      screen.getByTestId("options-button-open-modal")
    );
    expect(getByText(ENGLISH_TEXTS.OPTIONS)).toBeInTheDocument();

    expect(screen.queryByTestId("options-title")).toBeNull();
  });

  it("Open options modal and check exists options elements", () => {
    render(
      <SettingsProvider>
        <Options />
      </SettingsProvider>
    );

    fireEvent.click(screen.getByTestId("options-button-open-modal"));

    expect(screen.getByTestId("options-title")).toBeInTheDocument();
    expect(screen.getByText(/Language/i)).toBeInTheDocument();
    expect(screen.getByText(/Moles At The Same Time/i)).toBeInTheDocument();
    expect(screen.getByText(/Board Width/i)).toBeInTheDocument();
    expect(screen.getByText(/Board Height/i)).toBeInTheDocument();
    expect(screen.getByText(/Difficulty/i)).toBeInTheDocument();
  });
});
