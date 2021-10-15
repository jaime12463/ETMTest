import React from 'react';
import {useTranslation} from 'react-i18next';
import {Estructura, Stepper, BotonBarraInferior} from 'components/UI';
import {ContenedorEnvasesRetornables} from './components';
import {Box} from '@mui/material';
import {useHistory, useRouteMatch} from 'react-router-dom';
import nombresRutas from 'routes/nombresRutas';
import {InfoClienteDelPedidoActual} from 'components/Negocio';
import {useObtenerClienteActual} from 'redux/hooks';
import {TClienteActual} from 'models';

const EnvasesRetornables: React.FC = () => {
	const {t} = useTranslation();
	const history = useHistory();
	let {path} = useRouteMatch();
	const {razonSocial}: TClienteActual = useObtenerClienteActual();

	return <ContenedorEnvasesRetornables />;
};

export default EnvasesRetornables;
