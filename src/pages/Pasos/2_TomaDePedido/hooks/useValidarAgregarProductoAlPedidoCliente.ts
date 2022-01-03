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
import {useCallback, useEffect} from 'react';
import {
	validarSubUnidadesConPresentacion,
	validarSubUnidadesEsMultiplo,
	validarUnidadesMinimasProducto,
	validarUnidadesDisponibles,
} from 'utils/validaciones';
import {
	useCalcularPresupuestoPedidoActual,
	useCalcularPresupuestoTipoPedido,
	useMostrarAviso,
	useObtenerDatosCliente,
	useObtenerDatosTipoPedido,
	useObtenerPedidosClienteMismaFechaEntrega,
} from 'hooks';
import {
	useAppDispatch,
	useObtenerClienteActual,
	useObtenerDatos,
	useObtenerPedidoActual,
	useObtenerVisitaActual,
} from 'redux/hooks';
import {useTranslation} from 'react-i18next';
import {
	useValidarProductoPermiteSubUnidades,
	useManejadorConfirmarAgregarPedido,
} from '.';
import {UseFormGetValues} from 'react-hook-form';
import {cambiarSeQuedaAEditar} from 'redux/features/visitaActual/visitaActualSlice';

export const useValidarAgregarProductoAlPedidoCliente = (
	mostrarAdvertenciaEnDialogo: TFunctionMostarAvertenciaPorDialogo,
	productoActual: TPrecioProducto | null,
	getValues: UseFormGetValues<TFormTomaDePedido>
) => {
	const {t} = useTranslation();

	const validarProductoPermiteSubUnidades =
		useValidarProductoPermiteSubUnidades();
	const visitaActual = useObtenerVisitaActual();
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

	const mostrarAviso = useMostrarAviso();

	const dispatch = useAppDispatch();

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
					productoActual.codigoProducto,
					presentacion
				);

				if (saldoPresupuesto < 0) {
					// mostrarAdvertenciaEnDialogo(
					// 	t('advertencias.excedePresupuesto', {
					// 		descripcion: datosTipoPedidoActual.descripcion,
					// 	}),
					// 	'excede-presupuesto'
					// );
					mostrarAviso(
						'error',
						t('advertencias.excedePresupuesto', {
							descripcion: datosTipoPedidoActual.descripcion,
						}),
						undefined,
						undefined,
						'excede-presupuesto'
					);
					return esValidacionCorrecta;
				}
			}

			if (!esPermitidoSubUnidades && subUnidadesParseado !== 0) {
				// mostrarAdvertenciaEnDialogo(
				// 	t('advertencias.subUnidadesNoPermitidas'),
				// 	'sub-unidades-no-permitidas'
				// );
				mostrarAviso(
					'error',
					t('advertencias.subUnidadesNoPermitidas'),
					undefined,
					undefined,
					'sub-unidades-no-permitidas'
				);
				return esValidacionCorrecta;
			}

			const esSubUnidadesMenorAPresentacion = validarSubUnidadesConPresentacion(
				presentacion,
				subUnidadesParseado
			);

			if (!esSubUnidadesMenorAPresentacion) {
				// mostrarAdvertenciaEnDialogo(
				// 	t('advertencias.limiteSubUnidades'),
				// 	'limite-sub-unidades'
				// );
				mostrarAviso(
					'error',
					t('advertencias.limiteSubUnidades'),
					undefined,
					undefined,
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
				// mostrarAdvertenciaEnDialogo(
				// 	t('advertencias.subUnidadesNoMultiplo', {
				// 		subunidadesVentaMinima,
				// 	}),
				// 	'sub-unidades-no-multiplo'
				// );
				mostrarAviso(
					'error',
					t('advertencias.subUnidadesNoMultiplo', {subunidadesVentaMinima}),
					undefined,
					undefined,
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
				if (unidadesDisponibles >= 0) {
					// mostrarAdvertenciaEnDialogo(
					// 	t('advertencias.excedeUnidadesDisponibles', {
					// 		disponible: unidadesDisponibles,
					// 	}),
					// 	'excede-disponible'
					// );
					mostrarAviso(
						'error',
						t('advertencias.excedeUnidadesDisponibles', {
							disponible: unidadesDisponibles,
						}),
						undefined,
						undefined,
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
				mostrarAviso(
					'error',
					t('advertencias.excedeMayorPermitido'),
					t('advertencias.excedeMayorPermitidoSubtitulo'),
					undefined,
					'excede-disponible'
				);

				dispatch(cambiarSeQuedaAEditar({seQueda: false, bordeError: true}));

				// return esValidacionCorrecta;
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
			visitaActual,
			getValues,
		]
	);
	return validarAgregarProductoAlPedidoCliente;
};
