import {
	TFormTomaDePedido,
	TPrecioProducto,
	TClienteActual,
	TStateInputFocus,
} from 'models';
import {useCallback} from 'react';
import {UseFormGetValues} from 'react-hook-form';
import {
	editarProductoDelPedidoActual,
	agregarProductoDelPedidoActual,
} from 'redux/features/visitaActual/visitaActualSlice';
import {useAppDispatch} from 'redux/hooks';

export const useManejadorConfirmarAgregarPedido = (
	productoActual: TPrecioProducto | null,
	clienteActual: TClienteActual,
	getValues: UseFormGetValues<TFormTomaDePedido>,
	resetLineaActual: () => void
) => {
	const dispatch = useAppDispatch();

	const manejadorConfirmarAgregarPedido = useCallback(
		(oprimioBotonAceptar: boolean) => {
			if (oprimioBotonAceptar) {
				const {unidades, subUnidades, catalogoMotivo} = getValues();

				const unidadesParseado: number =
					unidades !== '' ? parseInt(unidades) : 0;

				const subUnidadesParseado: number =
					subUnidades !== '' ? parseInt(subUnidades) : 0;

				if (!productoActual) return;

				dispatch(
					agregarProductoDelPedidoActual({
						productoPedido: {
							...productoActual,
							unidades: unidadesParseado,
							subUnidades: subUnidadesParseado,
							total:
								productoActual.precioConImpuestoUnidad * unidadesParseado +
								productoActual.precioConImpuestoSubunidad * subUnidadesParseado,
							tipoPago: clienteActual.tipoPagoActual,
							catalogoMotivo,
							estado: 'activo',
							preciosBase: {
								unidad: productoActual.precioConImpuestoUnidad,
								subUnidad: productoActual.precioConImpuestoSubunidad,
							},
							preciosNeto: {
								unidad: productoActual.precioConImpuestoUnidad,
								subUnidad: productoActual.precioConImpuestoSubunidad,
							},
							preciosPromo: {
								unidad: 0,
								subUnidad: 0,
							},
						},
					})
				);

				resetLineaActual();
			}
		},
		[productoActual]
	);
	return manejadorConfirmarAgregarPedido;
};
