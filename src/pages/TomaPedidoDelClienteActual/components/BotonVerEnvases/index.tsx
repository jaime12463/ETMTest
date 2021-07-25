import {Button} from '@material-ui/core';
import {FunctionComponent} from 'react';
import {useTranslation} from 'react-i18next';

type Props = {};

const BotonVerEnvases: FunctionComponent<Props> = (props) => {
	const {t} = useTranslation();

	return (
		<Button
			variant='contained'
			color='primary'
			data-cy='boton-cerrarPedido'
			onClick={() => {}}
			fullWidth
		>
			{t('verEnvases').toUpperCase()}
		</Button>
	);
};

export default BotonVerEnvases;
