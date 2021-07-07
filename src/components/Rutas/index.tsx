import {BrowserRouter, Route, Switch, useRouteMatch} from 'react-router-dom';
import nombresRutas from '../../routes/nombresRutas';
import {
	TomaDePedidos,
	Inicio,
	DetallePedido,
	VisitasDelCliente,
	Clientes,
} from '../../pages';
import {Estructura} from 'components';
import RutasAnidadas from './RutasAnidadas';

const Anidado2 = () => {
	return (
		<Estructura
			titulo={'titulos.tomaPedidos'}
			esConFechaHaciaAtras={true}
			esConLogoInferior={false}
		>
			<TomaDePedidos />
		</Estructura>
	);
};

const Anidado = () => {
	/* 		<Estructura
			titulo={'titulos.visitaCliente'}
			esConFechaHaciaAtras={true}
			esConLogoInferior={false}
		>
			<VisitasDelCliente />
			</Estructura>
						<RutasAnidadas
					pathAnidado='/visitaclientes'
					principal={<Clientes />}
					anidado={<Anidado />}
				/>
		*/
	return (
		<RutasAnidadas
			pathAnidado='/ingresarpedido'
			principal={<VisitasDelCliente />}
			anidado={<Anidado2 />}
		/>
	);
};

const Rutas = () => {
	return (
		<BrowserRouter>
			<Route path={nombresRutas.clientes}>
				<Clientes />
				<Route path={nombresRutas.clientes + nombresRutas.visitaClientes}>
					<VisitasDelCliente />
					<Route
						path={
							nombresRutas.clientes +
							nombresRutas.visitaClientes +
							nombresRutas.ingresarpedido
						}
					>
						<TomaDePedidos />
						<Route
							path={
								nombresRutas.clientes +
								nombresRutas.visitaClientes +
								nombresRutas.ingresarpedido +
								nombresRutas.detalle
							}
						>
							<DetallePedido />
						</Route>
					</Route>
				</Route>
			</Route>
			<Route exact path={nombresRutas.home}>
				<Inicio />
			</Route>
		</BrowserRouter>
	);
};

export default Rutas;
