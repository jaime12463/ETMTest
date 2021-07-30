import {Route} from 'react-router-dom';
import React, {ReactNodeArray} from 'react';
import routes from 'routes';

const construirAnidacion = (
	rutas = [...routes],
	rutasAnidadas: string[] = [],
	rutastest: any = []
) => {
	for (let ruta of rutas) {
		if (ruta.subRutas) {
			rutasAnidadas.push(ruta.path);
			rutastest.push(
				<Route key={ruta.path} path={rutasAnidadas.join('')}>
					{ruta.componente}
					{ruta.subRutas &&
						ruta.subRutas.map((el: any) => (
							<Route
								key={rutasAnidadas.join('') + el.path}
								path={rutasAnidadas.join('') + el.path}
							>
								{el.componente}
								{el.subRutas &&
									rutasAnidadas.push(el.path) &&
									construirAnidacion(el.subRutas, rutasAnidadas)}
							</Route>
						))}
				</Route>
			);
		} else {
			rutastest.push(
				<Route
					key={rutasAnidadas.join('') + ruta.path}
					exact
					path={rutasAnidadas.join('') + ruta.path}
				>
					{ruta.componente}
				</Route>
			);
		}
	}

	return rutastest;
};

const useRutaAnidada = () => {
	const rutasAnidadas = construirAnidacion();

	return rutasAnidadas.map((el: any, i: number) => (
		<React.Fragment key={i}>{el}</React.Fragment>
	));
};

export default useRutaAnidada;
