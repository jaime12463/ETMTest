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
	useObtenerConfiguracion,
	useObtenerPedidosClientes,
} from 'redux/hooks';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import {useObtenerMontoTotalDocumentos} from './hooks/useObtenerMontoTotalDocumentos';
import {useTranslation} from 'react-i18next';
import InputConIcono from 'components/UI/InputConIcono';
import {formatearNumero} from 'utils/methods';
import {useAgregarCompromisoDeCobro} from './hooks';
import {useReiniciarCompromisoDeCobro} from 'hooks/useReiniciarCompromisoDeCobro';
import theme from 'theme';
interface Error {
	error: boolean;
	mensaje: string;
}

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
	const [importe, setImporte] = React.useState<string>(
		compromisoDeCobroActual.monto === 0
			? ''
			: compromisoDeCobroActual.monto.toString()
	);
	const [importeFormateado, setImporteFormateado] = React.useState<string>('');
	const [importeValido, setImporteValido] = React.useState<boolean>(false);
	const [error, setError] = React.useState<Error>({error: false, mensaje: ''});
	const pedidosCliente = useObtenerPedidosClientes();
	const reiniciarCompromisoDeCobro = useReiniciarCompromisoDeCobro();
	const {habilitaCompromisoDeCobro} = useObtenerConfiguracion();

	const compromisosDeCobro =
		pedidosCliente[clienteActual.codigoCliente]?.compromisosDeCobro.reduce(
			(total, actual) => total + actual.monto,
			0
		) ?? 0;

	const formatoMiles = t('simbolos.miles') === ',' ? 'en-US' : 'es-ES';

	React.useEffect(() => {
		return () => {
			if (Number(importe) > totalDocumentos) {
				reiniciarCompromisoDeCobro();
			}
		};
	}, [importe]);

	React.useEffect(() => {
		if (importe === '') {
			return;
		}

		const importeFormateado = new Intl.NumberFormat(formatoMiles).format(
			Number(importe)
		);
		setImporteFormateado(importeFormateado);

		if (Number(importe) > totalDocumentos) {
			return (
				setImporteValido(false),
				setError({
					error: true,
					mensaje: t('advertencias.montoMayorDeuda'),
				})
			);
		}
		setError({error: false, mensaje: ''});
		setImporteValido(true);
	}, [importe]);

	React.useEffect(() => {
		if (Number(importe) === compromisoDeCobroActual.monto) {
			return;
		}

		if (Number(importe) === 0) {
			setImporteValido(false);
			reiniciarCompromisoDeCobro();
			setError({error: false, mensaje: ''});
		}
	}, [importe, compromisoDeCobroActual.monto]);

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			if (!Number.isNaN(Number(importe)) && Number(importe) > 0) {
				agregarCompromisoDeCobro({monto: importe});
			}
		}
	};

	const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		if (!Number.isNaN(Number(importe)) && Number(importe) > 0) {
			agregarCompromisoDeCobro({monto: importe});
		}
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		setImporte(e.target.value.replace(/[^0-9]/g, ''));
		setImporteFormateado(e.target.value.replace(/[^0-9]/g, ''));
	};

	return (
		<>
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
			{habilitaCompromisoDeCobro && (
				<InputConIcono
					value={importeFormateado}
					valid={importeValido}
					onKeyPress={handleKeyPress}
					onBlur={handleBlur}
					onChange={handleChange}
					label={t('general.agregarCompromisoDeCobro')}
					margin='20px 0 0 0 '
					simboloMoneda
					error={error.error}
					mensajeError={error.mensaje}
					focus
				/>
			)}
			<Grid
				container
				marginTop='18px'
				sx={{overflowY: listaDocumentos.length > 0 ? 'scroll' : 'auto'}}
			>
				<Grid
					container
					sx={{
						background: `${theme.palette.secondary.main}`,
						borderRadius: '4px 4px 0 0',
						color: '#fff',
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
				{listaDocumentos.length > 0 &&
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
			<Grid container marginBottom='20px'>
				<Grid
					container
					height='24px'
					justifyContent='end'
					alignItems='center'
					gap='8px'
					sx={{
						background: `${theme.palette.secondary.light}`,
						borderRadius: habilitaCompromisoDeCobro ? '0 0 0 0' : '0 0 4px 4px',
					}}
				>
					<Grid item>
						<Typography variant='caption' color='#fff'>
							{t('general.totalDeudaPendiente')}:
						</Typography>
					</Grid>
					<Grid item paddingRight='8px'>
						<Typography variant='caption' fontWeight='500' color='#fff'>
							{formatearNumero(totalDocumentos, t)}
						</Typography>
					</Grid>
				</Grid>
				{habilitaCompromisoDeCobro && (
					<Grid
						container
						height='24px'
						justifyContent='end'
						alignItems='center'
						gap='8px'
						sx={{
							background: `${theme.palette.secondary.contrastText}`,
							borderRadius: '0 0 4px 4px',
						}}
					>
						<Grid item>
							<Typography variant='caption' color='#1B1915'>
								{t('general.totalCompromisosRegistrados')}:
							</Typography>
						</Grid>
						<Grid item paddingRight='8px'>
							<Typography variant='caption' fontWeight='500' color='#1B1915'>
								{formatearNumero(compromisosDeCobro, t)}
							</Typography>
						</Grid>
					</Grid>
				)}
			</Grid>
		</>
	);
};

export default CompromisoDeCobro;
