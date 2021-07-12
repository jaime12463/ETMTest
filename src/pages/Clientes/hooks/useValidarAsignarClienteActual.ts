import {useCallback} from 'react';
import {TFunctionMostarAvertenciaPorDialogo, TCliente} from 'models';
import {useObtenerDatosCliente} from 'hooks';
import {useTranslation} from 'react-i18next';

type validacionAsignarClienteActual = {
	esValidoAsignarClienteActual: boolean;
	datosCliente: TCliente | undefined;
};

export const useValidarAsignarClienteActual = (
	mostrarAdvertenciaEnDialogo: TFunctionMostarAvertenciaPorDialogo
) => {
	const {obtenerDatosCliente} = useObtenerDatosCliente();
	const {t} = useTranslation();
	const validarAsignarClienteActual = useCallback(
		(codigoCliente: string): validacionAsignarClienteActual => {
			let estadoValidacion: validacionAsignarClienteActual = {
				esValidoAsignarClienteActual: false,
				datosCliente: undefined,
			};
			const datosCliente: TCliente | undefined = obtenerDatosCliente(
				codigoCliente
			);
			if (!datosCliente) {
				mostrarAdvertenciaEnDialogo(
					t('advertencias.clienteNoPortafolio'),
					'clienteNoPortafolio'
				);
				return estadoValidacion;
			}
			estadoValidacion = {
				esValidoAsignarClienteActual: true,
				datosCliente: datosCliente,
			};
			return estadoValidacion;
		},
		[mostrarAdvertenciaEnDialogo, obtenerDatosCliente]
	);
	return validarAsignarClienteActual;
};
