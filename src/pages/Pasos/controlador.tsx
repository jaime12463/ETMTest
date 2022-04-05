import {lazy} from 'react';
const Planeacion = lazy(() => import('./1_Planeacion'));
const TomaDePedido = lazy(() => import('./2_TomaDePedido'));
const Otros = lazy(() => import('./3_Otros'));
const FinalizarPedido = lazy(() => import('./4_FinalizarPedido'));

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
