import React from 'react';
import {
	ETiposDePago,
	TClienteActual,
	TProductoPedido,
	TTipoPedido,
} from 'models';
import {Box, Chip, Switch, Typography} from '@mui/material';
import {useCambiarTipoPago, usePermiteCambiarTipoPago} from './hooks';
import {Center} from 'components/UI';
import {useObtenerClienteActual, useObtenerVisitaActual} from 'redux/hooks';
import {useObtenerDatosCliente, useObtenerDatosTipoPedido} from 'hooks';
import useEstilos, {SwitchProps} from './useEstilos';
import {styled} from '@mui/material/styles';
import theme from 'theme';
import {useTranslation} from 'react-i18next';

type Props = {
	producto?: TProductoPedido;
	setPromoPushTemporal?: React.Dispatch<React.SetStateAction<ETiposDePago>>;
	promoPushTemporal?: ETiposDePago;
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
		background: `${theme.palette.secondary.dark}`,
		color: '#fff',
		opacity: '1',
	},
	'& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
		backgroundColor: `${theme.palette.success.dark}`,
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
	const {producto, setPromoPushTemporal, promoPushTemporal} = props;

	const {tipoPago} = {...producto};

	const cambiarTipoPago = useCambiarTipoPago();

	const permiteCambiarTipoPago: boolean = usePermiteCambiarTipoPago();

	const clienteActual: TClienteActual = useObtenerClienteActual();
	const {obtenerDatosCliente} = useObtenerDatosCliente();
	const datosCliente = obtenerDatosCliente(clienteActual.codigoCliente);
	if (!datosCliente) return <></>;
	const visitaActual = useObtenerVisitaActual();

	const [mostrarSwitch, setMostrarSwitch] = React.useState<boolean>();

	const [mostrarTag, setMostrarTag] = React.useState<boolean>(false);
	const obtenerDatosTipoPedido = useObtenerDatosTipoPedido();
	const {t} = useTranslation();

	const ChipStyled = styled(Chip)(() => ({
		background: clienteActual.tipoPagoActual ? '#009D63' : '#2F000E',
		color: '#fff',
		width: '66px',
		height: '18px',
		'&.MuiChip-sizeSmall': {},
	}));

	const {esCreditoBloqueado} = datosCliente?.informacionCrediticia;

	const [switchTipoPago, setSwitchTipoPago] = React.useState<SwitchProps>(
		() => {
			if (producto) {
				return {
					content: Boolean(tipoPago),
					texto: tipoPago ? t('general.credito') : t('general.contado'),
				};
			}
			if (promoPushTemporal) {
				return {
					content: Boolean(promoPushTemporal),
					texto: tipoPago ? t('general.credito') : t('general.contado'),
				};
			}

			return {
				content: Boolean(clienteActual.tipoPagoActual),
				texto: Boolean(clienteActual.tipoPagoActual)
					? t('general.credito')
					: t('general.contado'),
			};
		}
	);

	const classes = useEstilos(switchTipoPago);

	React.useEffect(() => {
		const datosTipoPedidoActual: TTipoPedido | undefined =
			obtenerDatosTipoPedido();
		let puedeMostrarSwitch = datosTipoPedidoActual?.esValorizado
			? clienteActual.condicion === 'contado'
				? () => {
						setMostrarTag(true);
						return false;
				  }
				: clienteActual.condicion === 'creditoFormal'
				? () => {
						setMostrarTag(true);
						return false;
				  }
				: esCreditoBloqueado
				? () => {
						setMostrarTag(true);
						return false;
				  }
				: true
			: () => {
					setMostrarTag(true);
					return false;
			  };

		setMostrarSwitch(puedeMostrarSwitch);
	}, [visitaActual.tipoPedidoActual, obtenerDatosTipoPedido]);

	React.useEffect(() => {
		if (producto) {
			return setSwitchTipoPago({
				content: Boolean(producto.tipoPago),
				texto: producto.tipoPago ? t('general.credito') : t('general.contado'),
			});
		}
		if (promoPushTemporal) {
			return setSwitchTipoPago({
				content: Boolean(promoPushTemporal),
				texto: promoPushTemporal ? t('general.credito') : t('general.contado'),
			});
		}
	}, [clienteActual.tipoPagoActual, promoPushTemporal, producto]);

	return (
		<Box>
			{mostrarSwitch && (
				<CustomSwitch
					checked={switchTipoPago.content}
					onChange={() => {
						cambiarTipoPago(producto, setPromoPushTemporal);
						setSwitchTipoPago((prevTipoPago) => {
							if (producto) {
								return {
									content: !producto.tipoPago,
									texto: producto.tipoPago
										? t('general.contado')
										: t('general.credito'),
								};
							}
							if (promoPushTemporal) {
								return {
									content: !promoPushTemporal,
									texto: promoPushTemporal
										? t('general.contado')
										: t('general.credito'),
								};
							}
							return {
								content: !prevTipoPago.content,
								texto: prevTipoPago.content
									? t('general.contado')
									: t('general.credito'),
							};
						});
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
			{mostrarTag && !producto && (
				<ChipStyled
					size='small'
					label={
						<Typography
							fontSize={'10px'}
							fontFamily='Open Sans'
							fontWeight={'400'}
						>
							{clienteActual.tipoPagoActual
								? t('general.credito')
								: t('general.contado')}
						</Typography>
					}
				/>
			)}
		</Box>
	);
};
