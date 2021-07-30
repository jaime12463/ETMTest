import {SetStateAction, useCallback} from 'react';
import {useAppDispatch} from 'redux/hooks';
import {
	agregarProductoAlPedidoDelCliente,
	borrarProductoDelPedidoDelCliente,
} from 'redux/features/pedidoActual/pedidoActualSlice';
import {
	InputsKeys,
	TFunctionMostarAvertenciaPorDialogo,
	TInputsFormularioAgregarProducto,
	TPrecioSinVigencia,
} from 'models';
import {useValidarAgregarProductoAlPedidoCliente} from '.';
import {Dispatch} from 'react';

export const useAgregarProductoAlPedidoActual = (
	productoActual: TPrecioSinVigencia,
	resetLineaActual: () => void,
	mostrarAdvertenciaEnDialogo: TFunctionMostarAvertenciaPorDialogo,
	inputFocus: InputsKeys,
	setInputFocus: Dispatch<SetStateAction<InputsKeys>>
) => {
	const dispatch = useAppDispatch();

	const validarAgregarProductoAlPedidoCliente = useValidarAgregarProductoAlPedidoCliente(
		mostrarAdvertenciaEnDialogo,
		inputFocus,
		setInputFocus
	);

	const agregarProductoAlPedidoActual = useCallback(
		(inputs: TInputsFormularioAgregarProducto) => {
			const {unidades, subUnidades, codigoProductoConNombre} = inputs;

			const unidadesParseado: number = unidades !== '' ? parseInt(unidades) : 0;

			const subUnidadesParseado: number =
				subUnidades !== '' ? parseInt(subUnidades) : 0;

			const codigoProducto: number = parseInt(
				codigoProductoConNombre.split(' ')[0]
			);

			const nombreProducto: string = codigoProductoConNombre.substring(
				codigoProducto.toString().length + 1
			);

			const esValidoAgregarProductoAlPedidoCliente: boolean = validarAgregarProductoAlPedidoCliente(
				inputs
			);

			if (!esValidoAgregarProductoAlPedidoCliente) return;

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

			setInputFocus('productoABuscar');

			resetLineaActual();
		},
		[
			productoActual,
			validarAgregarProductoAlPedidoCliente,
			dispatch,
			setInputFocus,
		]
	);
	return agregarProductoAlPedidoActual;
};
