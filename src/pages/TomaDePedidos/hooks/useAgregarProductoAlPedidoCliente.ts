import {Dispatch, SetStateAction, useCallback} from 'react';
import {useAppDispatch} from 'redux/hooks';
import {
	agregarProductoAlPedidoDelCliente,
	borrarProductoDelPedidoDelCliente,
} from 'redux/features/pedidoActual/pedidoActualSlice';
import {
	TInputsFormularioAgregarProducto,
	TProductoPedidoConPrecios,
} from 'models';
import {UseFormSetValue} from 'react-hook-form';

export const useAgregarProductoAlPedidoCliente = (
	productoActual: TProductoPedidoConPrecios,
	setProductoActual: Dispatch<SetStateAction<TProductoPedidoConPrecios>>,
	setValue: UseFormSetValue<TInputsFormularioAgregarProducto>
) => {
	const dispatch = useAppDispatch();
	const agregarProductoAlPedidoCliente = useCallback(
		({
			codigoCliente,
			unidades,
			subUnidades,
			codigoProductoConNombre,
		}: TInputsFormularioAgregarProducto) => {
			const unidadesParseado: number = unidades !== '' ? parseInt(unidades) : 0;
			const subUnidadesParseado: number = subUnidades !== '' ? parseInt(subUnidades) : 0;
			if (unidadesParseado > 0 || subUnidadesParseado > 0) {
				dispatch(
					agregarProductoAlPedidoDelCliente({
						productoPedido: {
							codigoProductoConNombre: codigoProductoConNombre,
							unidades: unidadesParseado,
							subUnidades: subUnidadesParseado,
							total:
								productoActual.precioConImpuestoUnidad * unidadesParseado +
								productoActual.precioConImpuestoSubunidad * subUnidadesParseado,
						},
						codigoCliente: codigoCliente,
					})
				);
			} else {
				dispatch(
					borrarProductoDelPedidoDelCliente({
						codigoProductoConNombre: codigoProductoConNombre,
						codigoCliente: codigoCliente,
					})
				);
			}
			setProductoActual({
				codigoProductoConNombre: '',
				codigo:0,
				nombre:'',
				unidades: 0,
				subUnidades: 0,
				precioConImpuestoUnidad: 0,
				precioConImpuestoSubunidad: 0,
			});
			setValue('codigoProductoConNombre', '');
			setValue('unidades', '');
			setValue('subUnidades', '');
		},
		[productoActual]
	);
	return agregarProductoAlPedidoCliente;
};
