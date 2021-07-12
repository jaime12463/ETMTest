import {Route} from 'react-router-dom';
import {
	TomaDePedidos,
	DetallePedido,
	VisitasDelCliente,
	Clientes,
} from '../../pages';

import nombresRutas from 'routes/nombresRutas';
import {ReactNodeArray} from 'react';
import {ReactNode} from 'react';

const componentes: ReactNodeArray = [
	<Clientes />,
	<VisitasDelCliente />,
	<TomaDePedidos />,
	<DetallePedido />,
];
const rutas: string[] = [
	nombresRutas.clientes,
	nombresRutas.visitaClientes,
	nombresRutas.ingresarpedido,
	nombresRutas.detalle,
];

const useRutaAnidada = (
	componente: ReactNodeArray = componentes,
	path: string[] = rutas,
	rutaAnidada: string[] = []
) => {
	let componenteRenderizado: ReactNode = componente.shift();
	let pathActual: string | undefined = path.shift();
	pathActual && rutaAnidada.push(pathActual);
	return (
		<Route path={rutaAnidada.join('')}>
			{componenteRenderizado}
			{componente && componente.length >= 1
				? useRutaAnidada(componente, path, rutaAnidada)
				: null}
		</Route>
	);
};

export default useRutaAnidada;
