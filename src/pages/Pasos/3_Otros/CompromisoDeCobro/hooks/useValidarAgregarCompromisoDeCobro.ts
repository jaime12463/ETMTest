import {useCallback} from 'react';

import {useObtenerMontoTotalDocumentos} from './index';
import {obtenerTotalesCompromisoDeCobroCliente} from 'utils/methods';
import {TFunctionMostarAvertenciaPorDialogo, TClienteActual} from 'models';
import {
	useObtenerDatosCliente,
	useObtenerCompromisosDeCobroMismaFechaEntrega,
} from 'hooks';
import {useObtenerClienteActual} from 'redux/hooks';
import {useTranslation} from 'react-i18next';

type validacionAgregarCompromisoDeCobro = {
	esValidoAgregarCompromisoDeCobro: boolean;
};

export const useValidarAgregarCompromisoDeCobro = (
	mostrarAdvertenciaEnDialogo: TFunctionMostarAvertenciaPorDialogo
) => {
	const {obtenerDatosCliente} = useObtenerDatosCliente();
	const clienteActual: TClienteActual = useObtenerClienteActual();
	const {
		obtenerCompromisosDeCobroMismaFechaEntrega,
	} = useObtenerCompromisosDeCobroMismaFechaEntrega();
	const compromisosDeCobroMismaFechaEntrega = obtenerCompromisosDeCobroMismaFechaEntrega(
		clienteActual.codigoCliente
	);
	const montoTotalCompromisos = obtenerTotalesCompromisoDeCobroCliente(
		compromisosDeCobroMismaFechaEntrega
	);
	const montoTotalDocumentos = useObtenerMontoTotalDocumentos();
	const totalDeduda = montoTotalDocumentos - montoTotalCompromisos;

	const {t} = useTranslation();

	const ValidarAgregarCompromisoDeCobro = useCallback(
		(monto: number): validacionAgregarCompromisoDeCobro => {
			let estadoValidacion: validacionAgregarCompromisoDeCobro = {
				esValidoAgregarCompromisoDeCobro: false,
			};

			if (monto > totalDeduda) {
				mostrarAdvertenciaEnDialogo(
					t('advertencias.montoMayorDeuda'),
					'clienteNoPortafolio'
				);
				return estadoValidacion;
			}

			estadoValidacion = {
				esValidoAgregarCompromisoDeCobro: true,
			};
			return estadoValidacion;
		},
		[mostrarAdvertenciaEnDialogo, obtenerDatosCliente]
	);
	return ValidarAgregarCompromisoDeCobro;
};
