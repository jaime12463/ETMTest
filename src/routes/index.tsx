import {
	Inicio,
	Clientes,
	TomaPedidoDelClienteActual,
	PreciosProductosDelClienteActual,
	EnvasesRetornables,
	PedidosDelClienteActual,
} from 'pages';
import {ReactNode} from 'react';
import nombresRutas from './nombresRutas';

type TRutaAnidada = {
	ruta: string;
	componente: ReactNode;
};

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
		path: nombresRutas.ingresarPedido,
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
];

export default routes;
