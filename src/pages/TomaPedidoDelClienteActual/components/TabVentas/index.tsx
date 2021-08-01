import {
	ListadoProductosAgregadosAlPedidoActual,
	FormularioAgregarProducto,
} from '..';
import {FunctionComponent, useState} from 'react';
import {TPrecioProducto, TPrecioSinVigencia} from 'models';
import {useInicializarPreciosProductosDelClienteActual} from 'hooks';
import {Box} from '@material-ui/core';

type Props = {};

const TabVentas: FunctionComponent<Props> = (props) => {
	const [preciosProductos, setPreciosProductos] = useState<TPrecioProducto[]>(
		[]
	);

	const [productoActual, setProductoActual] = useState<TPrecioSinVigencia>({
		codigoProductoConNombre: '',
		precioConImpuestoUnidad: 0,
		precioConImpuestoSubunidad: 0,
		codigoImplicito1: 0,
		nombreImplicito1: '',
		codigoImplicito2: 0,
		nombreImplicito2: '',
	});

	useInicializarPreciosProductosDelClienteActual(setPreciosProductos);

	return (
		<Box mt={2}>
			<FormularioAgregarProducto
				stateProductoActual={{productoActual, setProductoActual}}
				statePreciosProductos={{preciosProductos, setPreciosProductos}}
			/>
			<ListadoProductosAgregadosAlPedidoActual />
		</Box>
	);
};

export default TabVentas;
