import {Box} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import {useAppDispatch, useObtenerVisitaActual} from 'redux/hooks';
import {cambiarMostrarPromoPush} from 'redux/features/visitaActual/visitaActualSlice';
import {useObtenerDatosTipoPedido} from 'hooks';

import Caja from '../../../assests/iconos/caja.svg'
import Promociones from '../../../assests/iconos/Promociones.svg'

const MenuPromoPush = (): any => {
	const dispatch = useAppDispatch();

	const cambiandoMostrarPromoPush = (accion: boolean) => {
		dispatch(cambiarMostrarPromoPush({mostrarPromoPush: accion}));
	};

	const {mostrarPromoPush} = useObtenerVisitaActual();

	const obtenerDatosTipoPedido = useObtenerDatosTipoPedido();

	const datosTipoPedido = obtenerDatosTipoPedido();

	return (
		<Box display='flex' flexDirection='row' justifyContent='space-around'>
			<IconButton
				onClick={() => {
					cambiandoMostrarPromoPush(false);
				}}
				color={!mostrarPromoPush ? 'primary' : 'default'}
			>
				<img src={Caja} alt="Caja" />
			</IconButton>
			{datosTipoPedido?.habilitaPromocion && (
				<IconButton
					onClick={() => {
						cambiandoMostrarPromoPush(true);
					}}
					color={mostrarPromoPush ? 'primary' : 'default'}
				>
					<img src={Promociones} alt="Promociones" />
				</IconButton>
			)}
		</Box>
	);
};

export default MenuPromoPush;
