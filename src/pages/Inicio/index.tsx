import React from 'react';
import {useHistory} from 'react-router-dom';
import Box from '@material-ui/core/Box';
import LogoFemsa from 'assests/images/hdpi_logo_client.png';
import nombresRutas from 'routes/nombresRutas';
import Estructura from 'components/Estructura';

export default function Splash() {
	let history = useHistory();

	return (
		<Estructura
			titulo={'titulos.bienvenido'}
			esConFechaHaciaAtras={false}
			esConLogoInferior={true}
		>
			<div style={{width: '100%'}}>
				<Box display='flex' justifyContent='center'>
					<img
						src={LogoFemsa}
						onClick={() => history.push(nombresRutas.ingresarpedido)}
						style={{cursor: 'pointer', marginTop: 'calc(100vh - 73vh)'}}
						alt='logo'
						data-cy='boton-splash'
					></img>
				</Box>
			</div>
		</Estructura>
	);
}
