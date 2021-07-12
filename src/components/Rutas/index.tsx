import {BrowserRouter, Route} from 'react-router-dom';
import nombresRutas from '../../routes/nombresRutas';
import {Inicio} from '../../pages';
import useRutaAnidada from './useRutaAnidada';

const Rutas = () => {
	return (
		<BrowserRouter>
			{useRutaAnidada()}
			<Route exact path={nombresRutas.home}>
				<Inicio />
			</Route>
		</BrowserRouter>
	);
};

export default Rutas;
