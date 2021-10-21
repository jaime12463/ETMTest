import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import useEstilos from './useEstilos';
import {CheckRedondoIcon} from 'assests/iconos';
import {useAppDispatch, useObtenerVisitaActual} from 'redux/hooks';
import {cambiarOrdenDeCompra} from 'redux/features/visitaActual/visitaActualSlice';
import {TVisita} from 'models';

const OrdenDeCompra: React.FC = () => {
	const visitaActual: TVisita = useObtenerVisitaActual();
	const [ordenDeCompra, setOrdenDeCompra] = React.useState<string>(
		visitaActual.ordenDeCompra
	);
	const [mostrarIcono, setMostrarIcono] = React.useState<boolean>(false);
	const classes = useEstilos({mostrarIcono});
	const dispatch = useAppDispatch();

	React.useEffect(() => {
		if (ordenDeCompra.length > 0) {
			setMostrarIcono(true);
		} else {
			setMostrarIcono(false);
		}
		dispatch(cambiarOrdenDeCompra({ordenDeCompra}));
	}, [ordenDeCompra]);

	const handleChange = (
		e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		setOrdenDeCompra(e.target.value);
	};

	return (
		<Box marginTop='10px' position='relative'>
			<TextField
				label='Número de orden de compra'
				variant='filled'
				fullWidth
				className={classes.root}
				autoFocus
				value={ordenDeCompra}
				onChange={handleChange}
				sx={{borderRadius: '100px'}}
			/>
			<Box position='absolute' right='16px' bottom='8px'>
				{mostrarIcono && <CheckRedondoIcon />}
			</Box>
		</Box>
	);
};

export default OrdenDeCompra;
