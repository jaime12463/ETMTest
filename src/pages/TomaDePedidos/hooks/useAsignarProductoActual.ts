import {Dispatch, SetStateAction, useCallback} from 'react';
import {
	TPrecioSinVigencia,
	TProductoPedido,
	TPedidoActual,
	TInputsFormularioAgregarProducto,
} from 'models';
import {useAppSelector} from 'redux/hooks';
import {selectPedidoActual} from 'redux/features/pedidoActual/pedidoActualSlice';
import {UseFormSetValue} from 'react-hook-form';

export const useAsignarProductoActual = (
	setProductoActual: Dispatch<SetStateAction<TPrecioSinVigencia>>,
	setValue: UseFormSetValue<TInputsFormularioAgregarProducto>
) => {
	const pedidoActual: TPedidoActual = useAppSelector(selectPedidoActual);
	const asignarProductoActual = useCallback(
		({
			codigoProductoConNombre,
			precioConImpuestoUnidad,
			precioConImpuestoSubunidad,
			codigoImplicito1,
			nombreImplicito1,
			codigoImplicito2,
			nombreImplicito2,
		}: TPrecioSinVigencia) => {
			const codigoProducto: number = parseInt(
				codigoProductoConNombre.split(' ')[0]
			);
			const productoActualEncontrado:
				| TProductoPedido
				| undefined = pedidoActual.productosPedido.find(
				(productoPedido: TProductoPedido) =>
					productoPedido.codigoProducto === codigoProducto
			);
			let unidadesParseado: string = '';
			let subUnidadesParseado: string = '';
			if (productoActualEncontrado) {
				unidadesParseado =
					productoActualEncontrado.unidades !== 0
						? productoActualEncontrado.unidades.toString()
						: '';
				subUnidadesParseado =
					productoActualEncontrado.subUnidades !== 0
						? productoActualEncontrado.subUnidades.toString()
						: '';
			}
			setValue('codigoProductoConNombre', codigoProductoConNombre);
			setValue('unidades', unidadesParseado);
			setValue('subUnidades', subUnidadesParseado);
			setProductoActual({
				codigoProductoConNombre,
				precioConImpuestoUnidad,
				precioConImpuestoSubunidad,
				codigoImplicito1,
				nombreImplicito1,
				codigoImplicito2,
				nombreImplicito2,
			});
		},
		[pedidoActual]
	);
	return asignarProductoActual;
};
