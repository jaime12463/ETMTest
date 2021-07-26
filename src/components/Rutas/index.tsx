import {BrowserRouter, Route} from 'react-router-dom';
import nombresRutas from '../../routes/nombresRutas';
import {Inicio} from '../../pages';
import rutaAnidada from './rutaAnidada';

const Rutas = () => {
	const rutasAnidadas = rutaAnidada();
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
