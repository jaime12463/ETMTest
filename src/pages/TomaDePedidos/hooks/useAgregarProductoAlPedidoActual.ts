import {useCallback} from 'react';
import {useAppDispatch} from 'redux/hooks';
import {
	agregarProductoAlPedidoDelCliente,
	borrarProductoDelPedidoDelCliente,
} from 'redux/features/pedidoActual/pedidoActualSlice';
import {TInputsFormularioAgregarProducto, TPrecioSinVigencia} from 'models';

export const useAgregarProductoAlPedidoActual = (
	productoActual: TPrecioSinVigencia,
	resetLineaActual: () => void
) => {
	const dispatch = useAppDispatch();
	const agregarProductoAlPedidoActual = useCallback(
		({
			unidades,
			subUnidades,
			codigoProductoConNombre,
		}: TInputsFormularioAgregarProducto) => {
			const unidadesParseado: number = unidades !== '' ? parseInt(unidades) : 0;
			const subUnidadesParseado: number =
				subUnidades !== '' ? parseInt(subUnidades) : 0;
			const codigoProducto: number = parseInt(
				codigoProductoConNombre.split(' ')[0]
			);
			const nombreProducto: string = codigoProductoConNombre.substring(
				codigoProducto.toString().length + 1
			);
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
						codigoImplicito1: productoActual.codigoImplicito1,
						nombreImplicito1: productoActual.nombreImplicito1,
						codigoImplicito2: productoActual.codigoImplicito2,
						nombreImplicito2: productoActual.nombreImplicito2,
					})
				);
			} else dispatch(borrarProductoDelPedidoDelCliente(codigoProducto));
			resetLineaActual();
		},
		[productoActual]
	);
	return agregarProductoAlPedidoActual;
};
