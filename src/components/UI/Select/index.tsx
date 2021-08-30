import {FunctionComponent} from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import {MenuItem, Select as SelectMUI, SelectProps} from '@material-ui/core';
import {Control, Controller} from 'react-hook-form';
import {TOpcionSelect} from 'models';

type Props = {
	control: Control<any>;
	name: string;
	defaultValue?: string;
	rules?: any;
	dataCY?: string;
	label?: string;
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
		...other
	} = props;

	return (
		<Controller
			render={({field: {onChange, onBlur, value}}) => (
				<SelectMUI
					value={value}
					onChange={onChange}
					onBlur={onBlur}
					fullWidth
					inputProps={{
						'data-cy': dataCY,
						...inputProps,
					}}
					{...other}
				>
					{opciones.map((opcion) => (
						<MenuItem key={opcion.label} value={opcion.value}>
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
