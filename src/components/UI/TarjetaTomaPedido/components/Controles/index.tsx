import React from 'react';
import {styled} from '@mui/material/styles';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import {
	AgregarRedondoIcon,
	BotellaIcon,
	CajaIcon,
	QuitarRellenoIcon,
} from 'assests/iconos';
import {TPrecioProducto, TProductoPedido} from 'models';

const InputStyled = styled(Input)(({}) => ({
	backgroundColor: 'white',
	border: '1px solid #2F000E',
	borderRadius: '10px',
	fontSize: '12px',
	fontWeight: 600,
	height: '16px',
	lineHeight: '16px',
	padding: '0 2px',
	width: '42px',
}));

interface Props {
	esVentaSubunidades: boolean;
}

const Controles: React.FC<Props> = ({esVentaSubunidades}) => {
	return (
		<Box
			display='flex'
			flexDirection='column'
			alignItems='center'
			justifyContent='center'
			width='125px'
			gap='10px'
			padding='12px 0 16px 0'
			sx={{background: '#F5F0EF'}}
		>
			<Box display='flex' alignItems='center' justifyContent='center' gap='4px'>
				<CajaIcon height='18px' width='18px' />
				<IconButton
					sx={{padding: '0'}}
					size='small'
					value='-'
					name='unidades'
					// onClick={handleButtons}
					// disabled={producto.unidades > 0 ? false : true}
				>
					<QuitarRellenoIcon
						width='18px'
						height='18px'
						// fill={producto.unidades > 0 ? '#2F000E' : '#D9D9D9'}
						fill='#2F000E'
					/>
				</IconButton>
				<InputStyled
					// value={getValues.unidades}
					// onChange={handleOnChange}
					// onKeyPress={handleKeyPress}
					disableUnderline
					name='unidades'
					id='unidades_producto'
					// onClick={() => {
					// 	setInputFocus('unidades');
					// 	setFocusId(producto.codigoProducto);
					// }}
					onFocus={(e) => e.target.select()}
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
				/>
				<IconButton
					sx={{padding: '0'}}
					size='small'
					name='unidades'
					value='+'
					// onClick={handleButtons}
					// disabled={
					// 	producto.unidadesDisponibles
					// 		? producto.unidades >= producto.unidadesDisponibles
					// 			? true
					// 			: false
					// 		: producto.unidades >=
					// 		  configuracionPedido?.cantidadMaximaUnidades
					// 		? true
					// 		: false
					// }
				>
					<AgregarRedondoIcon
						width='18px'
						height='18px'
						// fill={
						// 	producto.unidadesDisponibles
						// 		? producto.unidades >= producto.unidadesDisponibles
						// 			? '#D9D9D9'
						// 			: '#2F000E'
						// 		: producto.unidades >=
						// 		  configuracionPedido?.cantidadMaximaUnidades
						// 		? '#D9D9D9'
						// 		: '#2F000E'
						// }
						fill='#2F000E'
					/>
				</IconButton>
			</Box>
			{esVentaSubunidades && (
				<Box width='100%'>
					<Box
						display='flex'
						alignItems='center'
						justifyContent='center'
						gap='4px'
					>
						<BotellaIcon width='18px' height='18px' />
						<IconButton
							sx={{padding: '0'}}
							size='small'
							value='-'
							name='subUnidades'
							// onClick={handleButtons}
							// disabled={getValues.subUnidades > 0 ? false : true}
						>
							<QuitarRellenoIcon
								width='18px'
								height='18px'
								// fill={getValues.subUnidades > 0 ? '#2F000E' : '#D9D9D9'}
								fill='#2F000E'
							/>
						</IconButton>
						<InputStyled
							// onKeyPress={handleKeyPress}
							// onChange={handleOnChange}
							// value={getValues.subUnidades}
							disableUnderline
							id='subUnidades_producto'
							name='subUnidades'
							// onClick={() => {
							// 	setInputFocus('subUnidades');
							// 	setFocusId(producto.codigoProducto);
							// }}
							onFocus={(e) => e.target.select()}
							// onBlur={validacionSubUnidades}
							inputProps={{
								style: {textAlign: 'center'},
								inputMode: 'numeric',
							}}
							// inputRef={(input) => {
							// 	if (
							// 		inputFocus === 'subUnidades' &&
							// 		focusId === producto.codigoProducto
							// 	) {
							// 		input?.focus();
							// 	}
							// }}
						/>
						<IconButton
							sx={{padding: '0'}}
							size='small'
							name='subUnidades'
							value='+'
							// onClick={handleButtons}
							// disabled={
							// 	getValues.subUnidades >=
							// 	producto.presentacion - producto.subunidadesVentaMinima
							// }
						>
							<AgregarRedondoIcon
								width='18px'
								height='18px'
								// fill={
								// 	getValues.subUnidades >=
								// 	producto.presentacion - producto.subunidadesVentaMinima
								// 		? '#D9D9D9'
								// 		: '#2F000E'
								// }
								fill='#2F000E'
							/>
						</IconButton>
					</Box>
				</Box>
			)}
		</Box>
	);
};

export default Controles;
