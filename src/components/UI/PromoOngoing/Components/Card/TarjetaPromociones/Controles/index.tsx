import React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import {
	AgregarRedondoIcon,
	AvisoIcon,
	BotellaIcon,
	CajaIcon,
	QuitarRellenoIcon,
} from 'assests/iconos';
import useEstilos from './useEstilos';
import theme from 'theme';
import {useAppDispatch, useObtenerVisitaActual} from 'redux/hooks';
import {
	TDetalleBonificacionesCliente,
	TPrecioProducto,
	TProducto,
} from 'models';
import Modal from 'components/UI/Modal';
import {useMostrarAviso} from 'hooks';

interface Props {
	producto: TProducto;
	unidadMedida: string;
	statefocusId: any;
}

export const Controles: React.FC<Props> = ({
	producto,
	unidadMedida,
	statefocusId,
}) => {
	const classes = useEstilos({errorAplicacionTotal: false});
	const {focusId, setFocusId} = statefocusId;

	return (
		<>
			<Box flex='1' padding='19px 14px 8px 0' sx={{background: '#F5F0EF'}}>
				<Box alignItems='center' display='flex' justifyContent='end' gap='2px'>
					{unidadMedida === 'Unidad' ? (
						<CajaIcon height='18px' width='18px' />
					) : (
						<BotellaIcon height='18px' width='18px' />
					)}
					<IconButton
						sx={{marginLeft: '2px', padding: 0}}
						name='-'
						//onClick={handleButtons}
						//disabled={cantidad === 0}
					>
						<QuitarRellenoIcon
							height='18px'
							width='18px'
							//disabled={cantidad === 0}
						/>
					</IconButton>
					<Input
						autoComplete='off'
						className={classes.input}
						//value={cantidad}
						//onChange={handleChange}
						disableUnderline
						name='unidades'
						id='unidades_producto'
						//onBlur={handleBlur}
						//	onKeyDown={handleKeyPress}
						onFocus={(e) => {
							e.target.select();
							setFocusId(producto.codigoProducto);
						}}
						inputProps={{
							style: {textAlign: 'center'},
							inputMode: 'numeric',
						}}
					/>
					<IconButton
						sx={{padding: '0'}}
						size='small'
						name='+'
						//onClick={handleButtons}
						//disabled={contador === 0}
					>
						<AgregarRedondoIcon
							width='18px'
							height='18px'
							//disabled={contador === 0}
						/>
					</IconButton>
				</Box>
			</Box>
		</>
	);
};
