import useEstilos from './useEstilos';
import {useTranslation} from 'react-i18next';
import {Estructura} from 'components/UI';
import {DatosCliente} from 'components/Negocio';
import {FormularioAgregarProducto} from 'pages/TomaPedidoDelClienteActual/components';
import {useState} from 'react';
import {TPrecioProducto} from 'models';
import {ListPreciosProductosDelClienteActual} from './components';
import {useInicializarPreciosProductosDelClienteActual} from 'hooks';

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
				<ListPreciosProductosDelClienteActual
					preciosProductos={preciosProductos}
				/>
			</Estructura.Cuerpo>
		</Estructura>
	);
};

export default PreciosProductosDelClienteActual;
