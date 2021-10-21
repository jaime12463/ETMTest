import React from 'react';
import {
	ETiposDePago,
	TClienteActual,
	TProductoPedido,
	TTipoPedido,
} from 'models';
import {Switch} from '@mui/material';
import {useCambiarTipoPago, usePermiteCambiarTipoPago} from './hooks';
import {Center} from 'components/UI';
import {useObtenerClienteActual, useObtenerVisitaActual} from 'redux/hooks';
import {useObtenerDatosTipoPedido} from 'hooks';
import useEstilos, {SwitchProps} from './useEstilos';
import {styled} from '@mui/material/styles';

type Props = {
	producto?: TProductoPedido;
};

const CustomSwitch = styled(Switch)(() => ({
	border: 'none',
	borderRadius: '50px',
	height: '18px',
	padding: '0.6px',
	width: '72px',
	'& .MuiSwitch-switchBase': {
		height: '18px',
		color: '#fff',
		transform: 'translateX(-5px)',
		zIndex: '10',
		'&.Mui-checked': {
			transform: 'translateX(50px)',
		},
	},
	'& .MuiSwitch-track': {
		background: '#FF0000',
		color: '#fff',
		opacity: '1',
	},
	'& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
		backgroundColor: '#00CF91',
		opacity: '1',
	},
	'& .MuiSwitch-switchBase.Mui-disabled+.MuiSwitch-track': {
		opacity: 1,
	},
	'& .MuiSwitch-thumb': {
		color: '#fff',
		width: 18,
		height: 18,
		boxShadow: '0px 0.1px 2.5px rgba(0, 0, 0, 0.5)',
	},
}));

export const SwitchCambiarTipoPago: React.FC<Props> = (props) => {
	const {producto} = props;

	const {tipoPago} = {...producto};

	const cambiarTipoPago = useCambiarTipoPago();

	const permiteCambiarTipoPago: boolean = usePermiteCambiarTipoPago();

	const clienteActual: TClienteActual = useObtenerClienteActual();

	const visitaActual = useObtenerVisitaActual();

	const [mostrarSwitch, setMostrarSwitch] = React.useState<boolean>();

	const obtenerDatosTipoPedido = useObtenerDatosTipoPedido();

	const [switchTipoPago, setSwitchTipoPago] = React.useState<SwitchProps>(
		producto
			? {content: Boolean(producto.tipoPago)}
			: {content: Boolean(clienteActual.tipoPagoActual)}
	);

	const classes = useEstilos(switchTipoPago);

	React.useEffect(() => {
		const datosTipoPedidoActual: TTipoPedido | undefined =
			obtenerDatosTipoPedido();
		setMostrarSwitch(datosTipoPedidoActual?.esValorizado);
	}, [visitaActual.tipoPedidoActual, obtenerDatosTipoPedido]);

	React.useEffect(() => {
		if (producto) {
			setSwitchTipoPago({content: Boolean(clienteActual.tipoPagoActual)});
		}
	}, [clienteActual.tipoPagoActual]);

	return (
		<Center>
			{mostrarSwitch && (
				<CustomSwitch
					checked={
						producto
							? tipoPago === ETiposDePago.Credito
							: clienteActual.tipoPagoActual === ETiposDePago.Credito
					}
					onChange={() => {
						cambiarTipoPago(producto);
						setSwitchTipoPago((prevTipoPago) => ({
							content: producto ? !producto.tipoPago : !prevTipoPago.content,
						}));
					}}
					inputProps={{'aria-label': 'secondary checkbox'}}
					size='small'
					data-cy={
						`switch-cambiar-tipoPago-` + (producto?.codigoProducto ?? ``)
					}
					id={`switch-cambiar-tipoPago-` + (producto?.codigoProducto ?? ``)}
					disabled={!permiteCambiarTipoPago}
					classes={{track: classes.track}}
				/>
			)}
		</Center>
	);
};
