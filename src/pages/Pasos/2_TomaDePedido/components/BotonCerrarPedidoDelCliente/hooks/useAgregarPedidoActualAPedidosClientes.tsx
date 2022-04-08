import {
	useObtenerClienteActual,
	useObtenerCompromisoDeCobroActual,
	useObtenerVisitaActual,
} from 'redux/hooks';
import {
	TClienteActual,
	TPedido,
	TPedidoClienteParaEnviar,
	TRetornoValidacion,
} from 'models';
import {useCallback} from 'react';
import {
	agregarPedidosCliente,
	guardarCompromisoDecobroCliente,
	agregarIniciativasAlCliente,
	agregarBonificacionesAlCliente,
	agregarCoberturasCumplidasAlCliente,
	guardarPromosOngoing,
} from 'redux/features/pedidosClientes/pedidosClientesSlice';

import {limpiarCompromisoDeCobroActual} from 'redux/features/compromisoDeCobro/compromisoDeCobroSlice';
import {useAppDispatch} from 'redux/hooks';
import {useHistory} from 'react-router-dom';
import {
	useSepararPedidosCreditoContado,
	useValidarCierreVisitaCliente,
} from '.';
import {AvisoIcon} from 'assests/iconos';

export const useAgregarPedidoActualAPedidosClientes = (
	stateConfigAlert: any
) => {
	const dispatch = useAppDispatch();
	const {setConfigAlerta, setAlertaPasos} = stateConfigAlert;
	const clienteActual: TClienteActual = useObtenerClienteActual();
	const compromisoDeCobroActual = useObtenerCompromisoDeCobroActual();
	const history = useHistory();
	const visitaActual = useObtenerVisitaActual();

	const validarCierreDeVisita = useValidarCierreVisitaCliente();

	const separarPedidosCreditoContado = useSepararPedidosCreditoContado();

	const agregarPedidoActualAPedidosClientes = useCallback(() => {
		const pedidosArray: TPedido[] = Object.values(visitaActual.pedidos).map(
			(pedido) => pedido
		);

		const {
			esValido,
			propsAdvertencia,
			iniciativasVerificadas,
			coberturasCumplidas,
		}: TRetornoValidacion = validarCierreDeVisita();

		if (!esValido && propsAdvertencia) {
			const {dataCy, mensaje, manejadorClick, textosBotonesDefault} =
				propsAdvertencia;

			setConfigAlerta({
				titulo: '',
				mensaje: mensaje,
				tituloBotonAceptar: 'Aceptar',
				callbackAceptar: () => {},
				iconoMensaje: <AvisoIcon />,
			});

			return setAlertaPasos(true);
		}

		const pedidosSeparadosCreditoContadoArray: TPedidoClienteParaEnviar[] =
			separarPedidosCreditoContado(pedidosArray);

		dispatch(
			agregarPedidosCliente({
				pedidos: pedidosSeparadosCreditoContadoArray,
				clienteActual,
			})
		);

		dispatch(
			agregarIniciativasAlCliente({
				iniciativas: iniciativasVerificadas,
				clienteActual,
				fechaEntrega: visitaActual.fechaEntrega,
			})
		);

		dispatch(
			agregarBonificacionesAlCliente({
				bonificaciones: visitaActual.bonificaciones,
				clienteActual,
			})
		);

		dispatch(
			agregarCoberturasCumplidasAlCliente({
				coberturasCumplidas,
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

		dispatch(
			guardarPromosOngoing({
				clienteActual,
				promocionesOngoing: visitaActual.promosOngoing,
			})
		);

		history.push('/clientes');
	}, [clienteActual, compromisoDeCobroActual, visitaActual]);
	return agregarPedidoActualAPedidosClientes;
};
