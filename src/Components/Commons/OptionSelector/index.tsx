import React from "react";
import "./option-selector.css";

interface OptionType {
  label: string;
  value: any;
}

interface OptionSelectorProps {
  title: string;
  value: any;
  setValue: (value: any) => void;
  options: Array<OptionType>;
}

const OptionSelector: React.FC<OptionSelectorProps> = ({
  title,
  value,
  setValue,
  options,
}) => {
  return (
    <div className="option-selector-container">
      <span className="option-selector-title">
        <b>{title}: </b>
      </span>
      {options.map((o) => {
        if (o.value === value) {
          return (
            <b>
              <span className="option-selector-element option-selector-selected-element">
                {o.label}
              </span>
            </b>
          );
        } else {
          return (
            <span
              className="option-selector-element"
              onClick={() => setValue(o.value)}
            >
              {o.label}
            </span>
          );
        }
      })}
    </div>
  );
};

export default OptionSelector;
