import {Dispatch, SetStateAction, useCallback} from 'react';
import {
	TProductoPedidoConPrecios,
	TProductoPedido,
	TPedidoCliente,
	TInputsFormularioAgregarProducto,
} from 'models';
import {useAppSelector} from 'redux/hooks';
import {selectPedidoActual} from 'redux/features/pedidoActual/pedidoActualSlice';
import {UseFormSetValue} from 'react-hook-form';

export const useAsignarProductoActual = (
	setProductoActual: Dispatch<SetStateAction<TProductoPedidoConPrecios>>,
	setValue: UseFormSetValue<TInputsFormularioAgregarProducto>
) => {
	const pedidoActual: TPedidoCliente = useAppSelector(selectPedidoActual);
	const asignarProductoActual = useCallback(
		({
			codigoProductoConNombre,
			precioConImpuestoUnidad,
			precioConImpuestoSubunidad,
		}: TProductoPedidoConPrecios) => {
			let nuevoProductoActual: TProductoPedidoConPrecios = {
				codigoProductoConNombre,
				codigo:0,
				nombre:'',
				unidades: 0,
				subUnidades: 0,
				precioConImpuestoUnidad: precioConImpuestoUnidad,
				precioConImpuestoSubunidad: precioConImpuestoSubunidad,
			};
			const productoActualEncontrado:
				| TProductoPedido
				| undefined = pedidoActual.productosPedido.find(
				(productoPedido: TProductoPedido) =>
					productoPedido.codigoProductoConNombre === codigoProductoConNombre
			);
			if (productoActualEncontrado) {
				nuevoProductoActual = {
					...productoActualEncontrado,
					precioConImpuestoUnidad,
					precioConImpuestoSubunidad,
				};
			}
			const unidadesParseado: string =
				nuevoProductoActual.unidades !== 0
					? nuevoProductoActual.unidades.toString()
					: '';
			const subUnidadesParseado: string =
				nuevoProductoActual.subUnidades !== 0
					? nuevoProductoActual.subUnidades.toString()
					: '';
			setValue('codigoProductoConNombre', codigoProductoConNombre);
			setValue('unidades', unidadesParseado);
			setValue('subUnidades', subUnidadesParseado);
			setProductoActual(nuevoProductoActual);
		},
		[pedidoActual]
	);
	return asignarProductoActual;
};
