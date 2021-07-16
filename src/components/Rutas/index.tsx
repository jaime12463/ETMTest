import {BrowserRouter, Route} from 'react-router-dom';
import nombresRutas from '../../routes/nombresRutas';
import {Inicio} from '../../pages';
import RutaAnidada from './RutaAnidada';

const Rutas = () => {
	const rutasAnidadas = RutaAnidada();
	return (
		<BrowserRouter>
			{rutasAnidadas}
			<Route exact path={nombresRutas.home}>
				<Inicio />
			</Route>
		</BrowserRouter>
	);
};

export default Rutas;
