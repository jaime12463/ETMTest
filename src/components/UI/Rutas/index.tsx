import {BrowserRouter, Route} from 'react-router-dom';
import nombresRutas from 'routes/nombresRutas';
import rutaAnidada from './RutaAnidada';
import {
	Inicio,
	TomaPedidoDelClienteActual,
	PreciosProductosDelClienteActual,
	PedidosDelClienteActual,
	Clientes,
	EnvasesRetornables,
} from 'pages';

const Rutas = () => {
	const rutasAnidadas = rutaAnidada();
	return (
		<BrowserRouter>
			{/* {rutasAnidadas} */}
			<Route exact path={nombresRutas.inicio}>
				<Inicio />
			</Route>
			<Route exact path={nombresRutas.ingresarpedido}>
				<TomaPedidoDelClienteActual />
			</Route>
			<Route exact path={nombresRutas.preciosProductos}>
				<PreciosProductosDelClienteActual />
			</Route>
			<Route exact path={nombresRutas.pedidosCliente}>
				<PedidosDelClienteActual />
			</Route>
			<Route exact path={nombresRutas.clientes}>
				<Clientes />
			</Route>
			<Route exact path={nombresRutas.envasesRetornables}>
				<EnvasesRetornables />
			</Route>
		</BrowserRouter>
	);
};

export default Rutas;
