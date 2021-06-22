import {TInputsFormularioAgregarProducto, TPrecioSinVigencia} from 'models';
import {Dispatch, SetStateAction, useCallback} from 'react';
import {UseFormGetValues, UseFormSetValue} from 'react-hook-form';
import {useAgregarProductoAlPedidoCliente} from '.';

export const useManejadorConfirmarAgregarPedido = (
	setMostarDialogo: Dispatch<SetStateAction<boolean>>,
	productoActual: TPrecioSinVigencia,
	setProductoActual: Dispatch<SetStateAction<TPrecioSinVigencia>>,
	setValue: UseFormSetValue<TInputsFormularioAgregarProducto>,
	getValues: UseFormGetValues<TInputsFormularioAgregarProducto>
) => {
	const agregarProductoAlPedidoCliente = useAgregarProductoAlPedidoCliente(
		productoActual,
		setProductoActual,
		setValue
	);
	const manejadorConfirmarAgregarPedido = useCallback(
		(oprimioBotonAceptar: boolean) => {
			if (oprimioBotonAceptar) {
				const {
					codigoProductoConNombre,
					unidades,
					subUnidades,
					codigoCliente,
					productoABuscar,
				} = getValues();
				agregarProductoAlPedidoCliente({
					codigoCliente,
					unidades,
					subUnidades,
					codigoProductoConNombre,
					productoABuscar,
				});
				setMostarDialogo(false);
			} else setMostarDialogo(false);
		},
		[productoActual]
	);
	return manejadorConfirmarAgregarPedido;
};
