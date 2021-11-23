import {GridSize} from '@mui/material';
import {ETiposDePago, TIniciativasCliente, TPrecioProducto} from 'models/redux';
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
	tipoPago?: ETiposDePago;
	presentacion?: number;
	precioConImpuestoUnidad?: number;
	precioConImpuestoSubunidad?: number;
};

export type TTotal = {
	totalUnidades: number;
	totalSubUnidades: number;
	totalPrecio: number;
};

export type TTotalPedido = TTotal & {
	totalContado: TTotal;
	totalCredito: TTotal;
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

export interface TInfoDescuentos {
	tipo: 'escalonado' | 'polarizado' | 'automatico' | 'eliminado' | undefined;
	porcentajeDescuento: number | null;
	inputPolarizado: number;
}

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

export type TStateSubUnidadesEnvases = {
	subUnidadesEnvases: number;
	setSubUnidadesEnvases: Dispatch<SetStateAction<number>>;
};

export interface TStateInfoDescuentos {
	infoDescuento: TInfoDescuentos;
	setInfoDescuento: React.Dispatch<React.SetStateAction<TInfoDescuentos>>;
}

//Formularios

export type THookForm<T> = {
	control: Control<T>;
	handleSubmit: UseFormHandleSubmit<T>;
	setValue: UseFormSetValue<T>;
	getValues: UseFormGetValues<T>;
};

export type TFormTomaDePedido = TInputsUnidadesYSubUnidades &
	TInputFiltrarPreciosProductos &
	TSelectTipoDePedido &
	TSelectCatalogoMotivo;

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

export type TSelectTipoDePedido = {
	tipoDePedido: string;
};

export type InputsKeysFormTomaDePedido =
	| 'unidades'
	| 'subUnidades'
	| 'productoABuscar'
	| 'catalogoMotivo'
	| 'motivo';

export type TOpcionSelect = {
	value: string;
	label: string;
};

export type TSelectCatalogoMotivo = {
	catalogoMotivo: string;
};

export type TPropsFunctionMostarAdvertencia = {
	mensaje: string;
	dataCy: string;
	manejadorClick?: (oprimioBotonAceptar: boolean) => void;
	textosBotonesDefault?: {
		aceptar: string;
		cancelar: string;
	};
};

export type TRetornoValidacion = {
	propsAdvertencia: TPropsFunctionMostarAdvertencia | null;
	esValido: boolean;
	iniciativasVerificadas?: TIniciativasCliente[];
};
