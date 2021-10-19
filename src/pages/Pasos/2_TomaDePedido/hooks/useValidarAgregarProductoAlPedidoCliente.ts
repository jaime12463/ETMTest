import {
	TCliente,
	TFormTomaDePedido,
	TFunctionMostarAvertenciaPorDialogo,
	TClienteActual,
	TDatosClientesProductos,
	TPrecioProducto,
	TStateInputFocus,
	TTipoPedido,
} from 'models';
import {useCallback} from 'react';
import {
	validarSubUnidadesConPresentacion,
	validarSubUnidadesEsMultiplo,
	validarUnidadesMinimasProducto,
	validarUnidadesDisponibles,
} from 'utils/validaciones';
import {
	useCalcularPresupuestoPedidoActual,
	useCalcularPresupuestoTipoPedido,
	useObtenerDatosCliente,
	useObtenerDatosTipoPedido,
	useObtenerPedidosClienteMismaFechaEntrega,
} from 'hooks';
import {
	useObtenerClienteActual,
	useObtenerDatos,
	useObtenerPedidoActual,
} from 'redux/hooks';
import {useTranslation} from 'react-i18next';
import {
	useValidarProductoPermiteSubUnidades,
	useManejadorConfirmarAgregarPedido,
} from '.';
import {UseFormGetValues} from 'react-hook-form';

export const useValidarAgregarProductoAlPedidoCliente = (
	mostrarAdvertenciaEnDialogo: TFunctionMostarAvertenciaPorDialogo,
	productoActual: TPrecioProducto | null,
	getValues: UseFormGetValues<TFormTomaDePedido>
) => {
	const {t} = useTranslation();

	const validarProductoPermiteSubUnidades =
		useValidarProductoPermiteSubUnidades();

	const clienteActual: TClienteActual = useObtenerClienteActual();

	const pedidoActual = useObtenerPedidoActual();

	const datos: TDatosClientesProductos = useObtenerDatos();

	const {datosCliente} = useObtenerDatosCliente(clienteActual.codigoCliente);

	const {obtenerPedidosClienteMismaFechaEntrega} =
		useObtenerPedidosClienteMismaFechaEntrega(clienteActual.codigoCliente);

	const calcularPresupuestoPedidoActual = useCalcularPresupuestoPedidoActual();

	const pedidosCliente = obtenerPedidosClienteMismaFechaEntrega(
		clienteActual.codigoCliente
	);

	const obtenerDatosTipoPedido = useObtenerDatosTipoPedido();

	const manejadorConfirmarAgregarPedido = useManejadorConfirmarAgregarPedido(
		productoActual,
		clienteActual,
		getValues
	);

	const validarAgregarProductoAlPedidoCliente = useCallback(
		(inputs: TFormTomaDePedido): boolean => {
			const {unidades, subUnidades, productoABuscar} = inputs;

			let esValidacionCorrecta: boolean = false;

			if (!productoActual) {
				mostrarAdvertenciaEnDialogo(
					t('error.noProductoActual'),
					'no-producto-actual'
				);
				return esValidacionCorrecta;
			}

			if (!datosCliente) {
				mostrarAdvertenciaEnDialogo(
					t('error.NoDatosCliente'),
					'no-datos-cliente'
				);
				return esValidacionCorrecta;
			}

			const unidadesParseado: number = unidades !== '' ? parseInt(unidades) : 0;

			const subUnidadesParseado: number =
				subUnidades !== '' ? parseInt(subUnidades) : 0;

			const {presentacion, subunidadesVentaMinima, esVentaSubunidades} =
				productoActual;

			const esPermitidoSubUnidades =
				validarProductoPermiteSubUnidades(esVentaSubunidades);

			const datosTipoPedidoActual: TTipoPedido | undefined =
				obtenerDatosTipoPedido();

			if (datosTipoPedidoActual?.validaPresupuesto) {
				const saldoPresupuesto = calcularPresupuestoPedidoActual(
					pedidoActual,
					unidadesParseado,
					subUnidadesParseado,
					parseInt(productoABuscar),
					presentacion
				);

				if (saldoPresupuesto < 0) {
					mostrarAdvertenciaEnDialogo(
						t('advertencias.excedePresupuesto', {
							descripcion: datosTipoPedidoActual.descripcion,
						}),
						'excede-presupuesto'
					);
					return esValidacionCorrecta;
				}
			}

			if (!esPermitidoSubUnidades && subUnidadesParseado !== 0) {
				mostrarAdvertenciaEnDialogo(
					t('advertencias.subUnidadesNoPermitidas'),
					'sub-unidades-no-permitidas'
				);
				return esValidacionCorrecta;
			}

			const esSubUnidadesMenorAPresentacion = validarSubUnidadesConPresentacion(
				presentacion,
				subUnidadesParseado
			);

			if (!esSubUnidadesMenorAPresentacion) {
				mostrarAdvertenciaEnDialogo(
					t('advertencias.limiteSubUnidades'),
					'limite-sub-unidades'
				);
				return esValidacionCorrecta;
			}

			const esSubUnidadEsMultiplo = validarSubUnidadesEsMultiplo(
				subunidadesVentaMinima,
				subUnidadesParseado
			);

			if (
				datosTipoPedidoActual?.validaSubunidadesMinimas &&
				!esSubUnidadEsMultiplo
			) {
				mostrarAdvertenciaEnDialogo(
					t('advertencias.subUnidadesNoMultiplo', {
						subunidadesVentaMinima,
					}),
					'sub-unidades-no-multiplo'
				);
				return esValidacionCorrecta;
			}

			if (
				typeof productoActual.unidadesDisponibles !== 'undefined' &&
				unidadesParseado !== 0
			) {
				const unidadesDisponibles = validarUnidadesDisponibles(
					pedidosCliente,
					unidadesParseado,
					productoActual
				);

				console.log('unidadesParseado', unidadesParseado);

				if (unidadesDisponibles >= 0) {
					mostrarAdvertenciaEnDialogo(
						t('advertencias.excedeUnidadesDisponibles', {
							disponible: unidadesDisponibles,
						}),
						'excede-disponible'
					);
					return esValidacionCorrecta;
				}
			}

			const {configuracionPedido}: TCliente = datosCliente;

			const esUnidadesMenorAlMaximoUnidades = validarUnidadesMinimasProducto(
				unidadesParseado,
				configuracionPedido
			);

			if (!esUnidadesMenorAlMaximoUnidades) {
				mostrarAdvertenciaEnDialogo(
					t('advertencias.cantidadEsMayor', {
						cantidad: configuracionPedido.cantidadMaximaUnidades,
					}),
					'cantidad-es-mayor',
					manejadorConfirmarAgregarPedido,
					{
						aceptar: t('general.si'),
						cancelar: t('general.no'),
					}
				);
				return esValidacionCorrecta;
			}

			esValidacionCorrecta = true;

			return esValidacionCorrecta;
		},
		[
			productoActual,
			clienteActual,
			datos,
			datosCliente,
			mostrarAdvertenciaEnDialogo,
			t,
		]
	);
	return validarAgregarProductoAlPedidoCliente;
};
