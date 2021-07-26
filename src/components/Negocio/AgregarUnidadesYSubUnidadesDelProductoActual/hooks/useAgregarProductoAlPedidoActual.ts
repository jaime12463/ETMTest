import {useCallback} from 'react';
import {useAppDispatch} from 'redux/hooks';
import {
	agregarProductoAlPedidoDelCliente,
	borrarProductoDelPedidoDelCliente,
} from 'redux/features/pedidoActual/pedidoActualSlice';
import {
	TFunctionMostarAvertenciaPorDialogo,
	TInputsFormularioAgregarProducto,
	TPrecioSinVigencia,
} from 'models';
import {useValidarAgregarProductoAlPedidoCliente} from '.';

export const useAgregarProductoAlPedidoActual = (
	productoActual: TPrecioSinVigencia,
	resetLineaActual: () => void,
	mostrarAdvertenciaEnDialogo: TFunctionMostarAvertenciaPorDialogo
) => {
	const dispatch = useAppDispatch();

	const validarAgregarProductoAlPedidoCliente = useValidarAgregarProductoAlPedidoCliente(
		mostrarAdvertenciaEnDialogo
	);

	const agregarProductoAlPedidoActual = useCallback(
		(inputs: TInputsFormularioAgregarProducto) => {
			const {unidades, subUnidades, codigoProductoConNombre} = inputs;

			const unidadesParseado: number = unidades !== '' ? parseInt(unidades) : 0;

			const subUnidadesParseado: number =
				subUnidades !== '' ? parseInt(subUnidades) : 0;

			const codigoProducto: number = parseInt(
				codigoProductoConNombre.split(' ')[0]
			);

			const nombreProducto: string = codigoProductoConNombre.substring(
				codigoProducto.toString().length + 1
			);

			const esValidoAgregarProductoAlPedidoCliente: boolean = validarAgregarProductoAlPedidoCliente(
				inputs
			);

			if (!esValidoAgregarProductoAlPedidoCliente) return;

			if (unidadesParseado > 0 || subUnidadesParseado > 0) {
				dispatch(
					agregarProductoAlPedidoDelCliente({
						codigoProducto: codigoProducto,
						nombreProducto: nombreProducto,
						unidades: unidadesParseado,
						subUnidades: subUnidadesParseado,
						total:
							productoActual.precioConImpuestoUnidad * unidadesParseado +
							productoActual.precioConImpuestoSubunidad * subUnidadesParseado,
						tipoPago: 'contado',
					})
				);
			} else dispatch(borrarProductoDelPedidoDelCliente(codigoProducto));

			resetLineaActual();
		},
		[productoActual]
	);
	return agregarProductoAlPedidoActual;
};
