import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import OptionSelector from ".";

describe("OptionSelector", () => {
  it("Check if renders option selector and content, and check setValue function", async () => {
    const mockSetValue = jest.fn((newValue) => {});

    render(
      <OptionSelector
        title={"TEST"}
        value={"VALUE_1"}
        setValue={mockSetValue}
        options={[
          { label: "LABEL_1", value: "VALUE_1" },
          { label: "LABEL_2", value: "VALUE_2" },
          { label: "LABEL_3", value: "VALUE_3" },
        ]}
      />
    );

    //data-testid="option-selector-selected-element"
    const titleAndValue = screen.getByTestId("option-selector-title");
    expect(titleAndValue).toHaveTextContent("TEST");

    const selectedElementArray = await screen.findAllByTestId(
      "option-selector-selected-element"
    );
    const notSelectedElementsArray = await screen.findAllByTestId(
      "option-selector-element"
    );

    expect(selectedElementArray.length).toEqual(1);
    expect(notSelectedElementsArray.length).toEqual(2);

    //Click in select element don't do anything
    expect(mockSetValue).toHaveBeenCalledTimes(0);
    fireEvent.click(selectedElementArray[0]);
    expect(mockSetValue).toHaveBeenCalledTimes(0);

    notSelectedElementsArray.forEach((e) => {
      fireEvent.click(e);
    });

    expect(mockSetValue).toHaveBeenCalledWith("VALUE_2");
    expect(mockSetValue).toHaveBeenCalledWith("VALUE_3");
  });
});
