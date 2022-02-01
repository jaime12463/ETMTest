import {useHistory, useLocation} from 'react-router-dom';
import LogoFemsa from 'assests/images/hdpi_logo_client.png';
import conejoCarga from 'assests/images/conejoCarga.gif';
import nombresRutas from 'routes/nombresRutas';
import {Center, Estructura} from 'components/UI';
import {useInicializarDatosYConfiguracion} from 'hooks';
import Footers from 'assests/images/hdpi_logo_soft_hasar.png';
import {useTranslation} from 'react-i18next';
import {selectConfiguracion} from 'redux/features/configuracion/configuracionSlice';
import {useAppSelector} from 'redux/hooks';
import {selectDatos} from 'redux/features/datos/datosSlice';
import {Box, Typography} from '@mui/material';
import React from 'react';

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
	} else {
		return (
			<Box
				sx={{minWidth: '100vw', minHeight: '100vh', backgroundColor: '#651C32'}}
			>
				<Center>
					<Box>
						<img
							src={conejoCarga}
							alt='logo'
							data-cy='boton-splash'
							style={{width: '188px', height: '169px'}}
						></img>
						<Typography fontFamily={'Poppins'} color='white'>
							Procesando información...{' '}
						</Typography>
					</Box>
				</Center>
			</Box>
		);
	}
}
