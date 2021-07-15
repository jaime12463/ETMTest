import {useHistory, useLocation} from 'react-router-dom';
import Box from '@material-ui/core/Box';
import LogoFemsa from 'assests/images/hdpi_logo_client.png';
import nombresRutas from 'routes/nombresRutas';
import Estructura from 'components/Estructura';
import {useInicializarDatosYConfiguracion} from 'hooks';
import Footers from 'assests/images/hdpi_logo_soft_hasar.png';

export default function Splash() {
	let history = useHistory();
	let query = useLocation();

	useInicializarDatosYConfiguracion();

	localStorage.removeItem('fechaDipostivo');
	query.search && localStorage.setItem('fechaDipostivo', query.search);

	return (
		<Estructura
			titulo={'titulos.bienvenido'}
			esConFechaHaciaAtras={false}
		>
			<Estructura.Cuerpo>
				<Box display='flex' justifyContent='center'>
					<img
						src={LogoFemsa}
						onClick={() => history.push(nombresRutas.clientes)}
						style={{cursor: 'pointer', marginTop: 'calc(100vh - 73vh)'}}
						alt='logo'
						data-cy='boton-splash'
					></img>
				</Box>
			</Estructura.Cuerpo>
			<Estructura.PieDePagina>
				<Box display='flex' justifyContent='center'>
					<div
						style={{
							background: `url(${Footers}) no-repeat`,
							height: '75px',
							width: '300px',
							position: 'absolute',
							bottom: '0px',
						}}
					></div>
				</Box>
			</Estructura.PieDePagina>
		</Estructura>
	);
}
