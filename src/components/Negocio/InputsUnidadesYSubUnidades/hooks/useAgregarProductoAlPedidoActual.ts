import {useCallback} from 'react';
import {useAppDispatch} from 'redux/hooks';
import {
	agregarProductoAlPedidoDelCliente,
	borrarProductoDelPedidoDelCliente,
} from 'redux/features/pedidoActual/pedidoActualSlice';
import {
	ETiposDePago,
	TFormTomaDePedido,
	TFunctionMostarAvertenciaPorDialogo,
	TPrecioProducto,
	TStateInputFocus,
} from 'models';
import {useValidarAgregarProductoAlPedidoCliente} from '.';

export const useAgregarProductoAlPedidoActual = (
	productoActual: TPrecioProducto | null,
	resetLineaActual: () => void,
	mostrarAdvertenciaEnDialogo: TFunctionMostarAvertenciaPorDialogo,
	stateInputFocus: TStateInputFocus
) => {
	const dispatch = useAppDispatch();

	const {inputFocus, setInputFocus} = stateInputFocus;

	const validarAgregarProductoAlPedidoCliente = useValidarAgregarProductoAlPedidoCliente(
		mostrarAdvertenciaEnDialogo,
		{inputFocus, setInputFocus},
		productoActual
	);

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
						tipoPago: ETiposDePago.Contado,
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
