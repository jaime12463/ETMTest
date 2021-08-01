import useEstilos from './useEstilos';
import {useTranslation} from 'react-i18next';
import {Estructura} from 'components/UI';
import {DatosCliente} from 'components/Negocio';
import {FormularioAgregarProducto} from 'pages/TomaPedidoDelClienteActual/components';
import {useState} from 'react';
import {TPrecioProducto, TPrecioSinVigencia} from 'models';
import {ListPreciosProductosDelClienteActual} from './components';

const PreciosProductosDelClienteActual: React.FC = () => {
	const {t} = useTranslation();
	const estilos = useEstilos();
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

	return (
		<Estructura
			titulo={t('titulos.PreciosProductosDelClienteActual')}
			esConFechaHaciaAtras={true}
		>
			<Estructura.Cuerpo>
				<DatosCliente />
				<FormularioAgregarProducto
					stateProductoActual={{productoActual, setProductoActual}}
					statePreciosProductos={{preciosProductos, setPreciosProductos}}
				/>
				<ListPreciosProductosDelClienteActual />
			</Estructura.Cuerpo>
			<Estructura.PieDePagina>PieDePagina</Estructura.PieDePagina>
		</Estructura>
	);
};

export default PreciosProductosDelClienteActual;
