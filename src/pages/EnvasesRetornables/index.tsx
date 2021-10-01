import React from 'react';
import {useTranslation} from 'react-i18next';
import {Estructura, Stepper, BotonBarraInferior} from 'components/UI';
import {ContenedorEnvasesRetornables} from './components';
import {Box} from '@mui/material';
import {useHistory, useRouteMatch} from 'react-router-dom';
import nombresRutas from 'routes/nombresRutas';

const EnvasesRetornables: React.FC = () => {
	const {t} = useTranslation();
	const history = useHistory();
	let {path} = useRouteMatch();

	return (
		<Estructura titulo={t('titulos.envases')} esConFechaHaciaAtras={true}>
			<Estructura.Cuerpo>
				<Box my={3}>
					<Stepper pasoActivo={2} />
				</Box>
				<ContenedorEnvasesRetornables />
			</Estructura.Cuerpo>
			<Estructura.PieDePagina>
				<BotonBarraInferior
					descripcion='Continuar a Toma de pedido'
					numeroItems={130}
					total='1000.00$'
					onClick={() =>
						history.push(`/ingresarPedido${nombresRutas.finalizarPedido}`)
					}
				/>
			</Estructura.PieDePagina>
		</Estructura>
	);
};

export default EnvasesRetornables;
