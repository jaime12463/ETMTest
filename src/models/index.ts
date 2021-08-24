import {GridSize} from '@material-ui/core';
import {TPrecioProducto} from 'models/redux';
import React, {Dispatch, ReactElement, SetStateAction} from 'react';
import {
	Control,
	UseFormGetValues,
	UseFormHandleSubmit,
	UseFormSetValue,
} from 'react-hook-form';

export * from 'models/server';
export * from 'models/redux';

export type TConsolidadoImplicitos = {
	codigoImplicito: number;
	nombreImplicito: string;
	unidades: number;
	subUnidades: number;
};

export type TTotalPedido = {
	totalUnidades: number;
	totalSubUnidades: number;
	totalPrecio: number;
	totalContado: TTotalPedidoContado;
	totalCredito: TTotalPedidoCredito;
};
export type TTotalPedidoContado = {
	totalUnidades: number;
	totalSubUnidades: number;
	totalPrecio: number;
};
export type TTotalPedidoCredito = {
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
	deshabilitar: boolean;
};

export type THeader = {
	component: React.FC | ReactElement;
	width: GridSize;
};

//Estados

export type TStateProductoActual = {
	productoActual: TPrecioProducto | null;
	setProductoActual: Dispatch<SetStateAction<TPrecioProducto | null>>;
};

export type TStatePreciosProductos = {
	preciosProductos: TPrecioProducto[];
	setPreciosProductos: Dispatch<SetStateAction<TPrecioProducto[]>>;
};

export type TStateInputFocus = {
	inputFocus: InputsKeysFormTomaDePedido;
	setInputFocus: Dispatch<SetStateAction<InputsKeysFormTomaDePedido>>;
};

//Formularios

export type THookForm<T> = {
	control: Control<T>;
	handleSubmit: UseFormHandleSubmit<T>;
	setValue: UseFormSetValue<T>;
	getValues: UseFormGetValues<T>;
};

export type TFormTomaDePedido = TInputsUnidadesYSubUnidades &
	TInputFiltrarPreciosProductos;

export type TInputsCodigoCliente = {
	codigoCliente: string;
};
export type TInputsCompromisoDeCobro = {
	monto: string;
};

export type TInputsUnidadesYSubUnidades = {
	unidades: string;
	subUnidades: string;
};

export type TInputFiltrarPreciosProductos = {
	productoABuscar: string;
};

export type InputsKeysFormTomaDePedido =
	| 'unidades'
	| 'subUnidades'
	| 'productoABuscar';
