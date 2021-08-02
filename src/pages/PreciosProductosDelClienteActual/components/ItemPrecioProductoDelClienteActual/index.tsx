import {Grid} from '@material-ui/core';
import {TPrecioProducto} from 'models';
import {FunctionComponent} from 'react';

type Props = {
	item: TPrecioProducto;
};

const ItemPrecioProductoDelClienteActual: FunctionComponent<Props> = (
	props
) => {
	const {item} = props;
	return (
		<Grid container>
			<Grid item xs={8}>
				{item.nombreProducto}
			</Grid>
			<Grid item xs={4}>
				{item.precioConImpuestoUnidad}
			</Grid>
		</Grid>
	);
};

export default ItemPrecioProductoDelClienteActual;
