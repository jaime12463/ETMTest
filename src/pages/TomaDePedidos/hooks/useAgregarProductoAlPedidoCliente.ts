import {useCallback} from 'react';
import {useAppDispatch} from 'redux/hooks';
import {
	agregarProductoAlPedidoDelCliente,
	borrarProductoDelPedidoDelCliente,
} from 'redux/features/pedidoActual/pedidoActualSlice';
import {TInputsFormularioAgregarProducto, TPrecioSinVigencia} from 'models';

export const useAgregarProductoAlPedidoCliente = (
	productoActual: TPrecioSinVigencia,
	resetLineaActual: any
) => {
	const dispatch = useAppDispatch();
	const agregarProductoAlPedidoCliente = useCallback(
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
					})
				);
			} else dispatch(borrarProductoDelPedidoDelCliente(codigoProducto));
			resetLineaActual();
		},
		[productoActual]
	);
	return agregarProductoAlPedidoCliente;
};
