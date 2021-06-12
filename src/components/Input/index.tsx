import { Controller } from "react-hook-form";
import { TextField } from "@material-ui/core";

export type Props = {
    control?: any,
    name: string,
    label: string,
    defaultValue?: any,
    rules?: any,
    disabled?: boolean,
    type?: any,
    autoFocus?: any,
    inputRef?: any,
    inputDataCY?: string,
}

const Input = ({
    control,
    name,
    label,
    defaultValue="",
    rules={},
    disabled=false,
    type = "text",
    autoFocus,
    inputDataCY,
    inputRef,
}: Props) => (
    <Controller
        render={({ field: { onChange, onBlur, value } }) => (
            <TextField
                onChange={onChange}
                onBlur={onBlur}
                type={type}
                value={value}
                name={label.toLowerCase()}
                size="small"
                variant="outlined"
                fullWidth
                label={label}
                autoFocus={autoFocus}
                disabled={disabled}
                inputRef={inputRef}
                inputProps={{
                  "data-cy": inputDataCY,
                }}
            />
        )}
        control={control}
        name={name}
        defaultValue={defaultValue}
        rules={rules}
    />
);
export default Input;
