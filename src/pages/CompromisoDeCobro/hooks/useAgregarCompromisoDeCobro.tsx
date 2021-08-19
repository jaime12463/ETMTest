import {useCallback} from 'react';

import {useAppDispatch, useObtenerPedidoActual} from 'redux/hooks';
import {
	TFunctionMostarAvertenciaPorDialogo,
	TInputsCompromisoDeCobro,
} from 'models';
import {agregarCompromisoDeCobro} from 'redux/features/compromisoDeCobro/compromisoDeCobroSlice';
import {useValidarAgregarCompromisoDeCobro} from './index';
import {v4 as uuidv4} from 'uuid';

export const useAgregarCompromisoDeCobro = (
	mostrarAdvertenciaEnDialogo: TFunctionMostarAvertenciaPorDialogo
) => {
	const dispatch = useAppDispatch();
	const pedidoActual = useObtenerPedidoActual();
	const {fechaEntrega} = pedidoActual;

	const fechaCreacion = new Date(new Date().toString().split('GMT')[0] + ' UTC')
		.toISOString()
		.split('.')[0]
		.replace('T', ' ');

	const ValidarAgregarCompromisoDeCobro = useValidarAgregarCompromisoDeCobro(
		mostrarAdvertenciaEnDialogo
	);

	const agregandoCompromisoDeCobro = useCallback(
		({monto}: TInputsCompromisoDeCobro) => {
			const montoParseado: number = monto !== '' ? parseInt(monto) : 0;
			const {
				esValidoAgregarCompromisoDeCobro,
			} = ValidarAgregarCompromisoDeCobro(montoParseado);

			if (!esValidoAgregarCompromisoDeCobro) return;

			dispatch(
				agregarCompromisoDeCobro({
					ID: uuidv4(),
					fechaCreacion,
					fechaEntrega,
					monto: montoParseado,
					tipoDocumento: 'N/A',
				})
			);
		},
		[mostrarAdvertenciaEnDialogo, dispatch]
	);

	return agregandoCompromisoDeCobro;
};
