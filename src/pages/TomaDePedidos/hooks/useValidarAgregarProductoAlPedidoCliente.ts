import {TCliente} from 'models';
import {useCallback} from 'react';
import {validarUnidadesMinimasProducto} from 'utils/validaciones';
import {useAgregarProductoAlPedidoCliente, useObtenerClienteActual} from '.';

export const useValidarAgregarProductoAlPedidoCliente = (
	setMostarDialogo: any,
	productoActual: any,
	setProductoActual: any,
	setValue: any
) => {
	const agregarProductoAlPedidoCliente = useAgregarProductoAlPedidoCliente(
		productoActual,
		setProductoActual,
		setValue
	);
	const obtenerClienteActual = useObtenerClienteActual();
	const validarAgregarProductoAlPedidoCliente = useCallback(
		({codigoCliente, unidades, subUnidades, codigoProducto}: any) => {
			const clienteEncontrado: TCliente | undefined = obtenerClienteActual(
				codigoCliente
			);
			if (
				validarUnidadesMinimasProducto(
					unidades,
					clienteEncontrado.configuracionPedido
				)
			)
				agregarProductoAlPedidoCliente({
					codigoCliente,
					unidades,
					subUnidades,
					codigoProducto,
				});
			else setMostarDialogo(true);
		},
		[productoActual]
	);
	return validarAgregarProductoAlPedidoCliente;
};
