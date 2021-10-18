import i18n from 'i18next';
import React, {Component} from 'react';
import {Planeacion} from './1_Planeacion';
import TomaDePedido from './2_TomaDePedido';
import {Otros} from './3_Otros';
import {FinalizarPedido} from './4_FinalizarPedido';

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
