import {FunctionComponent, useEffect, useState} from 'react';
import {
	ETiposDePago,
	TClienteActual,
	TProductoPedido,
	TTipoPedido,
} from 'models';
import {Switch} from '@material-ui/core';
import {useCambiarTipoPago, usePermiteCambiarTipoPago} from './hooks';
import {Center} from 'components/UI';
import {
	useObtenerClienteActual,
	useObtenerConfiguracion,
	useObtenerPedidoActual,
} from 'redux/hooks';

type Props = {
	producto?: TProductoPedido;
};

export const SwitchCambiarTipoPago: FunctionComponent<Props> = (props) => {
	const {producto} = props;

	const {tipoPago} = {...producto};

	const cambiarTipoPago = useCambiarTipoPago();

	const permiteCambiarTipoPago: boolean = usePermiteCambiarTipoPago();

	const clienteActual: TClienteActual = useObtenerClienteActual();

	const {tipoPedidos} = useObtenerConfiguracion();

	const pedidoActual = useObtenerPedidoActual();

	// const datosTipoPedido

	//TODO: Mirar como se debe inicializar tipo de pedido

	const [mostrarSwitch, setMostrarSwitch] = useState<boolean>();

	useEffect(() => {
		console.log(pedidoActual.tipoPedido, 'pedidoActual.tipoPedido');
		const datosTipoPedidoActual: TTipoPedido | undefined = tipoPedidos.find(
			(tipoPedido) => tipoPedido.codigo === pedidoActual.tipoPedido
		);
		console.log(datosTipoPedidoActual, 'datosTipoPedidoActual');
		setMostrarSwitch(datosTipoPedidoActual?.esValorizado);
	}, [pedidoActual.tipoPedido]);

	return (
		<Center>
			{mostrarSwitch && (
				<Switch
					checked={
						producto
							? tipoPago === ETiposDePago.Credito
							: clienteActual.tipoPagoActual === ETiposDePago.Credito
					}
					onChange={() => cambiarTipoPago(producto)}
					inputProps={{'aria-label': 'secondary checkbox'}}
					size='small'
					data-cy={
						`switch-cambiar-tipoPago-` + (producto?.codigoProducto ?? ``)
					}
					id={`switch-cambiar-tipoPago-` + (producto?.codigoProducto ?? ``)}
					disabled={!permiteCambiarTipoPago}
				/>
			)}
		</Center>
	);
};
