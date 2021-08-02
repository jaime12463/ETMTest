import useEstilos from './useEstilos';
import {useTranslation} from 'react-i18next';
import {Estructura} from 'components/UI';
import {FormularioAgregarProducto} from './components';
import {useState} from 'react';
import {TPrecioProducto} from 'models';
import {ListPreciosProductosDelClienteActual} from './components';
import {useInicializarPreciosProductosDelClienteActual} from 'hooks';
import {
	FechaEntregaDelPedidoActual,
	InfoClienteDelPedidoActual,
} from 'components/Negocio';
import {Box} from '@material-ui/core';

const PreciosProductosDelClienteActual: React.FC = () => {
	const {t} = useTranslation();

	const estilos = useEstilos();

	const [preciosProductos, setPreciosProductos] = useState<TPrecioProducto[]>(
		[]
	);

	const [productoActual, setProductoActual] = useState<TPrecioProducto | null>(
		null
	);

	useInicializarPreciosProductosDelClienteActual(setPreciosProductos);

	return (
		<Estructura>
			<Estructura.Encabezado esConFechaHaciaAtras={true}>
				<InfoClienteDelPedidoActual />
			</Estructura.Encabezado>
			<Estructura.Cuerpo>
				<Box my={3}>
					<FechaEntregaDelPedidoActual />
				</Box>
				<FormularioAgregarProducto
					stateProductoActual={{productoActual, setProductoActual}}
					statePreciosProductos={{preciosProductos, setPreciosProductos}}
				/>
				<ListPreciosProductosDelClienteActual
					preciosProductos={preciosProductos}
				/>
			</Estructura.Cuerpo>
		</Estructura>
	);
};

export default PreciosProductosDelClienteActual;
