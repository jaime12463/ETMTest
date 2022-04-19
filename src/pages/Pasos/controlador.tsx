import {lazy} from 'react';

const Planeacion = lazy(
	() => import(/* webpackChunkName: "Planeacion" */ './1_Planeacion')
);

const TomaDePedido = lazy(
	() => import(/* webpackChunkName: "TomaDePedido" */ './2_TomaDePedido')
);

const Otros = lazy(() => import(/* webpackChunkName: "Otros" */ './3_Otros'));

const FinalizarPedido = lazy(
	() => import(/* webpackChunkName: "FinalizarPedido" */ './4_FinalizarPedido')
);

export type TControlador = {
	id: string;
	titulo: string;
	componente: any;
};

export const controlador: TControlador[] = [
	{
		id: 'planeacion',
		titulo: 'pasos.planeacion',
		componente: <Planeacion />,
	},
	{
		id: 'tomaDePedido',
		titulo: 'pasos.tomaDePedido',
		componente: <TomaDePedido />,
	},
	{
		id: 'otros',
		titulo: 'pasos.otros',
		componente: <Otros />,
	},
	{
		id: 'finalizar',
		titulo: 'pasos.finalizar',
		componente: <FinalizarPedido />,
	},
];
