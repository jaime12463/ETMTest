import {Button} from '@material-ui/core';
import {useTranslation} from 'react-i18next';

export function BotonCerrarPedidoDelCliente() {
	const {t} = useTranslation();
	return (
		<Button
			variant='contained'
			color='primary'
			data-cy='boton-cerrarPedido'
			onClick={() => {}}
			fullWidth
		>
			{t('general.cerrarPedido').toUpperCase()}
		</Button>
	);
}