import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import type {RootState, AppDispatch} from 'redux/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export {useObtenerCompromisoDeCobroActual} from './useObtenerCompromisoDeCobroActual';
export {useObtenerClienteActual} from './useObtenerClienteActual';
export {useObtenerConfiguracion} from './useObtenerConfiguracion';
export {useObtenerDatos} from './useObtenerDatos';
export {useObtenerPedidoActual} from './useObtenerPedidoActual';
export {useObtenerPedidosClientes} from './useObtenerPedidosClientes';
export {useObtenerVisitaActual} from './useObtenerVisitaActual';
