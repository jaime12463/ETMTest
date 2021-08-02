import {
	ListadoProductosAgregadosAlPedidoActual,
	FormularioAgregarProducto,
} from '..';
import {Fragment, FunctionComponent, useState} from 'react';
import {TPrecioProducto} from 'models';
import {useInicializarPreciosProductosDelClienteActual} from 'hooks';
import {Box} from '@material-ui/core';

type Props = {};

const TabVentas: FunctionComponent<Props> = (props) => {
	const [preciosProductos, setPreciosProductos] = useState<TPrecioProducto[]>(
		[]
	);

	const [productoActual, setProductoActual] = useState<TPrecioProducto | null>(
		null
	);

	useInicializarPreciosProductosDelClienteActual(setPreciosProductos);

	return (
		<Fragment>
			<Box my={2}>
				<FormularioAgregarProducto
					stateProductoActual={{productoActual, setProductoActual}}
					statePreciosProductos={{preciosProductos, setPreciosProductos}}
				/>
			</Box>
			<ListadoProductosAgregadosAlPedidoActual />
		</Fragment>
	);
};

export default TabVentas;
