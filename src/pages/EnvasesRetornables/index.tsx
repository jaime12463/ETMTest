import React from 'react';
import {useTranslation} from 'react-i18next';
import {Estructura, Stepper, BotonBarraInferior} from 'components/UI';
import {ContenedorEnvasesRetornables} from './components';
import {Box} from '@mui/material';
import {useHistory, useRouteMatch} from 'react-router-dom';
import nombresRutas from 'routes/nombresRutas';
import {InfoClienteDelPedidoActual} from 'components/Negocio';
import {useObtenerClienteActual} from '../../redux/hooks'
import { TClienteActual } from 'models';

const EnvasesRetornables: React.FC = () => {
	const {t} = useTranslation();
	const history = useHistory();
	let {path} = useRouteMatch();
	const {razonSocial}: TClienteActual = useObtenerClienteActual()

	return (
		<Estructura>
				<Estructura.Encabezado esConFechaHaciaAtras={true} titulo={razonSocial}>
					<InfoClienteDelPedidoActual />
				</Estructura.Encabezado>
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
