import {Route} from 'react-router-dom';
import {DetallePedido, VisitasDelCliente, Clientes} from '../../../pages';

import nombresRutas from 'routes/nombresRutas';
import {ReactNodeArray} from 'react';
import {ReactNode} from 'react';

const componentes: ReactNodeArray = [
	<Clientes />,
	<VisitasDelCliente />,
	<DetallePedido />,
];
const rutas: string[] = [
	nombresRutas.clientes,
	nombresRutas.visitaClientes,
	nombresRutas.detalle,
];

const rutaAnidada = (
	componente: ReactNodeArray = componentes,
	path: string[] = rutas,
	pathAnidados: string[] = []
) => {
	let componenteRenderizado: ReactNode = componente.shift();
	let pathActual: string | undefined = path.shift();
	pathActual && pathAnidados.push(pathActual);

	return (
		<Route path={pathAnidados.join('')}>
			{componenteRenderizado}
			{componente && componente.length >= 1
				? rutaAnidada(componente, path, pathAnidados)
				: null}
		</Route>
	);
};

export default rutaAnidada;
