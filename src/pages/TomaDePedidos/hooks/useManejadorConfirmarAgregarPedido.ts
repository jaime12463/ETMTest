import {TInputsFormularioAgregarProducto, TPrecioSinVigencia} from 'models';
import {useCallback} from 'react';
import {UseFormGetValues} from 'react-hook-form';

export const useManejadorConfirmarAgregarPedido = (
	productoActual: TPrecioSinVigencia,
	getValues: UseFormGetValues<TInputsFormularioAgregarProducto>,
	agregarProductoAlPedidoCliente: (
		inputs: TInputsFormularioAgregarProducto
	) => void
) => {
	const manejadorConfirmarAgregarPedido = useCallback(
		(oprimioBotonAceptar: boolean) => {
			if (oprimioBotonAceptar) {
				const {
					codigoProductoConNombre,
					unidades,
					subUnidades,
					productoABuscar,
				} = getValues();
				agregarProductoAlPedidoCliente({
					unidades,
					subUnidades,
					codigoProductoConNombre,
					productoABuscar,
				});
			}
		},
		[productoActual]
	);
	return manejadorConfirmarAgregarPedido;
};
