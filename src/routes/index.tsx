import {
	Inicio,
	Clientes,
	Pasos,
} from 'pages';

import nombresRutas from './nombresRutas';

type TRoutes = {
	path: string,
	componente: JSX.Element,
}

const routes: TRoutes[] = [
	{
		path: nombresRutas.inicio,
		componente: <Inicio />,
	},
	{
		path: nombresRutas.clientes,
		componente: <Clientes />,
	},
	{
		path: nombresRutas.pasos,
		componente: <Pasos />,
	},
];

export default routes;