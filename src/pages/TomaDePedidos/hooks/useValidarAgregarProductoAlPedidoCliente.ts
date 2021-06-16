import {
	TCliente,
	TInputsFormularioAgregarProducto,
	TProductoPedidoConPrecios,
} from 'models';
import {Dispatch, SetStateAction, useCallback} from 'react';
import {UseFormSetValue} from 'react-hook-form';
import {validarUnidadesMinimasProducto} from 'utils/validaciones';
import {useAgregarProductoAlPedidoCliente, useObtenerClienteActual} from '.';

export const useValidarAgregarProductoAlPedidoCliente = (
	setMostarDialogo: Dispatch<SetStateAction<boolean>>,
	productoActual: TProductoPedidoConPrecios,
	setProductoActual: Dispatch<SetStateAction<TProductoPedidoConPrecios>>,
	setValue: UseFormSetValue<TInputsFormularioAgregarProducto>
) => {
	const agregarProductoAlPedidoCliente = useAgregarProductoAlPedidoCliente(
		productoActual,
		setProductoActual,
		setValue
	);
	const obtenerClienteActual = useObtenerClienteActual();
	const validarAgregarProductoAlPedidoCliente = useCallback(
		({
			codigoCliente,
			unidades,
			subUnidades,
			codigoProductoConNombre,
			productoABuscar,
		}: TInputsFormularioAgregarProducto) => {
			const clienteEncontrado: TCliente | undefined = obtenerClienteActual(
				codigoCliente
			);
			const unidadesParseado: number = unidades !== '' ? parseInt(unidades) : 0;
			if (
				validarUnidadesMinimasProducto(
					unidadesParseado,
					clienteEncontrado.configuracionPedido
				)
			)
				agregarProductoAlPedidoCliente({
					codigoCliente,
					unidades,
					subUnidades,
					codigoProductoConNombre,
					productoABuscar,
				});
			else setMostarDialogo(true);
		},
		[productoActual, obtenerClienteActual, agregarProductoAlPedidoCliente]
	);
	return validarAgregarProductoAlPedidoCliente;
};
