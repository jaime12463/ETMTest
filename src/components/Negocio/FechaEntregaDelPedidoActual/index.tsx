import {FunctionComponent} from 'react';
import {Box, Typography} from '@material-ui/core';
import {useObtenerPedidoActual} from 'redux/hooks';
import {useTranslation} from 'react-i18next';
import {Center, Fecha} from 'components/UI';

type Props = {};

const FechaEntregaDelPedidoActual: FunctionComponent<Props> = (props) => {
	const {t} = useTranslation();
	const pedidoActual = useObtenerPedidoActual();
	const {fechaEntrega} = pedidoActual;
	const fechaFormateada = (fecha: string) => {
		const arrayfecha = fecha.split('-');
		return `${arrayfecha[2]}-${arrayfecha[1]}-${arrayfecha[0]}`;
	};
	return (
		<Box mt={1}>
			<Center>
				<Typography variant='body2'>
					{t('general.fechaEntrega')} <Fecha>{fechaEntrega}</Fecha>
				</Typography>
			</Center>
		</Box>
	);
};

export default FechaEntregaDelPedidoActual;
