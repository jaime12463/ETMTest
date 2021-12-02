import { Route, BrowserRouter as Router } from 'react-router-dom';
import { Fragment } from 'react';
import routes from 'routes';

type TRoutes = {
	path: string,
	componente: JSX.Element,
}

const construirRutas = (
	rutas: TRoutes[] = [...routes],
	rutasArmadas: any = []
) => {
	for (let ruta of rutas) {
		rutasArmadas.push(
			<Route
				key={ruta.path}
				exact
				path={ruta.path}
			>
				{ruta.componente}
			</Route>
		);
	}

	return rutasArmadas;
};

const useObtenerRutas = () => {
	const rutasArmadas = construirRutas();

	return (
		<Router>
			{
				rutasArmadas.map((ruta: any, i: number) => (
					<Fragment key={i}>
						{ruta}
					</Fragment>
				))
			}
		</Router>
	);
};

export default useObtenerRutas;
