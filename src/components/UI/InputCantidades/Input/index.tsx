import React from 'react';
import {Input, InputProps} from '@mui/material';
import {useEstilos, InputPropsEstilos} from './useEstilos';

interface Props extends InputProps {
	useEstilosProps: InputPropsEstilos;
}

export const InputCantidades: React.FC<Props> = ({
	useEstilosProps,
	...props
}) => {
	const classes = useEstilos(useEstilosProps);

	return (
		<Input
			autoComplete='off'
			className={classes.input}
			disableUnderline
			{...props}
		/>
	);
};
