import {
	BotonCerrarPedido,
	BotonVerPedidosDelClienteActual,
	FechaEntregaDelPedidoActual,
	IndicadoresDelPedidoActual,
	InfoClienteDelPedidoActual,
	InfoPedidoActual,
	TabsPedidoActual,
} from './components';
import {Estructura} from 'components/UI';

const TomaPedidoDelClienteActual: React.FC = () => {
	return (
		<Estructura>
			<Estructura.Encabezado
				esConFechaHaciaAtras={true}
				acciones={<BotonVerPedidosDelClienteActual />}
			>
				<InfoClienteDelPedidoActual />
			</Estructura.Encabezado>
			<Estructura.Cuerpo>
				<FechaEntregaDelPedidoActual />
				<IndicadoresDelPedidoActual />
				<TabsPedidoActual />
			</Estructura.Cuerpo>
			<Estructura.PieDePagina>
				<InfoPedidoActual />
				<BotonCerrarPedido />
			</Estructura.PieDePagina>
		</Estructura>
	);
};

export default TomaPedidoDelClienteActual;
