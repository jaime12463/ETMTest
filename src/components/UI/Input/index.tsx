import {Control, Controller} from 'react-hook-form';
import {TextField as TextFieldMUI, TextFieldProps} from '@material-ui/core';

type Props = {
	control?: Control<any> | undefined; //TODO: Este any debe ser un typo extendible de FormValues
	name: string;
	defaultValue?: string;
	rules?: any;
	inputDataCY?: string;
	className?: string | undefined;
};

export type PropsInput = Props & TextFieldProps;

const Input = (props: PropsInput) => {
	const {
		control,
		name,
		defaultValue,
		rules,
		inputDataCY,
		inputProps,
		variant,
		size,
		...other
	} = props;
	return (
		<Controller
			render={({field: {onChange, onBlur, value}}) => (
				<TextFieldMUI
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
export default Input;
