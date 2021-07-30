import {Button} from '@material-ui/core';
import {FunctionComponent} from 'react';
import {useTranslation} from 'react-i18next';
import {useRouteMatch, useHistory} from 'react-router-dom';
import nombresRutas from 'routes/nombresRutas';

type Props = {};

const BotonVerEnvases: FunctionComponent<Props> = (props) => {
	const {t} = useTranslation();
	let {path} = useRouteMatch();
	let history = useHistory();

	return (
		<Button
			variant='contained'
			color='primary'
			data-cy='boton-verEnvases'
			//onClick={() => history.push(`${path}${nombresRutas.envasesRetornables}`)}
			onClick={() => history.push(`${path}${nombresRutas.envasesRetornables}`)}
			fullWidth
		>
			{t('verEnvases').toUpperCase()}
		</Button>
	);
};

export default BotonVerEnvases;
