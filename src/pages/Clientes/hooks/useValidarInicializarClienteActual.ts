import {useCallback} from 'react';
import {TFunctionMostarAvertenciaPorDialogo, TCliente} from 'models';
import {useObtenerDatosCliente} from 'hooks';
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
	const validarInicializarClienteActual = useCallback(
		(codigoCliente: string): validacionInicializarClienteActual => {
			let estadoValidacion: validacionInicializarClienteActual = {
				esValidoInicializarClienteActual: false,
				datosCliente: undefined,
			};
			const datosCliente: TCliente | undefined = obtenerDatosCliente(
				codigoCliente
			);
			if (!datosCliente) {
				mostrarAdvertenciaEnDialogo(
					t('advertencias.clienteNoExiste'),
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
