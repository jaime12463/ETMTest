import React from "react";
import { InputBaseComponentProps, TextField } from "@material-ui/core";

type InputFieldProps = {
  disabled?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string;
  label: string;
  size?: "small" | "medium";
  type?: string;
  autoFocus?: boolean;
  inputProps?: InputBaseComponentProps;
};

const InputField = ({
  disabled,
  onChange,
  value,
  label,
  size = "small",
  type = "text",
  autoFocus,
  inputProps,
}: InputFieldProps) => {
  return (
    <TextField
      name={label.toLowerCase()}
      size={size}
      variant="outlined"
      fullWidth
      label={label}
      autoFocus={autoFocus}
      type={type}
      value={value}
      onChange={onChange}
      disabled={disabled}
      InputProps={{ inputProps }}
    />
  );
};

export default InputField;
