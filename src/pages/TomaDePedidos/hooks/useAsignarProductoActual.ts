import {useCallback} from 'react';
import {TProductoPedidoConPrecios, TProductoPedido} from 'models';
import {useAppSelector} from 'redux/hooks';
import {selectPedidoActual} from 'redux/features/pedidoActual/pedidoActualSlice';

export const useAsignarProductoActual = (
	setProductoActual: any,
	setValue: any
) => {
	const pedidoActual = useAppSelector(selectPedidoActual);
	const asignarProductoActual = useCallback(
		({
			codigoProductoConNombre,
			precioConImpuestoUnidad,
			precioConImpuestoSubunidad,
		}: TProductoPedidoConPrecios) => {
			let nuevoProductoActual: TProductoPedidoConPrecios = {
				codigoProductoConNombre,
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
			setValue('codigoProductoConNombre', codigoProductoConNombre);
			setValue(
				'unidades',
				nuevoProductoActual.unidades !== 0 ? nuevoProductoActual.unidades : ''
			);
			setValue(
				'subUnidades',
				nuevoProductoActual.subUnidades !== 0
					? nuevoProductoActual.subUnidades
					: ''
			);
			setProductoActual(nuevoProductoActual);
		},
		[pedidoActual]
	);
	return asignarProductoActual;
};
