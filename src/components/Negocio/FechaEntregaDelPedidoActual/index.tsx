import {Box, Typography} from '@mui/material';
import {useObtenerPedidoActual} from 'redux/hooks';
import {useTranslation} from 'react-i18next';
import {Center, Fecha} from 'components/UI';

export const FechaEntregaDelPedidoActual: React.VFC = () => {
	const {t} = useTranslation();
	const pedidoActual = useObtenerPedidoActual();
	const {fechaEntrega} = pedidoActual;

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
