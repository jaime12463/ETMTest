import {
	Inicio,
	Clientes,
	TomaPedidoDelClienteActual,
	PreciosProductosDelClienteActual,
	EnvasesRetornables,
	PedidosDelClienteActual,
} from 'pages';
import React, {ReactNode, ReactNodeArray} from 'react';
import nombresRutas from './nombresRutas';


const routes: any = [
	{
		path: nombresRutas.inicio,
		componente: <Inicio />,
	},
	{
		path: nombresRutas.clientes,
		componente: <Clientes />,
		subRutas: [
			{
				path: nombresRutas.ingresarpedido,
				componente: <TomaPedidoDelClienteActual />,
				subRutas: [
					{
						path: nombresRutas.preciosProductos,
						componente: <PreciosProductosDelClienteActual />,
					},
					{
						path: nombresRutas.envasesRetornables,
						componente: <EnvasesRetornables />,
					},
					{
						path: nombresRutas.pedidosCliente,
						componente: <PedidosDelClienteActual />,
					},
				],
			},
		],
	},
];

export default routes;
