import {
	DetallePedido,
	VisitasDelCliente,
	Clientes,
	Inicio,
	TomaPedidoDelClienteActual,
} from 'pages';
import nombresRutas from './nombresRutas';

type TRutaAnidada = {
	nombre: string;
	component: any;
	subRutas?: TRutaAnidada[];
};

const routes: TRutaAnidada[] = [
	{
		nombre: nombresRutas.inicio,
		component: Inicio,
	},
	{
		nombre: nombresRutas.clientes,
		component: Clientes,
		subRutas: [
			{
				nombre: nombresRutas.ingresarpedido,
				component: TomaPedidoDelClienteActual,
				subRutas: [
					{
						nombre: nombresRutas.ingresarpedido,
						component: VisitasDelCliente,
						subRutas: [
							{
								nombre: nombresRutas.detalle,
								component: DetallePedido,
							},
						],
					},
				],
			},
		],
	},
];

export default routes;
