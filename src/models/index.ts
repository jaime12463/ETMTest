import {GridSize} from '@material-ui/core';
import React, {ReactElement} from 'react';
import {
	Control,
	UseFormGetValues,
	UseFormHandleSubmit,
	UseFormSetValue,
} from 'react-hook-form';
import {TPrecio} from 'models/server';

export * from 'models/server';
export * from 'models/redux';

export type TPrecioSinVigencia = {
	codigoProductoConNombre: string;
	precioConImpuestoUnidad: number;
	precioConImpuestoSubunidad: number;
	codigoImplicito1?: number;
	nombreImplicito1?: string;
	codigoImplicito2?: number;
	nombreImplicito2?: string;
};

export type TPrecioProducto = {
	codigoProducto: number;
	nombre: string;
	presentacion: number;
	precios: TPrecio[];
	codigoImplicito1?: number;
	nombreImplicito1?: string;
	codigoImplicito2?: number;
	nombreImplicito2?: string;
};

export type TInputsCodigoCliente = {
	codigoCliente: string;
};

export type TInputsFormularioAgregarProducto = {
	unidades: string;
	subUnidades: string;
	codigoProductoConNombre: string;
	productoABuscar: string;
};

export type TTotalPedido = {
	totalUnidades: number;
	totalSubUnidades: number;
	totalPrecio: number;
};

export type TFunctionMostarAvertenciaPorDialogo = (
	mensaje: string,
	dataCy: string,
	manejadorClick?: (oprimioBotonAceptar: boolean) => void,
	textosBotonesDefault?: {
		aceptar: string;
		cancelar: string;
	}
) => void;

export type TValidacionFechaEntrega = {
	esValidaFechaEntrega: boolean;
	fechaEntrega: string;
};

export type TValidacionFechaVisita = {
	esValidaVisitaPlanificada: boolean;
	fechaVisitaPlanificada: string;
};

export type TTab = {
	label: string;
	component: React.ReactNode;
};

export type THookForm<T> = {
	control: Control<T>;
	handleSubmit: UseFormHandleSubmit<T>;
	setValue: UseFormSetValue<T>;
	getValues: UseFormGetValues<T>;
};

export type THeader = {
	component: React.FC | ReactElement;
	width: GridSize;
};

export type InputsKeys =
	| 'unidades'
	| 'subUnidades'
	| 'codigoProductoConNombre'
	| 'productoABuscar';

export type TConsolidadoImplicitos = {
	codigoImplicito?: number;
	nombreImplicito?: string;
	unidades: number;
	subUnidades: number;
};
