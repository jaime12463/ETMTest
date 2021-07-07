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
	return (
		<RutasAnidadas
			pathPrincipal=''
			pathAnidado='/ingresarpedido'
			principal={<VisitasDelCliente />}
			anidado={<Anidado2 />}
		/>
	);

	// <RutasAnidadas
	// 				pathPrincipal=''
	// 				pathAnidado='/visitaclientes'
	// 				principal={<Clientes />}
	// 				anidado={<Anidado />}
	// 			/>
};
const Rutas = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route
					path={`${nombresRutas.clientes}`}
					render={({match}) => {
						return (
							<>
								<Clientes />
								<Route
									exact
									path={`${nombresRutas.clientes}${nombresRutas.visitaClientes}`}
									render={({match}) => {
										return (
											<>
												<VisitasDelCliente />
												<Route
													exact
													path={`${nombresRutas.clientes}${nombresRutas.visitaClientes}${nombresRutas.ingresarpedido}`}
													render={({match}) => {
														return <><TomaDePedidos /><Route
													exact
													path={`${nombresRutas.clientes}${nombresRutas.visitaClientes}${nombresRutas.ingresarpedido}hola`}
													render={({match}) => {
														return (<><h1>hola</h1></>)
													}}
												></Route></>;
													}}
												></Route>
											</>
										);
									}}
								></Route>
							</>
						);
					}}
				></Route>
				<Route exact path={nombresRutas.home}>
					<Inicio />
				</Route>
			</Switch>
		</BrowserRouter>
	);
};

export default Rutas;
