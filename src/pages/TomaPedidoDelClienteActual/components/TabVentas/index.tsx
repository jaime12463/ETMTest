import {
	ListadoProductosAgregadosAlPedidoActual,
	FormularioAgregarProducto,
} from '..';
import {FunctionComponent, useState} from 'react';
import {TPrecioProducto, TPrecioSinVigencia} from 'models';
import {
	useMostrarAdvertenciaEnDialogo,
	useInicializarPreciosProductosDelClienteActual,
} from 'hooks';
import {Dialogo} from 'components/UI';
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

	const {
		mostrarAdvertenciaEnDialogo,
		mostarDialogo,
		parametrosDialogo,
	} = useMostrarAdvertenciaEnDialogo();

	useInicializarPreciosProductosDelClienteActual(setPreciosProductos);

	return (
		<Box mt={2}>
			{mostarDialogo && <Dialogo {...parametrosDialogo} />}
			<FormularioAgregarProducto
				stateProductoActual={{productoActual, setProductoActual}}
				statePreciosProductos={{preciosProductos, setPreciosProductos}}
				mostrarAdvertenciaEnDialogo={mostrarAdvertenciaEnDialogo}
			/>
			<ListadoProductosAgregadosAlPedidoActual />
		</Box>
	);
};

export default TabVentas;
