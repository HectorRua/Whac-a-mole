import React from "react";

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
    <div>
      <span>
        {title}: {value}
      </span>
      <div>
        <button
          disabled={value === minValue}
          onClick={() => {
            const newValue = value > minValue ? value - 1 : value;
            setValue(newValue);
          }}
        >
          -
        </button>
        <button
          disabled={value === maxValue}
          onClick={() => {
            const newValue = value < maxValue ? value + 1 : value;
            setValue(newValue);
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default NumericInput;
