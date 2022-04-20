import {Control, Controller} from 'react-hook-form';
import {TextField, TextFieldProps} from '@mui/material';

interface Props {
	control?: Control<any> | undefined; //TODO: Este any debe ser un typo extendible de FormValues
	defaultValue?: string;
	inputDataCY?: string;
	name: string;
	rules?: any;
}

export type PropsInput = Props & TextFieldProps;

export const Input: React.VFC<PropsInput> = ({
	control,
	name,
	defaultValue,
	rules,
	inputDataCY,
	inputProps,
	variant,
	size,
	...other
}) => {
	return (
		<Controller
			render={({field: {onChange, onBlur, value}}) => (
				<TextField
					value={value}
					onChange={onChange}
					onBlur={onBlur}
					fullWidth
					variant={variant ?? 'outlined'}
					size={size ?? 'small'}
					inputProps={{
						'data-cy': inputDataCY,
						...inputProps,
					}}
					{...other}
				/>
			)}
			control={control}
			name={name}
			defaultValue={defaultValue}
			rules={rules}
		/>
	);
};
