import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import useEstilos from './useEstilos';
import {CheckRedondoIcon} from 'assests/iconos';

interface Props {
	valid: boolean;
	value: string;
	onChange: (
		e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => void;
	margin?: string;
	label: string;
}

const InputConIcono: React.FC<Props> = ({
	valid,
	value,
	onChange,
	margin = '10px 0 0 0',
	label,
}) => {
	const classes = useEstilos({valid});

	return (
		<Box margin={margin} position='relative'>
			<TextField
				label={label}
				variant='filled'
				fullWidth
				className={classes.root}
				autoFocus
				value={value}
				onChange={onChange}
				focused
			/>
			<Box position='absolute' right='16px' bottom='8px'>
				{valid && <CheckRedondoIcon />}
			</Box>
		</Box>
	);
};

export default InputConIcono;
