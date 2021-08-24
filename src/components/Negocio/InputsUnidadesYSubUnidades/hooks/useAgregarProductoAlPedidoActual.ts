import {useCallback} from 'react';
import {useAppDispatch, useObtenerClienteActual} from 'redux/hooks';
import {
	agregarProductoAlPedidoDelCliente,
	borrarProductoDelPedidoDelCliente,
} from 'redux/features/pedidoActual/pedidoActualSlice';
import {
	TClienteActual,
	TFormTomaDePedido,
	TFunctionMostarAvertenciaPorDialogo,
	TPrecioProducto,
	TStateInputFocus,
} from 'models';
import {useValidarAgregarProductoAlPedidoCliente} from '.';
import { UseFormGetValues } from 'react-hook-form';

export const useAgregarProductoAlPedidoActual = (
	productoActual: TPrecioProducto | null,
	resetLineaActual: () => void,
	mostrarAdvertenciaEnDialogo: TFunctionMostarAvertenciaPorDialogo,
	stateInputFocus: TStateInputFocus,
	getValues: UseFormGetValues<TFormTomaDePedido>,
) => {
	const dispatch = useAppDispatch();

	const {inputFocus, setInputFocus} = stateInputFocus;

	const validarAgregarProductoAlPedidoCliente = useValidarAgregarProductoAlPedidoCliente(
		mostrarAdvertenciaEnDialogo,
		{inputFocus, setInputFocus},
		productoActual,
		getValues,
		resetLineaActual
	);

	const clienteActual: TClienteActual = useObtenerClienteActual();

	const agregarProductoAlPedidoActual = useCallback(
		(inputs: TFormTomaDePedido) => {
			const {unidades, subUnidades} = inputs;

			const unidadesParseado: number = unidades !== '' ? parseInt(unidades) : 0;

			const subUnidadesParseado: number =
				subUnidades !== '' ? parseInt(subUnidades) : 0;

			const esValidoAgregarProductoAlPedidoCliente: boolean = validarAgregarProductoAlPedidoCliente(
				inputs
			);

			if (!productoActual) return;

			const {codigoProducto} = productoActual;

			if (!esValidoAgregarProductoAlPedidoCliente) return;

			if (unidadesParseado > 0 || subUnidadesParseado > 0) {
				dispatch(
					agregarProductoAlPedidoDelCliente({
						...productoActual,
						unidades: unidadesParseado,
						subUnidades: subUnidadesParseado,
						total:
							productoActual.precioConImpuestoUnidad * unidadesParseado +
							productoActual.precioConImpuestoSubunidad * subUnidadesParseado,
						tipoPago: clienteActual.tipoPagoActual,
					})
				);
			} else dispatch(borrarProductoDelPedidoDelCliente(codigoProducto));

			setInputFocus('productoABuscar');

			resetLineaActual();
		},
		[
			productoActual,
			validarAgregarProductoAlPedidoCliente,
			dispatch,
			setInputFocus,
		]
	);
	return agregarProductoAlPedidoActual;
};
