import {BrowserRouter, Route} from 'react-router-dom';
import nombresRutas from '../../routes/nombresRutas';
import {TomaDePedidos, Inicio} from '../../pages';

const Rutas = () => {
	return (
		<BrowserRouter>
			<Route exact path={nombresRutas.home}>
				<Inicio />
			</Route>
			<Route path={nombresRutas.ingresarpedido}>
				<TomaDePedidos />
			</Route>
		</BrowserRouter>
	);
};

export default Rutas;
