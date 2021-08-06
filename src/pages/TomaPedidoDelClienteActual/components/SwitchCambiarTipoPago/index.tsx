import {FunctionComponent} from 'react';
import {ETiposDePago, TProductoPedido} from 'models';
import {Switch} from '@material-ui/core';
import {useCambiarTipoPago, usePermiteCambiarTipoPago} from './hooks';
import {Center} from 'components/UI';

type Props = {
	producto?: TProductoPedido;
};

export const SwitchCambiarTipoPago: FunctionComponent<Props> = (props) => {
	const {producto} = props;

	const {tipoPago} = {...producto};

	const cambiarTipoPago = useCambiarTipoPago();

	const permiteCambiarTipoPago: boolean = usePermiteCambiarTipoPago();

	return (
		<Center>
			<Switch
				checked={tipoPago === ETiposDePago.Contado}
				onChange={() => cambiarTipoPago(producto)}
				inputProps={{'aria-label': 'secondary checkbox'}}
				size='small'
				disabled={permiteCambiarTipoPago}
			/>
		</Center>
	);
};
