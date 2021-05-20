import PropTypes from "prop-types";
import { Grid, TextField } from "@material-ui/core";

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
}) => {
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

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  xs: PropTypes.number.isRequired,
  sm: PropTypes.number.isRequired,
  type: PropTypes.string,
};

export default InputField;
