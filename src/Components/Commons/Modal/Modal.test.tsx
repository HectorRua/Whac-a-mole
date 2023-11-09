import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Modal from ".";

describe("Modal", () => {
  it("Check if renders modal and content, and check closeModal function", async () => {
    const mockOnClose = jest.fn(() => {});

    render(
      <Modal closeModal={mockOnClose}>
        <div data-testid="test">
          <h1>TEST</h1>
        </div>
      </Modal>
    );

    const background = screen.getByTestId("modal-background");
    //const { getByText } = within(screen.getByTestId("app-title"));
    expect(background).toBeInTheDocument();
    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByTestId("test")).toBeInTheDocument();

    expect(mockOnClose).toHaveBeenCalledTimes(0);
    fireEvent.click(background);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
