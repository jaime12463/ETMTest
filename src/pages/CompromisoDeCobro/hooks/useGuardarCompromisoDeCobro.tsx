/* import {useCallback} from 'react';
import {useAppDispatch, useAppSelector} from 'redux/hooks';
import {TCompromisoDeCobro} from 'models';
import {selectCompromisoDeCobro} from 'redux/features/compromisoDeCobro/compromisoDeCobroSlice';
import {guardarCompromisoDeCobro} from 'redux/features/clienteActual/clienteActualSlice';

export const useGuardarCompromisoDeCobro = () => {
	const dispatch = useAppDispatch();
	const compromisoDeCobroActual: TCompromisoDeCobro = useAppSelector(
		selectCompromisoDeCobro
	);
	const guardandoCompromisoDeCobro = useCallback(() => {
		dispatch(guardarCompromisoDeCobro(compromisoDeCobroActual));
	}, [dispatch]);

	return guardandoCompromisoDeCobro;
};
 */
export {};
