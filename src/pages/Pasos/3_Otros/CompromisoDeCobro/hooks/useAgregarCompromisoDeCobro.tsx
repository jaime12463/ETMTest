import {useCallback} from 'react';

import {useAppDispatch, useObtenerPedidoActual} from 'redux/hooks';
import {
	TFunctionMostarAvertenciaPorDialogo,
	TInputsCompromisoDeCobro,
} from 'models';
import {agregarCompromisoDeCobro} from 'redux/features/compromisoDeCobro/compromisoDeCobroSlice';
import {useValidarAgregarCompromisoDeCobro} from './index';
import {v4 as uuidv4} from 'uuid';
import {useMostrarAviso} from 'hooks';

export const useAgregarCompromisoDeCobro = (
	mostrarAdvertenciaEnDialogo: TFunctionMostarAvertenciaPorDialogo
) => {
	const dispatch = useAppDispatch();
	const mostrarAviso = useMostrarAviso();
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
			const montoParseado: number =
				monto !== '' ? Math.round(+monto * 100) / 100 : 0;

			const {esValidoAgregarCompromisoDeCobro} =
				ValidarAgregarCompromisoDeCobro(montoParseado);

			if (!esValidoAgregarCompromisoDeCobro) return;
			mostrarAviso(
				//TODOO IDIOMA
				'success',
				'Compromiso de cobro agregado correctamente',
				undefined,
				undefined,
				'bonificacionAgregada'
			);
			dispatch(
				agregarCompromisoDeCobro({
					id: uuidv4(),
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
