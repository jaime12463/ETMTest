import {useCallback} from 'react';
import {useAppDispatch, useObtenerClienteActual} from 'redux/hooks';
import {
	editarProductoDelPedidoActual,
	borrarProductoDelPedidoActual,
} from 'redux/features/visitaActual/visitaActualSlice';
import {
	TClienteActual,
	TFormTomaDePedido,
	TFunctionMostarAvertenciaPorDialogo,
	TPrecioProducto,
	TStateInputFocus,
} from 'models';
import {
	useValidarAgregarProductoAlPedidoCliente,
	useManejadorConfirmarEliminarPedidosNoMandatorios,
} from '.';
import {UseFormGetValues} from 'react-hook-form';

import {validarHayMasProductosMandatorios} from 'utils/validaciones';
import {useTranslation} from 'react-i18next';
import {useObtenerProductosMandatoriosVisitaActual} from 'hooks';

export const useAgregarProductoAlPedidoActual = (
	productoActual: TPrecioProducto | null,
	resetLineaActual: () => void,
	mostrarAdvertenciaEnDialogo: TFunctionMostarAvertenciaPorDialogo,
	stateInputFocus: TStateInputFocus,
	getValues: UseFormGetValues<TFormTomaDePedido>
) => {
	const dispatch = useAppDispatch();
	const {t} = useTranslation();

	const {inputFocus, setInputFocus} = stateInputFocus;

	const validarAgregarProductoAlPedidoCliente = useValidarAgregarProductoAlPedidoCliente(
		mostrarAdvertenciaEnDialogo,
		{inputFocus, setInputFocus},
		productoActual,
		getValues,
		resetLineaActual
	);
	const productosMandatoriosVisitaActual = useObtenerProductosMandatoriosVisitaActual();
	const manejadorConfirmarEliminarPedidosNoMandatorios = useManejadorConfirmarEliminarPedidosNoMandatorios(
		productosMandatoriosVisitaActual.noMandatorios,
		productoActual?.codigoProducto
	);
	const clienteActual: TClienteActual = useObtenerClienteActual();

	const agregarProductoAlPedidoActual = useCallback(
		(inputs: TFormTomaDePedido) => {
			const {unidades, subUnidades, catalogoMotivo} = inputs;

			const unidadesParseado: number = unidades !== '' ? parseInt(unidades) : 0;

			const subUnidadesParseado: number =
				subUnidades !== '' ? parseInt(subUnidades) : 0;

			if (!productoActual) return;

			const esValidoAgregarProductoAlPedidoCliente: boolean = validarAgregarProductoAlPedidoCliente(
				inputs
			);

			const {codigoProducto} = productoActual;

			if (!esValidoAgregarProductoAlPedidoCliente) return;

			if (unidadesParseado > 0 || subUnidadesParseado > 0) {
				dispatch(
					editarProductoDelPedidoActual({
						productoPedido: {
							...productoActual,
							unidades: unidadesParseado,
							subUnidades: subUnidadesParseado,
							total:
								productoActual.precioConImpuestoUnidad * unidadesParseado +
								productoActual.precioConImpuestoSubunidad * subUnidadesParseado,
							tipoPago: clienteActual.tipoPagoActual,
							catalogoMotivo,
						},
					})
				);
			} else {
				if (
					validarHayMasProductosMandatorios(
						productosMandatoriosVisitaActual.mandatorios
					)
				) {
					dispatch(borrarProductoDelPedidoActual({codigoProducto}));
				} else {
					mostrarAdvertenciaEnDialogo(
						t('advertencias.borrarPedidosNoMandatorios'),
						'eliminar-linea-pedido',
						manejadorConfirmarEliminarPedidosNoMandatorios,
						{
							aceptar: t('general.si'),
							cancelar: t('general.no'),
						}
					);
				}
			}
			setInputFocus('productoABuscar');

			resetLineaActual();
		},
		[
			productoActual,
			validarAgregarProductoAlPedidoCliente,
			dispatch,
			setInputFocus,
			inputFocus,
		]
	);
	return agregarProductoAlPedidoActual;
};
