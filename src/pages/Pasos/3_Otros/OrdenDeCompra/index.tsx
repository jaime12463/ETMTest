import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import {styled} from '@mui/material/styles';
import useEstilos from './useEstilos';

const TextFieldStyled = styled(TextField)(() => ({
	background: '#F5F0EF',
	color: '#8A4C5F',
	fontsize: '14px',
}));

const OrdenDeCompra: React.FC = () => {
	const classes = useEstilos();

	return (
		<Box>
			<TextField
				label='Número de orden de compra'
				variant='filled'
				fullWidth
				className={classes.root}
			/>
		</Box>
	);
};

export default OrdenDeCompra;
