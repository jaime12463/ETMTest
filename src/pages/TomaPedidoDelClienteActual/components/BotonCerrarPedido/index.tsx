import {Button} from '@material-ui/core';
import {FunctionComponent} from 'react';
import {useTranslation} from 'react-i18next';

type Props = {};

const BotonCerrarPedido: FunctionComponent<Props> = (props) => {
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
};

export default BotonCerrarPedido;
