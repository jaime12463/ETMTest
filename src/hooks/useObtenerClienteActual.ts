import {TClienteActual} from 'models';
import {useAppSelector} from 'redux/hooks';
import {selectClienteActual} from 'redux/features/clienteActual/clienteActualSlice';

export const useObtenerClienteActual = (): TClienteActual => {
	const clienteActual: TClienteActual = useAppSelector(selectClienteActual);
	return clienteActual;
};
