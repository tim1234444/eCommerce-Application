import React from "react";

interface Props {
  label: string;
  type: string;
  value: string;
  error: string;
  onChange: (value: string) => void;
  onValidate: () => void;
}

const InputField: React.FC<Props> = ({ label, type, value, error, onChange, onValidate }) => {
  return (
    <div className="field">
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        onBlur={onValidate}
      />
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default InputField;
