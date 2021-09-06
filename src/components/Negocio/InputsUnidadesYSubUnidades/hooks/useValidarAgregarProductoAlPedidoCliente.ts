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
	useObtenerDatosCliente, 
	useObtenerDatosTipoPedido, 
	useObtenerPedidosClienteMismaFechaEntrega
} from 'hooks';
import {useObtenerClienteActual, useObtenerDatos} from 'redux/hooks';
import {useTranslation} from 'react-i18next';
import {useValidarProductoPermiteSubUnidades,
		useManejadorConfirmarAgregarPedido
} from '.';
import { UseFormGetValues } from 'react-hook-form';

export const useValidarAgregarProductoAlPedidoCliente = (
	mostrarAdvertenciaEnDialogo: TFunctionMostarAvertenciaPorDialogo,
	stateInputFocus: TStateInputFocus,
	productoActual: TPrecioProducto | null,
	getValues: UseFormGetValues<TFormTomaDePedido>,
	resetLineaActual: () => void,
) => {
	const {inputFocus, setInputFocus} = stateInputFocus;
	const {t} = useTranslation();

	const validarProductoPermiteSubUnidades = useValidarProductoPermiteSubUnidades();

	const clienteActual: TClienteActual = useObtenerClienteActual();

	const datos: TDatosClientesProductos = useObtenerDatos();

	const {datosCliente} = useObtenerDatosCliente(clienteActual.codigoCliente);

	const {obtenerPedidosClienteMismaFechaEntrega} = useObtenerPedidosClienteMismaFechaEntrega(clienteActual.codigoCliente);
	const pedidosCliente = obtenerPedidosClienteMismaFechaEntrega(clienteActual.codigoCliente);

	const obtenerDatosTipoPedido = useObtenerDatosTipoPedido();

	const manejadorConfirmarAgregarPedido = useManejadorConfirmarAgregarPedido(
		productoActual,
		clienteActual,
		getValues,
		stateInputFocus,
		resetLineaActual
	);

	const validarAgregarProductoAlPedidoCliente = useCallback(
		(inputs: TFormTomaDePedido): boolean => {
			const {unidades, subUnidades} = inputs;

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

			const {
				presentacion,
				subunidadesVentaMinima,
				esVentaSubunidades,
			} = productoActual;

			const esPermitidoSubUnidades = validarProductoPermiteSubUnidades(
				esVentaSubunidades
			);

			if (inputFocus === 'unidades' && esPermitidoSubUnidades) {
				setInputFocus('subUnidades');
				return esValidacionCorrecta;
			}

			const datosTipoPedidoActual:
			| TTipoPedido
			| undefined = obtenerDatosTipoPedido();

			if (inputFocus === 'subUnidades' && datosTipoPedidoActual?.requiereMotivo) {
				setInputFocus('catalogoMotivo');
				return esValidacionCorrecta;
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

			if (!esSubUnidadEsMultiplo) {
				mostrarAdvertenciaEnDialogo(
					t('advertencias.subUnidadesNoMultiplo', {
						subunidadesVentaMinima,
					}),
					'sub-unidades-no-multiplo'
				);
				return esValidacionCorrecta;
			}

			if(typeof productoActual.unidadesDisponibles !== 'undefined' && unidadesParseado !== 0)
			{
				const unidadesDisponibles = validarUnidadesDisponibles(
					pedidosCliente,
					unidadesParseado,
					productoActual
				);

				if (unidadesDisponibles >= 0)
				{
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
			inputFocus,
		]
	);
	return validarAgregarProductoAlPedidoCliente;
};
