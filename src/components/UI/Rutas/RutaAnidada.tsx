import {Route} from 'react-router-dom';
import {DetallePedido, VisitasDelCliente, Clientes} from '../../../pages';
import nombresRutas from 'routes/nombresRutas';
import routes from 'routes';
import {ReactNodeArray} from 'react';
import {ReactNode} from 'react';

const rutaAnidada = (
	rutas: any = [...routes],
	pathAnidados: string[] = []
): any => {
	console.log(rutas);
	let componenteRenderizado: any = rutas.shift();

	let Component = componenteRenderizado?.component;

	let pathActual: string | undefined = componenteRenderizado?.nombre;
	pathActual && pathAnidados.push(pathActual);
	console.log('entre');
	if (!componenteRenderizado) {
		return;
	}
	if (componenteRenderizado?.subRutas) {
		console.log('entro renderizado');
		return (
			<Route path={pathAnidados.join('')}>
				{<Component />}
				{rutaAnidada(componenteRenderizado?.subRutas, pathAnidados)}
			</Route>
		);
	} else {
		return (
			<Route path={componenteRenderizado?.nombre}>
				{<Component />}
				{rutas.length > 0 && rutaAnidada(rutas)}
			</Route>
		);
	}
};

export default rutaAnidada;
