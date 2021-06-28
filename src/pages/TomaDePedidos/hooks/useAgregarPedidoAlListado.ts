import {useCalcularTotalPedido} from 'hooks';
import {
	TInputsFormularioAgregarProducto,
	TPedidoCliente,
	TTotalPedido,
} from 'models';
import {Dispatch, SetStateAction, useCallback} from 'react';
import {
	selectPedidoActual,
	resetearPedidoActual,
} from 'redux/features/pedidoActual/pedidoActualSlice';
import {selectPedidosClientes} from 'redux/features/pedidosClientes/pedidosClientesSlice';
import {agregarPedidoCliente} from 'redux/features/pedidosClientes/pedidosClientesSlice';
import {useAppDispatch, useAppSelector} from 'redux/hooks';
import {
	validarMontoMinimoPedido,
	validarEsMasDelTotalMontoMaximo,
} from 'utils/validaciones';
import {useObtenerClienteActual} from '.';
import {Props as PropsDialogo} from 'components/Dialogo';
import {useTranslation} from 'react-i18next';
import {UseFormSetValue} from 'react-hook-form';

export const useAgregarPedidoAlListado = (
	setMostarDialogo: Dispatch<SetStateAction<boolean>>,
	setParametrosDialogo: Dispatch<SetStateAction<PropsDialogo>>,
	setExisteCliente: Dispatch<SetStateAction<boolean | null>>,
	setValue: UseFormSetValue<TInputsFormularioAgregarProducto>,
	setAvisoPedidoGuardadoExitoso: Dispatch<SetStateAction<boolean>>
) => {
	const dispatch = useAppDispatch();
	const totalPedido: TTotalPedido = useCalcularTotalPedido();
	const pedidoActual: TPedidoCliente = useAppSelector(selectPedidoActual);
	const PedidosClientes = useAppSelector(selectPedidosClientes);
	const {t} = useTranslation();
	const obtenerClienteActual = useObtenerClienteActual();
	const agregarPedidoAlListado = useCallback(() => {
		const clienteActual = obtenerClienteActual(pedidoActual.codigoCliente);
		const esValidoMontoMinidoPedido: boolean = validarMontoMinimoPedido(
			totalPedido.totalPrecio,
			clienteActual.configuracionPedido
		);
		const esMasDelTotalMontoMaximo: boolean = validarEsMasDelTotalMontoMaximo(
			pedidoActual.fechaEntrega,
			totalPedido.totalPrecio,
			PedidosClientes[pedidoActual.codigoCliente],
			clienteActual.configuracionPedido.montoVentaMaxima
		);

		if (!esValidoMontoMinidoPedido) {
			setParametrosDialogo({
				mensaje: t('advertencias.pedidoMinimo', {
					monto: clienteActual.configuracionPedido.montoVentaMinima,
				}),
				manejadorClick: () => setMostarDialogo(false),
				conBotonCancelar: false,
			});
			setMostarDialogo(true);
			return;
		}

		if (esMasDelTotalMontoMaximo) {
			setParametrosDialogo({
				mensaje: t('advertencias.masDelMontoMaximo', {
					fechaDeEntrega: pedidoActual.fechaEntrega,
					montoVentaMaxima: clienteActual.configuracionPedido.montoVentaMaxima,
				}),
				manejadorClick: () => setMostarDialogo(false),
				conBotonCancelar: false,
			});
			setMostarDialogo(true);
			return;
		}
		dispatch(agregarPedidoCliente(pedidoActual));
		dispatch(resetearPedidoActual());
		setExisteCliente(null);
		setValue('codigoCliente', '');
		setAvisoPedidoGuardadoExitoso(true);
		//TODO: Mirar si es necesario resetear pedidoActual
	}, [pedidoActual, totalPedido, t]);
	return agregarPedidoAlListado;
};
