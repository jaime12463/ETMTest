import React from "react";
import { TextField } from "@material-ui/core";

//Y estos nombres en español o ingles?

export type Props = {
  disabled?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string;
  label: string;
  size?: "small" | "medium";
  type?: string;
  autoFocus?: boolean;
  inputDataCY?: string;
};

const InputTexto = ({
  disabled,
  onChange,
  value,
  label,
  size = "small",
  type = "text",
  autoFocus,
  inputDataCY,
}: Props) => {
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
      inputProps={{
        "data-cy": inputDataCY,
      }}
    />
  );
};

export default InputTexto;
