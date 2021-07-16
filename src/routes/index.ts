import {
	TomaDePedidos,
	DetallePedido,
	VisitasDelCliente,
	Clientes,
	Inicio,
} from '../pages';
import nombresRutas from './nombresRutas';

type TRutaAnidada = {
	nombre: string;
	component: React.ReactNode;
	subRutas?: TRutaAnidada[];
};

const routes: TRutaAnidada[] = [
	{
		nombre: nombresRutas.clientes,
		component: Clientes,
		subRutas: [
			{
				nombre: nombresRutas.visitaClientes,
				component: VisitasDelCliente,
				subRutas: [
					{
						nombre: nombresRutas.ingresarpedido,
						component: TomaDePedidos,
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
	{
		nombre: nombresRutas.home,
		component: Inicio,
	},
];

export default routes;
