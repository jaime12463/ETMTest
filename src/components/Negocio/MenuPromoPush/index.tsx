<<<<<<< HEAD
/* import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import LocalOfferIcon from '@material-ui/icons/LocalOffer'; */
=======
>>>>>>> ed61a035d802e908877b5caa670e0c1699185039
import {Box} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import {useAppDispatch, useObtenerVisitaActual} from 'redux/hooks';
import {cambiarMostrarPromoPush} from 'redux/features/visitaActual/visitaActualSlice';
import {useObtenerDatosTipoPedido} from 'hooks';

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
				Icono carrito
			</IconButton>
			{datosTipoPedido?.habilitaPromocion && (
				<IconButton
					onClick={() => {
						cambiandoMostrarPromoPush(true);
					}}
					color={mostrarPromoPush ? 'primary' : 'default'}
				>
<<<<<<< HEAD
			{'PromoPush'}
=======
					Icono Promo
>>>>>>> ed61a035d802e908877b5caa670e0c1699185039
				</IconButton>
			)}
		</Box>
	);
};

export default MenuPromoPush;
