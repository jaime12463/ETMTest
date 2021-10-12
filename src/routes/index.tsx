import {
	Inicio,
	Clientes,
	TomaPedidoDelClienteActual,
	EnvasesRetornables,
	PedidosDelClienteActual,
	Planeacion,
	FinalizarPedido,
} from 'pages';

import nombresRutas from './nombresRutas';

//TODO: Hay que tipar esto aca y en el componente de rutas
const routes: any = [
	{
		path: nombresRutas.inicio,
		componente: <Inicio />,
	},
	{
		path: nombresRutas.clientes,
		componente: <Clientes />,
	},
	{
		path: nombresRutas.planeacion,
		componente: <Planeacion />,
	},
	{
		path: nombresRutas.ingresarPedido,
		componente: <TomaPedidoDelClienteActual />,
		subRutas: [
			{
				path: nombresRutas.envasesRetornables,
				componente: <EnvasesRetornables />,
			},
			{
				path: nombresRutas.pedidosCliente,
				componente: <PedidosDelClienteActual />,
			},
			{
				path: nombresRutas.finalizarPedido,
				componente: <FinalizarPedido />,
			},
		],
	},
];

export default routes;
