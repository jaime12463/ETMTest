import {useEffect, useState, useMemo} from 'react';
import {TClienteActual} from 'models';
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
import {useObtenerMontoTotalDocumentos} from './hooks/useObtenerMontoTotalDocumentos';
import {useTranslation} from 'react-i18next';
import {
	formatearNumero,
	formateoYColorFechaCompromisoDeCobro,
} from 'utils/methods';
import {useAgregarCompromisoDeCobro} from './hooks';
import {useReiniciarCompromisoDeCobro} from 'hooks/useReiniciarCompromisoDeCobro';
import theme from 'theme';
import {InputConIcono, Tooltip} from 'components/UI';
import {Box, Typography} from '@mui/material';
import i18n from 'i18next';

interface Props {
	openTooltip: boolean;
	tarjetaPlaneacion?: boolean;
}
interface Error {
	error: boolean;
	mensaje: string;
}

const CompromisoDeCobro: React.VFC<Props> = ({
	openTooltip,
	tarjetaPlaneacion = false,
}) => {
	const clienteActual: TClienteActual = useObtenerClienteActual();
	const {obtenerDatosCliente} = useObtenerDatosCliente();
	const datosCliente = obtenerDatosCliente(clienteActual.codigoCliente)!;
	const [huboCambios, setHuboCambios] = useState<boolean>(false);
	const limiteDeCredito: number | undefined =
		datosCliente?.informacionCrediticia.limite;
	const totalDocumentos = useObtenerMontoTotalDocumentos();
	const documentosClienteActual = useObtenerDeudasDelClienteActual();
	const listaDocumentos = documentosClienteActual;
	const {t} = useTranslation();
	const {mostrarAdvertenciaEnDialogo} = useMostrarAdvertenciaEnDialogo();
	const agregarCompromisoDeCobro = useAgregarCompromisoDeCobro(
		mostrarAdvertenciaEnDialogo
	);
	const compromisoDeCobroActual = useObtenerCompromisoDeCobroActual();
	const [importe, setImporte] = useState<string>(
		compromisoDeCobroActual.monto === 0
			? ''
			: compromisoDeCobroActual.monto.toString()
	);
	const [importeValido, setImporteValido] = useState<boolean>(false);
	const [error, setError] = useState<Error>({error: false, mensaje: ''});
	const pedidosCliente = useObtenerPedidosClientes();
	const reiniciarCompromisoDeCobro = useReiniciarCompromisoDeCobro();
	const {habilitaCompromisoDeCobro} = useObtenerConfiguracion();

	const compromisosDeCobro =
		pedidosCliente[clienteActual.codigoCliente]?.compromisosDeCobro.reduce(
			(total, actual) => total + actual.monto,
			0
		) ?? 0;

	const importeAMandar = useMemo(() => {
		return i18n.language === 'en'
			? importe.replaceAll('.', '').replace(',', '.')
			: importe.replaceAll(',', '');
	}, [importe]);

	useEffect(() => {
		if (importeAMandar === '') {
			setImporteValido(false);
			return;
		}

		if (Number(importeAMandar) > totalDocumentos) {
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

		return () => {
			if (Number(importeAMandar) > totalDocumentos) {
				reiniciarCompromisoDeCobro();
			}
		};
	}, [importeAMandar]);

	useEffect(() => {
		if (Number(importeAMandar) === compromisoDeCobroActual.monto) {
			return;
		}

		if (Number(importeAMandar) === 0) {
			setImporteValido(false);
			reiniciarCompromisoDeCobro();
			setError({error: false, mensaje: ''});
		}
	}, [importeAMandar, compromisoDeCobroActual.monto]);

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			if (
				!Number.isNaN(Number(importeAMandar)) &&
				Number(importeAMandar) > 0 &&
				huboCambios
			) {
				agregarCompromisoDeCobro({monto: importeAMandar});
				setHuboCambios(false);
			}
		}
	};

	const handleBlur = () => {
		if (
			!Number.isNaN(Number(importeAMandar)) &&
			Number(importeAMandar) > 0 &&
			huboCambios
		) {
			agregarCompromisoDeCobro({
				monto: importeAMandar,
			});
			setHuboCambios(false);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setImporte(e.target.value);
		setHuboCambios(true);
	};

	const currencyMask = (e: React.ChangeEvent<HTMLInputElement>) => {
		let value = e.target.value;
		value = value.replace(/\D/g, '');
		value = value.replace(/(\d)(\d{2})$/, `$1${t('simbolos.decimal')}$2`);
		value = value.replace(/(?=(\d{3})+(\D))\B/g, t('simbolos.miles'));
		e.target.value = value;
		return e;
	};

	return (
		<Box position='relative'>
			<Tooltip
				direccionFlechaHorizontal={
					tarjetaPlaneacion || !habilitaCompromisoDeCobro ? '225px' : '168px'
				}
				colorScheme='secondary'
				left='0'
				open={openTooltip}
				padding='12px'
				top={
					tarjetaPlaneacion || !habilitaCompromisoDeCobro ? '-35px' : '-25px'
				}
				width='272px'
			>
				<Box display='flex' flexDirection='column' gap='8px'>
					<Box alignItems='center' display='flex' gap='8px'>
						<Box height='15px' sx={{background: '#99D8C1'}} width='15px' />
						<Typography
							color='#000'
							fontWeight={600}
							lineHeight='12px'
							variant='caption'
						>
							{t('tooltip.partidasAbiertas')}
						</Typography>
					</Box>
					<Box alignItems='center' display='flex' gap='8px'>
						<Box height='15px' sx={{background: '#FFDC7D'}} width='15px' />
						<Typography
							color='#000'
							fontWeight={600}
							lineHeight='12px'
							variant='caption'
						>
							{t('tooltip.partidasAPuntoDeVencer')}
						</Typography>
					</Box>
					<Box alignItems='center' display='flex' gap='8px'>
						<Box height='15px' sx={{background: '#EC9999'}} width='15px' />
						<Typography
							color='#000'
							fontWeight={600}
							lineHeight='12px'
							variant='caption'
						>
							{t('tooltip.partidasVencidas')}
						</Typography>
					</Box>
				</Box>
			</Tooltip>
			{!tarjetaPlaneacion && habilitaCompromisoDeCobro && (
				<Box marginTop='8px' width='153px'>
					<InputConIcono
						value={importe}
						valid={importeValido}
						onKeyPress={handleKeyPress}
						onBlur={handleBlur}
						onChange={(e) => handleChange(currencyMask(e))}
						placeholder={t('general.ingresarCantidad')}
						simboloMoneda
						error={error.error}
						mensajeError={error.mensaje}
					/>
				</Box>
			)}
			<Box marginTop='18px' display='flex' gap='22px'>
				<Box display='flex' flexDirection='column' gap='14px'>
					<Typography fontFamily='Open Sans' variant='body3'>
						{t('general.limiteDeCredito')}:
					</Typography>
					<Typography fontFamily='Open Sans' variant='body3'>
						{t('general.disponible')}:
					</Typography>
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

			<Box marginTop='18px'>
				<Box
					borderRadius='4px 0 0 0'
					display='grid'
					gridTemplateColumns='1fr'
					sx={{
						background: `${theme.palette.secondary.main}`,
					}}
				>
					<Box
						display='grid'
						gridTemplateColumns='1fr 1fr 1fr'
						padding='7px 0 5px 0'
					>
						<Typography
							color='#fff'
							fontFamily='Open Sans'
							variant='body3'
							justifySelf='flex-end'
						>
							{t('general.documento')}
						</Typography>

						<Typography
							color='#fff'
							fontFamily='Open Sans'
							justifySelf='flex-end'
							variant='body3'
						>
							{t('general.vencimiento')}
						</Typography>

						<Typography
							color='#fff'
							fontFamily='Open Sans'
							justifySelf='center'
							variant='body3'
						>
							{t('general.saldo')}
						</Typography>
					</Box>
					{!!listaDocumentos.length && (
						<Box
							maxHeight='378px'
							sx={{
								overflowY: 'auto',
								'&::-webkit-scrollbar': {
									width: '14px',
								},
								'&::-webkit-scrollbar-track': {
									background: '#fff',
									borderRight: '1px solid #D9D9D9',
									borderTop: '1px solid #D9D9D9',
									borderBottom: '1px solid #D9D9D9',
								},
								'&::-webkit-scrollbar-thumb': {
									background: '#D9D9D9',
									borderRadius: '4px',
								},
							}}
						>
							{listaDocumentos?.map(({numero, vencimiento, monto}, index) => {
								const {vencimientoFormateado, colorCirculo, colorTexto} =
									formateoYColorFechaCompromisoDeCobro(
										vencimiento,
										datosCliente.informacionCrediticia
											.diasAlertaVencimientoDesde,
										datosCliente.informacionCrediticia
											.diasAlertaVencimientoHasta
									);

								return (
									<Box
										display='grid'
										gridTemplateColumns='1.5fr 1fr 1fr'
										height='54px'
										gap='36px'
										key={numero}
										padding='0 8px 0 10px'
										width='100%'
										sx={{
											alignItems: 'center',
											background: '#fff',
											borderLeft: `1px solid ${theme.palette.secondary.main}`,
											borderRight: `1px solid ${theme.palette.secondary.main}`,
											borderBottom:
												listaDocumentos.length - 1 !== index
													? `1px solid ${theme.palette.secondary.main}`
													: 'none',
										}}
									>
										<Box alignItems='center' display='flex' gap='10px'>
											<Box
												height='15px'
												width='15px'
												borderRadius='50%'
												sx={{background: colorCirculo}}
											/>
											<Typography
												color={colorTexto}
												variant='caption'
												fontWeight='500'
											>
												{numero}
											</Typography>
										</Box>

										<Typography
											color={colorTexto}
											variant='caption'
											fontWeight='500'
										>
											{vencimientoFormateado}
										</Typography>

										<Typography
											color={colorTexto}
											variant='caption'
											fontWeight='500'
											sx={{justifySelf: 'flex-end'}}
										>
											{formatearNumero(monto, t)}
										</Typography>
									</Box>
								);
							})}
						</Box>
					)}
					<Box>
						<Box
							display='flex'
							height='24px'
							justifyContent='flex-end'
							alignItems='center'
							gap='8px'
							sx={{
								background: `${theme.palette.secondary.main}`,
								borderRadius:
									habilitaCompromisoDeCobro && !tarjetaPlaneacion
										? '0 0 0 0'
										: '0 0 0 4px',
							}}
						>
							<Box>
								<Typography
									fontFamily='Open Sans'
									variant='caption'
									color='#fff'
								>
									{t('general.totalDeudaPendiente')}:
								</Typography>
							</Box>
							<Box paddingRight='8px'>
								<Typography variant='caption' fontWeight={500} color='#fff'>
									{formatearNumero(totalDocumentos, t)}
								</Typography>
							</Box>
						</Box>
						{!tarjetaPlaneacion && habilitaCompromisoDeCobro && (
							<Box
								display='flex'
								height='24px'
								justifyContent='flex-end'
								alignItems='center'
								gap='8px'
								sx={{
									background: `${theme.palette.secondary.light}`,
									borderRadius: '0 0 0 4px',
								}}
							>
								<Box>
									<Typography
										color='#fff'
										fontFamily='Open Sans'
										variant='caption'
									>
										{t('general.totalCompromisosRegistrados')}:
									</Typography>
								</Box>
								<Box paddingRight='8px'>
									<Typography variant='caption' fontWeight={500} color='#fff'>
										{formatearNumero(compromisosDeCobro, t)}
									</Typography>
								</Box>
							</Box>
						)}
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default CompromisoDeCobro;
