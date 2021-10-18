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
	return <ContenedorEnvasesRetornables />;
};

export default EnvasesRetornables;
