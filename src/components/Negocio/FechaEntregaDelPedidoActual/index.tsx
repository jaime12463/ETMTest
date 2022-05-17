import {Typography} from '@mui/material';
import {useObtenerPedidoActual} from 'redux/hooks';
import {useTranslation} from 'react-i18next';
import {formatearFechaIntl} from 'utils/methods';

export const FechaEntregaDelPedidoActual: React.VFC = () => {
	const {t} = useTranslation();
	const pedidoActual = useObtenerPedidoActual();
	const {fechaEntrega} = pedidoActual;

	const fechaFormateada = formatearFechaIntl(fechaEntrega);

	return (
		<Typography variant='caption' color='#fff'>
			{`${t('general.fechaEntrega')}: ${fechaFormateada}`}
		</Typography>
	);
};
