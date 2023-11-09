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
      <span
        className="option-selector-title"
        data-testid="option-selector-title"
      >
        <b>{title}: </b>
      </span>
      {options.map((o) => {
        if (o.value === value) {
          return (
            <b key={o.value}>
              <span
                className="option-selector-element option-selector-selected-element"
                data-testid="option-selector-selected-element"
              >
                {o.label}
              </span>
            </b>
          );
        } else {
          return (
            <span
              key={o.value}
              className="option-selector-element"
              data-testid="option-selector-element"
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
