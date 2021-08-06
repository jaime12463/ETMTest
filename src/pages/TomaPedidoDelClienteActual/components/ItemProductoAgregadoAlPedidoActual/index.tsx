import {FunctionComponent} from 'react';
import {TProductoPedido} from 'models';
import {Box, Grid} from '@material-ui/core';
import {Center} from 'components/UI';
import {SwitchCambiarTipoPago} from '..';

type Props = {
	item: TProductoPedido;
	onClickItem?: (item: TProductoPedido) => void;
};

const ItemProductoAgregadoAlPedidoActual: FunctionComponent<Props> = (
	props
) => {
	const {item, onClickItem} = props;

	const {codigoProducto, nombreProducto, unidades, subUnidades, total} = item;

	return (
		<Grid container justify='center'>
			<Grid
				item
				xs={10}
				onClick={() => {
					if (onClickItem) onClickItem(item);
				}}
			>
				<Grid container justify='center'>
					<Grid item xs={2}>
						<Center>{codigoProducto}</Center>
					</Grid>
					<Grid item xs={6}>
						<Grid container>
							<Grid item xs={12}>
								<Box fontWeight='fontWeightBold'>{nombreProducto}</Box>
							</Grid>
							<Grid item xs={12}>
								<Box fontWeight='fontWeightLight'>Unidades: {unidades}</Box>
							</Grid>
							<Grid item xs={12}>
								<Box fontWeight='fontWeightLight'>
									Subunidades: {subUnidades}
								</Box>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={3}>
						<Center>{total.toFixed(2)}</Center>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={2}>
				<SwitchCambiarTipoPago producto={item} />
			</Grid>
		</Grid>
	);
};

export default ItemProductoAgregadoAlPedidoActual;
