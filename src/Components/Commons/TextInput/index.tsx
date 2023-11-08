import React from "react";
import "./text-input.css";

interface TextInputProps {
  title: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorText?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  title,
  value,
  onChange,
  errorText,
}) => {
  return (
    <div className="text-input-container">
      <label className="text-input-title">{title}: </label>
      <input type="text" value={value} onChange={onChange} />
      <div className="text-input-error-container">
        {errorText && <span>{errorText}</span>}
      </div>
    </div>
  );
};

export default TextInput;
