import React from 'react';
import {
	MenuItem,
	Select as SelectMUI,
	SelectChangeEvent,
	SelectProps,
} from '@mui/material';
import {Control, Controller} from 'react-hook-form';
import {TOpcionSelect} from 'models';

interface Props {
	control: Control<any>;
	dataCY?: string;
	defaultValue?: string;
	handleChange: (e: any) => void;
	label?: string;
	name: string;
	opciones: TOpcionSelect[];
	rules?: any;
}

export type PropsSelect = Props & SelectProps;

export const Select: React.VFC<PropsSelect> = ({
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
}) => {
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
