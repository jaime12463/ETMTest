import {FunctionComponent} from 'react';
import {ETiposDePago, TProductoPedido} from 'models';
import {Box, Grid, Switch, Typography} from '@material-ui/core';
import {Center} from 'components/UI';

type Props = {
	item: TProductoPedido;
};

const ItemProductoAgregadoAlPedidoActual: FunctionComponent<Props> = (
	props
) => {
	const {item} = props;

	const {
		codigoProducto,
		nombreProducto,
		unidades,
		subUnidades,
		total,
		tipoPago,
	} = item;

	return (
		<Grid container justify='center'>
			<Grid item xs={2}>
				<Center>{codigoProducto}</Center>
			</Grid>
			<Grid item xs={5}>
				<Grid>
					<Grid item xs={12}>
						<Box fontWeight='fontWeightBold'>{nombreProducto}</Box>
					</Grid>
					<Grid item xs={12}>
						<Box fontWeight='fontWeightLight'>Unidades: {unidades}</Box>
					</Grid>
					<Grid item xs={12}>
						<Box fontWeight='fontWeightLight'>Subunidades: {subUnidades}</Box>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={3}>
				<Center>{total}</Center>
			</Grid>
			<Grid item xs={2}>
				<Center>
					<Switch
						checked={tipoPago === ETiposDePago.Contado}
						onChange={() => {}}
						name='checkedA'
						inputProps={{'aria-label': 'secondary checkbox'}}
					/>
				</Center>
			</Grid>
		</Grid>
	);
};

export default ItemProductoAgregadoAlPedidoActual;
