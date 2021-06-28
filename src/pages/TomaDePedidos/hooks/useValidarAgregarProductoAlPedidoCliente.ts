import {
	TCliente,
	TInputsFormularioAgregarProducto,
	TProducto,
	TFunctionMostarAvertenciaPorDialogo,
} from 'models';
import {useCallback} from 'react';
import {
	validarSubUnidadesConPresentacion,
	validarSubUnidadesEsMultiplo,
	validarUnidadesMinimasProducto,
} from 'utils/validaciones';
import {useObtenerClienteActual} from '.';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from 'redux/hooks';
import {selectDatos} from 'redux/features/datos/datosSlice';
import {usePermiteSubUnidades} from '.';

export const useValidarAgregarProductoAlPedidoCliente = (
	mostrarAdvertenciaEnDialogo: TFunctionMostarAvertenciaPorDialogo,
	manejadorConfirmarAgregarPedido: any,
	agregarProductoAlPedidoCliente: any
) => {
	const {t} = useTranslation();
	const obtenerClienteActual = useObtenerClienteActual();
	const {datos} = useAppSelector(selectDatos);
	const permiteSubUnidades = usePermiteSubUnidades();
	const validarAgregarProductoAlPedidoCliente = useCallback(
		({
			codigoCliente,
			unidades,
			subUnidades,
			codigoProductoConNombre,
			productoABuscar,
		}: TInputsFormularioAgregarProducto) => {
			const clienteEncontrado: TCliente | undefined = obtenerClienteActual(
				codigoCliente
			);
			const unidadesParseado: number = unidades !== '' ? parseInt(unidades) : 0;
			const subUnidadesParseado: number =
				subUnidades !== '' ? parseInt(subUnidades) : 0;
			const codigoProducto: number = parseInt(
				codigoProductoConNombre.split(' ')[0]
			);
			const {presentacion, subunidadesVentaMinima}: TProducto = datos.productos[
				codigoProducto
			];
			const esPermitidoSubUnidades = permiteSubUnidades(
				codigoCliente,
				codigoProducto
			);

			const esSubUnidadesMenorAPresentacion = validarSubUnidadesConPresentacion(
				presentacion,
				subUnidadesParseado
			);

			if (!esPermitidoSubUnidades && subUnidadesParseado !== 0) {
				mostrarAdvertenciaEnDialogo(
					t('advertencias.subUnidadesNoPermitidas'),
					'sub-unidades-no-permitidas'
				);
				return;
			}

			if (!esSubUnidadesMenorAPresentacion) {
				mostrarAdvertenciaEnDialogo(
					t('advertencias.limiteSubUnidades'),
					'limite-sub-unidades'
				);
				return;
			}

			//TODO: subunidadesVentaMinima es opcional?
			const esSubUnidadEsMultiplo = validarSubUnidadesEsMultiplo(
				subunidadesVentaMinima,
				subUnidadesParseado
			);

			if (!esSubUnidadEsMultiplo) {
				mostrarAdvertenciaEnDialogo(
					t('advertencias.subUnidadesNoMultiplo', {
						subunidadesVentaMinima,
					}),
					'sub-unidades-no-permitida'
				);
				return;
			}

			const esUnidadesMenorAlMaximoUnidades = validarUnidadesMinimasProducto(
				unidadesParseado,
				clienteEncontrado.configuracionPedido
			);
			console.log(esUnidadesMenorAlMaximoUnidades);

			if (!esUnidadesMenorAlMaximoUnidades) {
				mostrarAdvertenciaEnDialogo(
					t('advertencias.cantidadEsMayor', {
						cantidad:
							clienteEncontrado.configuracionPedido.cantidadMaximaUnidades,
					}),
					'cantidad-es-mayor',
					manejadorConfirmarAgregarPedido,
					{
						aceptar: t('general.si'),
						cancelar: t('general.no'),
					}
				);
				return;
			}

			agregarProductoAlPedidoCliente({
				codigoCliente,
				unidades,
				subUnidades,
				codigoProductoConNombre,
				productoABuscar,
			});
		},
		[
			obtenerClienteActual,
			mostrarAdvertenciaEnDialogo,
			agregarProductoAlPedidoCliente,
			manejadorConfirmarAgregarPedido,
			permiteSubUnidades,
			t,
		]
	);
	return validarAgregarProductoAlPedidoCliente;
};
