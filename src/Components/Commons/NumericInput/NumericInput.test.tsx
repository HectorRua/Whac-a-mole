import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import NumericInput from ".";

describe("NumericInput", () => {
  it("Check if renders numeric input and content, and check setValue function", async () => {
    const mockSetValue = jest.fn((newValue) => {});

    render(
      <NumericInput
        title="TEST"
        value={5}
        setValue={mockSetValue}
        minValue={4}
        maxValue={8}
      />
    );

    const titleAndValue = screen.getByTestId("numeric-input-title");
    expect(titleAndValue).toHaveTextContent("TEST");
    expect(titleAndValue).toHaveTextContent("5");

    const decreaseButton = screen.getByTestId("numeric-input-decrease-button");
    const increaseButton = screen.getByTestId("numeric-input-increase-button");

    expect(mockSetValue).toHaveBeenCalledTimes(0);
    fireEvent.click(decreaseButton);
    expect(mockSetValue).toHaveBeenCalledTimes(1);
    expect(mockSetValue).lastCalledWith(4);

    fireEvent.click(increaseButton);
    expect(mockSetValue).toHaveBeenCalledTimes(2);
    expect(mockSetValue).lastCalledWith(6);
  });

  it("Check min value", async () => {
    const mockSetValue = jest.fn((newValue) => {});

    render(
      <NumericInput
        title="TEST"
        value={5}
        setValue={mockSetValue}
        minValue={5}
        maxValue={8}
      />
    );

    const decreaseButton: HTMLButtonElement = screen.getByTestId(
      "numeric-input-decrease-button"
    );
    const increaseButton: HTMLButtonElement = screen.getByTestId(
      "numeric-input-increase-button"
    );

    expect(decreaseButton.disabled).toBeTruthy();
    expect(increaseButton.disabled).not.toBeTruthy();
  });

  it("Check max value", async () => {
    const mockSetValue = jest.fn((newValue) => {});

    render(
      <NumericInput
        title="TEST"
        value={8}
        setValue={mockSetValue}
        minValue={5}
        maxValue={8}
      />
    );

    const decreaseButton: HTMLButtonElement = screen.getByTestId(
      "numeric-input-decrease-button"
    );
    const increaseButton: HTMLButtonElement = screen.getByTestId(
      "numeric-input-increase-button"
    );

    expect(decreaseButton.disabled).not.toBeTruthy();
    expect(increaseButton.disabled).toBeTruthy();
  });
});
