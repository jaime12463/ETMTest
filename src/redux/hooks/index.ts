import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import type {RootState, AppDispatch} from 'redux/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

import {useObtenerClienteActual} from './useObtenerClienteActual';
import {useObtenerConfiguracion} from './useObtenerConfiguracion';
import {useObtenerDatos} from './useObtenerDatos';
import {useObtenerPedidoActual} from './useObtenerPedidoActual';
import {useObtenerPedidosClientes} from './useObtenerPedidosClientes';
import {useObtenerEstadoApp} from './useObtenerEstadoApp';

export {
	useObtenerClienteActual,
	useObtenerConfiguracion,
	useObtenerDatos,
	useObtenerPedidoActual,
	useObtenerPedidosClientes,
	useObtenerEstadoApp,
};
