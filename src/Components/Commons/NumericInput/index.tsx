import React from "react";
import "./numeric-input.css";

interface NumericInputProps {
  title: string;
  value: number;
  setValue: (value: number) => void;
  minValue: number;
  maxValue: number;
}

const NumericInput: React.FC<NumericInputProps> = ({
  title,
  value,
  setValue,
  minValue,
  maxValue,
}) => {
  return (
    <div className="numeric-input-container">
      <span className="numeric-input-title" data-testid="numeric-input-title">
        <b>
          {title}: {value}
        </b>
      </span>
      <button
        className="numeric-input-button"
        data-testid="numeric-input-decrease-button"
        disabled={value === minValue}
        onClick={() => {
          const newValue = value > minValue ? value - 1 : value;
          setValue(newValue);
        }}
      >
        <b>-</b>
      </button>
      <button
        className="numeric-input-button"
        data-testid="numeric-input-increase-button"
        disabled={value === maxValue}
        onClick={() => {
          const newValue = value < maxValue ? value + 1 : value;
          setValue(newValue);
        }}
      >
        <b>+</b>
      </button>
    </div>
  );
};

export default NumericInput;
