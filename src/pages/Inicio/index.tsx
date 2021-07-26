import {useHistory, useLocation} from 'react-router-dom';
import LogoFemsa from 'assests/images/hdpi_logo_client.png';
import nombresRutas from 'routes/nombresRutas';
import {Center, Estructura} from 'components/UI';
import {useInicializarDatosYConfiguracion} from 'hooks';
import Footers from 'assests/images/hdpi_logo_soft_hasar.png';
import {useTranslation} from 'react-i18next';

export default function Splash() {
	let history = useHistory();

	let query = useLocation();

	const {t} = useTranslation();

	useInicializarDatosYConfiguracion();

	window.localStorage.removeItem('fechaDipostivo');
	query.search &&
		window.localStorage.setItem('fechaDipostivo', query.search.slice(7));

	return (
		<Estructura titulo={t('titulos.bienvenido')} esConFechaHaciaAtras={false}>
			<Estructura.Cuerpo>
				<Center>
					<img
						src={LogoFemsa}
						onClick={() => history.push(nombresRutas.clientes)}
						style={{cursor: 'pointer'}}
						alt='logo'
						data-cy='boton-splash'
					></img>
				</Center>
			</Estructura.Cuerpo>
			<Estructura.PieDePagina>
				<Center>
					<div
						style={{
							background: `url(${Footers}) no-repeat`,
							height: '75px',
							width: '300px',
							position: 'absolute',
							bottom: '0px',
						}}
					></div>
				</Center>
			</Estructura.PieDePagina>
		</Estructura>
	);
}
