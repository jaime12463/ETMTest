import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
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
				<ShoppingCartIcon />
			</IconButton>
			{datosTipoPedido?.habilitaPromocion && (
				<IconButton
					onClick={() => {
						cambiandoMostrarPromoPush(true);
					}}
					color={mostrarPromoPush ? 'primary' : 'default'}
				>
					<LocalOfferIcon />
				</IconButton>
			)}
		</Box>
	);
};

export default MenuPromoPush;
