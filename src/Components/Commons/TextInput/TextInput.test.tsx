import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import TextInput from ".";

describe("TextInput", () => {
  it("Check if renders text input and content, and check onChange function", async () => {
    const mockOnChange = jest.fn((changeEvent) => {});

    render(
      <TextInput
        title={"TEST"}
        value={"TEXT VALUE"}
        onChange={mockOnChange}
        errorText={undefined}
      />
    );

    const inputText: HTMLInputElement = screen.getByTestId("text-input");
    expect(inputText).toBeInTheDocument();

    expect(inputText.value).toEqual("TEXT VALUE");
    expect(screen.queryByTestId("text-input-error")).toBeNull();
    expect(mockOnChange).toHaveBeenCalledTimes(0);
    fireEvent.change(inputText, { target: { value: "NEW VALUE" } });
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it("Check if renders error text", async () => {
    const mockOnChange = jest.fn((changeEvent) => {});

    render(
      <TextInput
        title={"TEST"}
        value={"TEXT VALUE"}
        onChange={mockOnChange}
        errorText={"ERROR TEXT"}
      />
    );

    expect(screen.getByTestId("text-input-error")).toHaveTextContent(
      "ERROR TEXT"
    );
  });
});
