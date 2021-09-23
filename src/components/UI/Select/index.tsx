import {ChangeEvent, FunctionComponent} from 'react';
import {
	MenuItem,
	Select as SelectMUI,
	SelectChangeEvent,
	SelectProps,
} from '@mui/material';
import {Control, Controller} from 'react-hook-form';
import {TOpcionSelect} from 'models';

type Props = {
	control: Control<any>;
	name: string;
	defaultValue?: string;
	rules?: any;
	dataCY?: string;
	label?: string;
	handleChange: (e: any) => void;
	opciones: TOpcionSelect[];
};

export type PropsSelect = Props & SelectProps;

const Select: FunctionComponent<PropsSelect> = (props) => {
	const {
		control,
		name,
		defaultValue,
		rules,
		dataCY,
		inputProps,
		label,
		opciones,
		handleChange,
		...other
	} = props;

	return (
		<Controller
			render={({field: {onChange, onBlur, value}}) => (
				<SelectMUI
					value={value}
					onChange={(e) => {
						onChange(e);
						handleChange(e);
					}}
					id={dataCY}
					onBlur={onBlur}
					fullWidth
					inputProps={{
						'data-cy': dataCY,
						...inputProps,
					}}
					{...other}
				>
					{opciones.map((opcion, index) => (
						<MenuItem
							key={opcion.label}
							value={opcion.value}
							data-cy={`${dataCY}-${index}`}
						>
							{opcion.label}
						</MenuItem>
					))}
				</SelectMUI>
			)}
			name={name}
			control={control}
			defaultValue={defaultValue}
		/>
	);
};

export default Select;
