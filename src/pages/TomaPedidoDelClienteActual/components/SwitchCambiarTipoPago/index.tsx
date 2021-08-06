import {FunctionComponent} from 'react';
import {ETiposDePago, TClienteActual, TProductoPedido} from 'models';
import {Switch} from '@material-ui/core';
import {useCambiarTipoPago, usePermiteCambiarTipoPago} from './hooks';
import {Center} from 'components/UI';
import {useObtenerClienteActual} from 'redux/hooks';

type Props = {
	producto?: TProductoPedido;
};

export const SwitchCambiarTipoPago: FunctionComponent<Props> = (props) => {
	const {producto} = props;

	const {tipoPago} = {...producto};

	const cambiarTipoPago = useCambiarTipoPago();

	const permiteCambiarTipoPago: boolean = usePermiteCambiarTipoPago();

	const clienteActual: TClienteActual = useObtenerClienteActual();

	return (
		<Center>
			<Switch
				checked={
					producto
						? tipoPago === ETiposDePago.Credito
						: clienteActual.tipoPagoActual === ETiposDePago.Credito
				}
				onChange={() => cambiarTipoPago(producto)}
				inputProps={{'aria-label': 'secondary checkbox'}}
				size='small'
				disabled={!permiteCambiarTipoPago}
			/>
		</Center>
	);
};
