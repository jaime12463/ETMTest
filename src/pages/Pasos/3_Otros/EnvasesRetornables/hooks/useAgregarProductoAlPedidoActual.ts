import {useCallback, useState} from 'react';
import {
	useAppDispatch,
	useObtenerClienteActual,
	useObtenerConfiguracion,
	useObtenerPedidoActual,
	useObtenerVisitaActual,
} from 'redux/hooks';
import {
	agregarEnvaseDelPedidoActual,
	borrarProductoDelPedidoActual,
} from 'redux/features/visitaActual/visitaActualSlice';
import {
	TClienteActual,
	TFormTomaDePedido,
	TPedido,
	TPrecioProducto,
	ETiposDePago,
} from 'models';

export const useAgregarProductoAlPedidoActual = () => {
	const dispatch = useAppDispatch();

	const agregarProductoAlPedidoActual = useCallback(
		(
			productoActual: TPrecioProducto | undefined,
			unidades: number,
			subUnidades: number,
			tipoPago: ETiposDePago | undefined,
			codigoTipoPedidoActual: string | undefined
		) => {
			if (!productoActual || !tipoPago || !codigoTipoPedidoActual) return;

			const {codigoProducto} = productoActual;

			if (unidades > 0 || subUnidades > 0) {
				dispatch(
					agregarEnvaseDelPedidoActual({
						productoPedido: {
							...productoActual,
							unidades: unidades,
							subUnidades: subUnidades,
							total:
								productoActual.precioConImpuestoUnidad * unidades +
								productoActual.precioConImpuestoSubunidad * subUnidades,
							tipoPago: tipoPago,
							catalogoMotivo: '',
						},
						codigoTipoPedidoActual,
					})
				);
			} else {
				dispatch(borrarProductoDelPedidoActual({codigoProducto}));
			}
		},
		[dispatch]
	);
	return agregarProductoAlPedidoActual;
};
