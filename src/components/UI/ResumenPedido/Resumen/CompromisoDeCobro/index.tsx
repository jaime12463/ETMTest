import React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import {formatearFecha, formatearNumero} from 'utils/methods';
import {useTranslation} from 'react-i18next';
import {
	useObtenerClienteActual,
	useObtenerCompromisoDeCobroActual,
} from 'redux/hooks';
import {useObtenerDatosCliente} from 'hooks';
import {TCliente} from 'models';
import {useObtenerMontoTotalDocumentos} from 'pages/Pasos/3_Otros/CompromisoDeCobro/hooks';
import theme from 'theme';

export const CompromisoDeCobro: React.FC = () => {
	const {t} = useTranslation();
	const totalDocumentos = useObtenerMontoTotalDocumentos();
	const clienteActual = useObtenerClienteActual();
	const compromisoDeCobro = useObtenerCompromisoDeCobroActual();
	const {obtenerDatosCliente} = useObtenerDatosCliente();
	const datosCliente: TCliente | undefined = obtenerDatosCliente(
		clienteActual.codigoCliente
	);
	const limiteDeCredito: number | undefined =
		datosCliente?.informacionCrediticia.limite;

	const fechaDeHoy = new Date();
	const fechaFormateada = `${fechaDeHoy.getFullYear()}-${
		fechaDeHoy.getMonth() + 1
	}-${fechaDeHoy.getDate()}`;

	return (
		<Box border={`1px solid ${theme.palette.secondary.main}`}>
			<Box display='flex'>
				<Box
					display='flex'
					flex='1'
					flexDirection='column'
					gap='10px'
					padding='8px 8px 8px 14px'
				>
					<Typography variant='caption' fontFamily='Open Sans' color='#000'>
						{t('general.limiteDeCredito')}
					</Typography>
					<Typography variant='caption' fontFamily='Open Sans' color='#000'>
						{t('general.disponible')}
					</Typography>
					<Typography variant='caption' fontFamily='Open Sans' color='#000'>
						{t('general.fechaDeAlta')}
					</Typography>
				</Box>
				<Box
					display='flex'
					flexBasis='143px'
					flexDirection='column'
					gap='10px'
					padding='8px 14px 8px 8px'
					sx={{background: '#F5F0EF'}}
				>
					<Typography variant='caption' fontFamily='Open Sans' color='#000'>
						{formatearNumero(limiteDeCredito ? limiteDeCredito : 0, t)}
					</Typography>
					<Typography variant='caption' fontFamily='Open Sans' color='#000'>
						{formatearNumero(
							limiteDeCredito ? limiteDeCredito - totalDocumentos : 0,
							t
						)}
					</Typography>
					<Typography variant='caption' fontFamily='Open Sans' color='#000'>
						{formatearFecha(fechaFormateada, t)}
					</Typography>
				</Box>
			</Box>
			<Divider sx={{borderColor: theme.palette.secondary.main}} />
			<Box
				alignItems='center'
				display='flex'
				gap='40px'
				justifyContent='end'
				padding='8px 12px'
			>
				<Typography variant='subtitle3' color='#000'>
					{t('general.compromisoCobro')}
				</Typography>
				<Typography variant='subtitle3' color='#000'>
					{formatearNumero(compromisoDeCobro.monto, t)}
				</Typography>
			</Box>
		</Box>
	);
};
