import {BrowserRouter, Route, Switch} from 'react-router-dom';
import nombresRutas from '../../routes/nombresRutas';
import {TomaDePedidos, Inicio, DetallePedido} from '../../pages';
import {Estructura} from 'components';
import RutasAnidadas from './RutasAnidadas';

const Anidado = () => {
	return (
		<Estructura
			titulo={'titulos.productosPedido'}
			esConFechaHaciaAtras={true}
			esConLogoInferior={false}
		>
			<DetallePedido />
		</Estructura>
	);
};

const Rutas = () => {
	return (
		<BrowserRouter>
			<Route path={nombresRutas.ingresarpedido}>
				<RutasAnidadas
					pathPrincipal=''
					pathAnidado='/detalle'
					principal={<TomaDePedidos />}
					anidado={<Anidado />}
				/>
			</Route>
			<Route
				exact
				path={`${nombresRutas.home}`}
			>
				<Inicio />
			</Route>
		</BrowserRouter>
	);
};

export default Rutas;
