import React from "react";
import { Grid, TextField } from "@material-ui/core";

type InputFieldProps = {
  disabled?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string;
  label: string;
  xs?: boolean | any | undefined;
  sm?: boolean | any | undefined;
  size?: string;
  min?: any;
  type?: string;
  autoFocus?: any;
  inputProps?: Object;
};

const InputField = ({
  disabled,
  onChange,
  value,
  label,
  xs,
  sm,
  size,
  min,
  type = "text",
  autoFocus,
  inputProps,
}: InputFieldProps) => {
  return (
    <Grid item xs={xs} sm={sm}>
      <TextField
        name={label.toLowerCase()}
        size="small"
        variant="outlined"
        fullWidth
        label={label}
        autoFocus={autoFocus}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        InputProps={{
          inputProps,
        }}
      />
    </Grid>
  );
};

export default InputField;
