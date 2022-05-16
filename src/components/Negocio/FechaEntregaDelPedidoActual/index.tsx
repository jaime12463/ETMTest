import { Box, Typography } from '@mui/material';
import { useObtenerPedidoActual } from 'redux/hooks';
import { useTranslation } from 'react-i18next';
import { Center, Fecha } from 'components/UI';

export const FechaEntregaDelPedidoActual: React.VFC = () => {
	const { t } = useTranslation();
	const pedidoActual = useObtenerPedidoActual();
	const { fechaEntrega } = pedidoActual;

	return (
		<Box  
			position='absolute'
			top={54}
			left={14}
			lineHeight={0}
			padding={0}
		>
			<Center>
				<Typography variant='caption' color='#fff'>
					{t('general.fechaEntrega')} <Fecha>{fechaEntrega}</Fecha>
				</Typography>
			</Center>
		</Box>
	);
};
