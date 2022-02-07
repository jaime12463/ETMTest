import {useCallback} from 'react';
import {TCliente, TFunctionMostarAvertenciaPorDialogo} from 'models';
import {useObtenerDatosCliente, useMostrarAviso} from 'hooks';
import {useTranslation} from 'react-i18next';

type validacionInicializarClienteActual = {
	esValidoInicializarClienteActual: boolean;
	datosCliente: TCliente | undefined;
};

export const useValidarInicializarClienteActual = (
	mostrarAdvertenciaEnDialogo: TFunctionMostarAvertenciaPorDialogo
) => {
	const {obtenerDatosCliente} = useObtenerDatosCliente();

	const {t} = useTranslation();
	const mostrarAviso = useMostrarAviso();

	const validarInicializarClienteActual = useCallback(
		(codigoCliente: string): validacionInicializarClienteActual => {
			let estadoValidacion: validacionInicializarClienteActual = {
				esValidoInicializarClienteActual: false,
				datosCliente: undefined,
			};
			const datosCliente: TCliente | undefined =
				obtenerDatosCliente(codigoCliente);
			if (!datosCliente) {
				mostrarAviso(
					'error',
					t('advertencias.clienteNoExiste'),
					undefined,
					undefined,
					'clienteNoPortafolio'
				);
				return estadoValidacion;
			}
			estadoValidacion = {
				esValidoInicializarClienteActual: true,
				datosCliente: datosCliente,
			};
			return estadoValidacion;
		},
		[mostrarAdvertenciaEnDialogo, obtenerDatosCliente]
	);
	return validarInicializarClienteActual;
};
