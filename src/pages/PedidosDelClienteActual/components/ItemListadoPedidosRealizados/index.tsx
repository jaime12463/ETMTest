import {FunctionComponent} from 'react';
import {TPedidoClienteParaEnviar} from 'models';
import {Box, Grid, Switch, Typography} from '@material-ui/core';
import {Center} from 'components/UI';
import {useCalcularTotalPedidos} from 'hooks';

type Props = {
	item: TPedidoClienteParaEnviar;
};

const ItemListadoPedidosRealizados: FunctionComponent<Props> = (props) => {
	const {item} = props;
	const {fechaEntrega, productosPedido} = item;
	const calcularTotalPedido = useCalcularTotalPedidos();
	const totalPedido = calcularTotalPedido(productosPedido).totalPrecio;

	return (
		<Grid container>
			<Grid item xs>
				<Center>{'Venta'}</Center>
			</Grid>
			<Grid item xs>
				<Center>{fechaEntrega}</Center>
			</Grid>
			<Grid item xs>
				<Center>{totalPedido}</Center>
			</Grid>
		</Grid>
	);
};

export default ItemListadoPedidosRealizados;
