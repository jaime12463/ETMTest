import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import {Box, Grid, Container} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import {useAppDispatch} from 'redux/hooks';
import {cambiarMostrarPromoPush} from 'redux/features/visitaActual/visitaActualSlice';

const MenuPromoPush = (): any => {
	const dispatch = useAppDispatch();

	const iconos = [
		{icono: ShoppingCartIcon, mostrarPromoPush: false},
		{icono: LocalOfferIcon, mostrarPromoPush: true},
	];

	const cambiandoMostrarPromoPush = (accion: boolean) => {
		dispatch(cambiarMostrarPromoPush({mostrarPromoPush: accion}));
	};

	return (
		<Box display='flex' flexDirection='row' justifyContent='space-around'>
			{iconos.map((el, i) => (
				<IconButton
					key={i}
					onClick={() => {
						cambiandoMostrarPromoPush(el.mostrarPromoPush);
					}}
				>
					<el.icono />
				</IconButton>
			))}
		</Box>
	);
};

export default MenuPromoPush;
