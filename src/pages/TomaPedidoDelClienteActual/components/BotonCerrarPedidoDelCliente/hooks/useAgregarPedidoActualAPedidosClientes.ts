import {
	useObtenerClienteActual,
	useObtenerCompromisoDeCobroActual,
	useObtenerVisitaActual,
} from 'redux/hooks';
import {
	TClienteActual,
	TFunctionMostarAvertenciaPorDialogo,
	TPedido,
	TPedidoClienteParaEnviar,
	TRetornoValidacion,
} from 'models';
import {useCallback} from 'react';
import {
	agregarPedidosCliente,
	guardarCompromisoDecobroCliente,
} from 'redux/features/pedidosClientes/pedidosClientesSlice';

import {limpiarCompromisoDeCobroActual} from 'redux/features/compromisoDeCobro/compromisoDeCobroSlice';
import {useAppDispatch} from 'redux/hooks';
import {useHistory} from 'react-router-dom';
import {
	useSepararPedidosCreditoContado,
	useValidarAgregarPedidosAPedidosCliente,
} from '.';

export const useAgregarPedidoActualAPedidosClientes = (
	mostrarAdvertenciaEnDialogo: TFunctionMostarAvertenciaPorDialogo
) => {
	const dispatch = useAppDispatch();
	const clienteActual: TClienteActual = useObtenerClienteActual();
	const compromisoDeCobroActual = useObtenerCompromisoDeCobroActual();
	const history = useHistory();
	const visitaActual = useObtenerVisitaActual();

	const validarAgregarPedidosAPedidosCliente = useValidarAgregarPedidosAPedidosCliente();

	const separarPedidosCreditoContado = useSepararPedidosCreditoContado();

	const agregarPedidoActualAPedidosClientes = useCallback(() => {
		const pedidosArray: TPedido[] = Object.values(visitaActual.pedidos).map(
			(pedido) => pedido
		);

		console.log(pedidosArray);

		const {
			esValido,
			propsAdvertencia,
		}: TRetornoValidacion = validarAgregarPedidosAPedidosCliente();

		if (!esValido && propsAdvertencia) {
			const {
				dataCy,
				mensaje,
				manejadorClick,
				textosBotonesDefault,
			} = propsAdvertencia;
			mostrarAdvertenciaEnDialogo(
				mensaje,
				dataCy,
				manejadorClick,
				textosBotonesDefault
			);
			return;
		}

		const pedidosSeparadosCreditoContadoArray: TPedidoClienteParaEnviar[] = separarPedidosCreditoContado(
			pedidosArray
		);

		console.log(pedidosSeparadosCreditoContadoArray);

		dispatch(
			agregarPedidosCliente({
				pedidos: pedidosSeparadosCreditoContadoArray,
				clienteActual,
			})
		);

		if (compromisoDeCobroActual.monto > 0) {
			dispatch(
				guardarCompromisoDecobroCliente({
					compromisoDeCobroActual,
					clienteActual,
				})
			);

			dispatch(limpiarCompromisoDeCobroActual());
		}

		history.goBack();
	}, [clienteActual, compromisoDeCobroActual, visitaActual]);
	return agregarPedidoActualAPedidosClientes;
};
