import {FunctionComponent} from 'react';
import {Box, Typography} from '@material-ui/core';
import {useObtenerPedidoActual} from 'redux/hooks';
import {useTranslation} from 'react-i18next';
import {Center} from 'components/UI';

type Props = {};

const FechaEntregaDelPedidoActual: FunctionComponent<Props> = (props) => {
	const {t} = useTranslation();
	const pedidoActual = useObtenerPedidoActual();
	const {fechaEntrega} = pedidoActual;
	return (
		<Box mt={1}>
			<Center>
				<Typography variant='body2'>
					{t('general.fechaEntrega')}: {fechaEntrega}
				</Typography>
			</Center>
		</Box>
	);
};

export default FechaEntregaDelPedidoActual;
