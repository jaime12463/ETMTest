import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import {
	AgregarRedondoIcon,
	BotellaIcon,
	CajaIcon,
	QuitarRellenoIcon,
} from 'assests/iconos';
import theme from 'theme';
import useEstilos from './useEstilos';

interface Props {}

const TarjetaBonificacion: React.FC<Props> = () => {
	const classes = useEstilos();
	return (
		<Box display='flex'>
			<Box flex='1' padding='8px 0 8px 14px'>
				<Box display='flex' flexDirection='column' marginBottom='4px'>
					<Typography variant='subtitle3' fontFamily='Open Sans'>
						035
					</Typography>
					<Typography variant='subtitle3'>COCA COLA Original</Typography>
				</Box>
				<Box alignItems='center' display='flex' gap='2px'>
					<CajaIcon height='18px' width='18px' />
					<Typography variant='caption' fontFamily='Open Sans'>
						x12
					</Typography>
					<BotellaIcon height='15px' width='15px' />
				</Box>
			</Box>
			<Box flex='1' padding='19px 14px 8px 0' sx={{background: '#F5F0EF'}}>
				<Box alignItems='center' display='flex' justifyContent='end' gap='2px'>
					<CajaIcon height='18px' width='18px' />
					<IconButton sx={{padding: 0}}>
						<QuitarRellenoIcon
							height='18px'
							width='18px'
							fill={theme.palette.secondary.dark}
						/>
					</IconButton>
					<Input
						autoComplete='off'
						className={classes.input}
						// value={getValues.unidades}
						// onChange={handleOnChange}
						// onKeyPress={handleKeyPress}
						disableUnderline
						// name='unidades'
						// id='unidades_producto'
						// onClick={() => {
						// 	setInputFocus('unidades');
						// 	setFocusId(producto.codigoProducto);
						// }}
						// onFocus={(e) => e.target.select()}
						inputProps={{
							style: {textAlign: 'center'},
							inputMode: 'numeric',
						}}
						// inputRef={(input) => {
						// 	if (
						// 		inputFocus === 'unidades' &&
						// 		focusId === producto.codigoProducto
						// 	) {
						// 		input?.focus();
						// 	}
						// }}
						// disabled={visitaActual.pasoATomaPedido}
					/>
					<IconButton
						sx={{padding: '0'}}
						size='small'
						name='unidades'
						value='+'
						// onClick={handleButtons}
					>
						<AgregarRedondoIcon
							width='18px'
							height='18px'
							fill={theme.palette.secondary.dark}
						/>
					</IconButton>
				</Box>
			</Box>
		</Box>
	);
};

export default TarjetaBonificacion;
