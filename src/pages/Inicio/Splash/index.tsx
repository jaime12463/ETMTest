import {useHistory, useLocation} from 'react-router-dom';
import LogoFemsa from 'assests/images/hdpi_logo_client.png';
import nombresRutas from 'routes/nombresRutas';
import {Center, Estructura} from 'components/UI';
import {useInicializarDatosYConfiguracion} from 'hooks';
import Footers from 'assests/images/hdpi_logo_soft_hasar.png';
import {useTranslation} from 'react-i18next';
import {selectConfiguracion} from 'redux/features/configuracion/configuracionSlice';
import {useAppSelector} from 'redux/hooks';
import {selectDatos} from 'redux/features/datos/datosSlice';
import React from 'react';
import {Loading} from '../../../components/UI';

export default function Splash() {
	const history = useHistory();
	const querys: any = useLocation();
	const {t, i18n} = useTranslation();
	const query: string[] = querys.search.split('&');
	const [cargador, setCargador] = React.useState<boolean>(true);

	const configFetch = useAppSelector(selectConfiguracion);
	const datosFetch = useAppSelector(selectDatos);
	const tiempoCargador = setTimeout(() => setCargador(false), 2000);

	useInicializarDatosYConfiguracion();
	window.localStorage.removeItem('fechaDipostivo');
	querys.search &&
		window.localStorage.setItem('fechaDipostivo', query[0].slice(7)),
		i18n.changeLanguage(query[1]?.slice(9));

	if (
		(datosFetch.estado === 0 && !cargador) ||
		(configFetch.estado === 0 && !cargador)
	) {
		return (
			<Estructura titulo={t('titulos.bienvenido')} esConFechaHaciaAtras={false}>
				<Estructura.Cuerpo>
					<Center>
						<img
							src={LogoFemsa}
							onClick={() => history.push(nombresRutas.clientes)}
							style={{
								cursor: 'pointer',
								position: 'fixed',
								top: '50%',
								left: '50%',
								transform: 'translate(-50%, -50%)',
							}}
							alt='Logo Coca Cola Femsa'
							data-cy='boton-splash'
						/>
					</Center>
				</Estructura.Cuerpo>
				<Estructura.PieDePagina>
					<Center>
						<img src={Footers} alt='Logo Hasar' />
					</Center>
				</Estructura.PieDePagina>
			</Estructura>
		);
	} else {
		return <Loading />;
	}
}
