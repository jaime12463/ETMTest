import React from 'react';
import {TCliente, TClienteActual} from 'models';
import {
	useMostrarAdvertenciaEnDialogo,
	useObtenerDatosCliente,
	useObtenerDeudasDelClienteActual,
} from 'hooks';
import {
	useObtenerClienteActual,
	useObtenerCompromisoDeCobroActual,
} from 'redux/hooks';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import {InputAgregarCompromisoDeCobro, ListadoDocumentos} from './components';
import {useObtenerMontoTotalDocumentos} from './hooks/useObtenerMontoTotalDocumentos';
import {Dialogo, Numero} from 'components/UI';
import {useTranslation} from 'react-i18next';
import InputConIcono from 'components/UI/InputConIcono';
import {formatearNumero} from 'utils/methods';
import {useAgregarCompromisoDeCobro} from './hooks';
import {useDispatch} from 'react-redux';
import {limpiarCompromisoDeCobroActual} from 'redux/features/compromisoDeCobro/compromisoDeCobroSlice';

const CompromisoDeCobro: React.FC = () => {
	const clienteActual: TClienteActual = useObtenerClienteActual();
	const {obtenerDatosCliente} = useObtenerDatosCliente();
	const datosCliente: TCliente | undefined = obtenerDatosCliente(
		clienteActual.codigoCliente
	);
	const limiteDeCredito: number | undefined =
		datosCliente?.informacionCrediticia.limite;
	const totalDocumentos = useObtenerMontoTotalDocumentos();
	const documentosClienteActual = useObtenerDeudasDelClienteActual();
	const listaDocumentos =
		documentosClienteActual !== undefined ? documentosClienteActual : [];
	const {t} = useTranslation();
	const {mostrarAdvertenciaEnDialogo, mostarDialogo, parametrosDialogo} =
		useMostrarAdvertenciaEnDialogo();
	const agregarCompromisoDeCobro = useAgregarCompromisoDeCobro(
		mostrarAdvertenciaEnDialogo
	);
	const compromisoDeCobroActual = useObtenerCompromisoDeCobroActual();
	const defaultMonto =
		compromisoDeCobroActual.monto === 0
			? ''
			: compromisoDeCobroActual.monto.toString();
	const dispatch = useDispatch();
	const [importe, setImporte] = React.useState<string>(defaultMonto);
	const [importeFormateado, setImporteFormateado] = React.useState<string>('');
	const [importeValido, setImporteValido] = React.useState<boolean>(false);

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			if (!Number.isNaN(Number(importe)) && Number(importe) > 0) {
				agregarCompromisoDeCobro({monto: importe});
				setImporteValido(true);
			}

			if (Number(importe) === 0) {
				setImporteValido(false);
				dispatch(limpiarCompromisoDeCobroActual());
			}
		}
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		setImporte(e.target.value.replace(/[^0-9]/g, ''));
	};

	return (
		<>
			{mostarDialogo && <Dialogo {...parametrosDialogo} />}
			<Box marginTop='18px' display='flex' alignItems='start' gap='22px'>
				<Box display='flex' flexDirection='column' gap='14px'>
					<Typography variant='body3'>
						{t('general.limiteDeCredito')}:
					</Typography>
					<Typography variant='body3'>{t('general.disponible')}:</Typography>
				</Box>
				<Box display='flex' flexDirection='column' gap='14px'>
					<Typography variant='subtitle3'>
						{formatearNumero(limiteDeCredito ? limiteDeCredito : 0, t)}
					</Typography>
					<Typography variant='subtitle3'>
						{formatearNumero(
							limiteDeCredito ? limiteDeCredito - totalDocumentos : 0,
							t
						)}
					</Typography>
				</Box>
			</Box>
			<InputConIcono
				value={importe}
				valid={importeValido}
				onChange={handleChange}
				onKeyPress={handleKeyPress}
				label={t('general.agregarCompromisoDeCobro')}
				margin='20px 0 0 0 '
				simboloMoneda
			/>
			<Grid container marginTop='18px' sx={{overflowY: 'scroll'}}>
				<Grid
					container
					sx={{
						background: '#F2F2F2',
						borderRadius: '4px 4px 0 0',
						padding: '7px 0 3px 0',
					}}
				>
					<Grid item xs={4} textAlign='center'>
						<Typography variant='body3'>{t('general.documento')}</Typography>
					</Grid>
					<Grid item xs={4} textAlign='center'>
						<Typography variant='body3'>{t('general.vencimiento')}</Typography>
					</Grid>
					<Grid item xs={4} textAlign='center'>
						<Typography variant='body3'>{t('general.saldo')}</Typography>
					</Grid>
				</Grid>
				{listaDocumentos.length &&
					listaDocumentos.map((documento) => {
						return (
							<Grid
								container
								textAlign='center'
								height='56px'
								border='1px solid #E4E4E4'
								alignItems='center'
								justifyContent='center'
								key={documento.numero}
							>
								<Grid item xs={4}>
									<Typography variant='caption' fontWeight='500'>
										{documento.numero}
									</Typography>
								</Grid>
								<Grid item xs={4}>
									<Typography variant='caption' fontWeight='500'>
										{documento.vencimiento}
									</Typography>
								</Grid>
								<Grid item xs={4}>
									<Typography variant='caption' fontWeight='500'>
										{formatearNumero(documento.monto, t)}
									</Typography>
								</Grid>
							</Grid>
						);
					})}
			</Grid>
			<Grid container marginBottom='20px' border='1px solid #E4E4E4'>
				<Grid
					container
					height='24px'
					justifyContent='end'
					alignItems='center'
					borderBottom='1px solid #E4E4E4'
					gap='8px'
				>
					<Grid item>
						<Typography variant='caption'>
							{t('general.totalDeudaPendiente')}:
						</Typography>
					</Grid>
					<Grid item paddingRight='8px'>
						<Typography variant='caption' fontWeight='500'>
							{formatearNumero(
								limiteDeCredito ? limiteDeCredito - totalDocumentos : 0,
								t
							)}
						</Typography>
					</Grid>
				</Grid>
				<Grid
					container
					height='24px'
					justifyContent='end'
					alignItems='center'
					gap='8px'
				>
					<Grid item>
						<Typography variant='caption'>
							{t('general.totalCompromisosRegistrados')}:
						</Typography>
					</Grid>
					<Grid item paddingRight='8px'>
						<Typography variant='caption' fontWeight='500'>
							{formatearNumero(Number(importe), t)}
						</Typography>
					</Grid>
				</Grid>
			</Grid>
		</>
	);
};

export default CompromisoDeCobro;
