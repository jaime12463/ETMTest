import {Control, Controller} from 'react-hook-form';
import {TextField} from '@material-ui/core';
import {Ref} from 'react';
import useEstilos from './useEstilos';

export type Props = {
	control?: Control<any> | undefined; //TODO: Este any debe ser un typo extendible de FormValues
	name: string;
	label: string;
	defaultValue?: string;
	rules?: any;
	disabled?: boolean | undefined;
	type?: string | undefined;
	autoFocus?: boolean | undefined;
	inputRef?: Ref<any> | undefined;
	inputDataCY?: string;
	clase?: string | undefined;
};

const Input = ({
	control,
	name,
	label,
	defaultValue = '',
	rules = {},
	disabled = false,
	type = 'text',
	autoFocus,
	inputDataCY,
	inputRef,
	clase,
}: Props) => {
	const estilos = useEstilos();
	return (
		<Controller
			render={({field: {onChange, onBlur, value}}) => (
				<TextField
					className={clase === 'XS' ? estilos.XS : undefined}
					onChange={onChange}
					onBlur={onBlur}
					type={type}
					value={value}
					name={label.toLowerCase()}
					size='small'
					variant='outlined'
					fullWidth
					label={label}
					autoFocus={autoFocus}
					disabled={disabled}
					inputRef={inputRef}
					inputProps={{
						'data-cy': inputDataCY,
					}}
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
