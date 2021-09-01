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
import {useObtenerClienteActual, useObtenerVisitaActual} from 'redux/hooks';
import {useObtenerDatosTipoPedido} from 'hooks';

type Props = {
	producto?: TProductoPedido;
};

export const SwitchCambiarTipoPago: FunctionComponent<Props> = (props) => {
	const {producto} = props;

	const {tipoPago} = {...producto};

	const cambiarTipoPago = useCambiarTipoPago();

	const permiteCambiarTipoPago: boolean = usePermiteCambiarTipoPago();

	const clienteActual: TClienteActual = useObtenerClienteActual();

	const visitaActual = useObtenerVisitaActual();

	const [mostrarSwitch, setMostrarSwitch] = useState<boolean>();

	const obtenerDatosTipoPedido = useObtenerDatosTipoPedido();

	useEffect(() => {
		const datosTipoPedidoActual:
			| TTipoPedido
			| undefined = obtenerDatosTipoPedido();
		setMostrarSwitch(datosTipoPedidoActual?.esValorizado);
	}, [visitaActual.tipoPedidoActual, obtenerDatosTipoPedido]);

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
