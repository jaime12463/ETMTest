import {
	Grid,
	Card,
	Typography,
	Box,
	Stack,
	IconButton,
	Input,
	Button,
	Collapse,
	CardActions,
	Divider,
} from '@mui/material';
import {Theme} from '@mui/material';
import {styled} from '@mui/material/styles';
import {makeStyles, createStyles} from '@material-ui/styles';
import clsx from 'clsx';
import React, {useEffect, useState} from 'react';
import {TClienteActual, ETiposDePago} from 'models';

import {useObtenerDatos, useObtenerClienteActual} from 'redux/hooks';
import {
	AgregarRedondoIcon,
	QuitarRellenoIcon,
	FlechaAbajoIcon,
	CajaIcon,
	CheckRedondoIcon,
	BotellaIcon,
} from 'assests/iconos';
import {useTranslation} from 'react-i18next';
import {useObtenerVisitaActual} from 'redux/hooks';
import {formatearNumero} from 'utils/methods';
import {useAgregarProductoAlPedidoActual} from '../hooks/useAgregarProductoAlPedidoActual';
import {SwitchCambiarTipoPago} from '../../components';
import theme from 'theme';

const InputStyled = styled(Input)(({}) => ({
	borderRadius: '10px',
	border: '1px solid #2F000E',
	height: '16px',
	width: '42px',
	backgroundColor: 'white',
	fontWeight: 600,
	lineHeight: '16px',
	fontSize: '12px',
}));

const GridStyled = styled(Grid)(({theme}) => ({
	display: 'flex',
}));

const ButtonStyled = styled(Button)(({theme}) => ({
	border: '1.5px solid #651C32',
	boxSizing: 'border-box',
	borderRadius: '20px',
	minHeight: '10px',
	height: '16px',
	textTransform: 'none',
	'&:hover': {
		background: 'none',
	},
}));

const CardStyled = styled(Card)(({theme}) => ({
	border: '1.5px solid #D9D9D9',
	boxSizing: 'border-box',
	borderRadius: ' 8px',
	minHeight: '124px',
	minWidth: '304px',
	boxShadow: 'none',
}));

const useEstilos = makeStyles((theme: Theme) =>
	createStyles({
		expand: {
			transform: 'rotate(0deg)',
			padding: 0,
		},
		expandOpen: {
			transform: 'rotate(180deg)',
		},
		inactiva: {
			opacity: 0.6,
		},
		cardContent: {
			'&.MuiCardContent-root': {
				padding: 0,

				'&.MuiCardContent-root:last-child': {
					padding: 0,
				},
			},
		},
	})
);

const TarjetaPromoPush = (props: any) => {
	const clienteActual: TClienteActual = useObtenerClienteActual();

	const visitaActual = useObtenerVisitaActual();
	const [puedeAgregar, setPuedeAgregar] = useState(false);

	const {t} = useTranslation();
	const classes = useEstilos();
	const {
		item,
		expandidoPromoPush,
		setExpandidoexpandidoPromoPush,
		id,
		mostrarAdvertenciaEnDialogo,
	} = props;
	const {
		codigoProducto,
		nombreProducto,
		unidadesDisponibles,
		precioConImpuestoUnidad,
		descuentoPromoPush,
		componentes,
		promoPush,
	} = item;

	const {venta} = visitaActual.pedidos;

	const producto = venta.productos.find(
		(producto) => producto.codigoProducto === codigoProducto
	);

	const [promoPushTemporal, setPromoPushTemporal] = useState<ETiposDePago>(
		producto ? producto.tipoPago : clienteActual.tipoPagoActual
	);

	const defaultValues = {
		unidades: producto ? producto.unidades : 0,
		subUnidades: producto ? producto.subUnidades : 0,
		productoABuscar: '',
		tipoDePedido: visitaActual.tipoPedidoActual,
		catalogoMotivo: '',
		tipoDePago: producto ? producto.tipoPago : promoPushTemporal,
	};

	const [getValues, setGetValues] = React.useState(defaultValues);

	useEffect(() => {
		const defaultValues = {
			unidades: producto ? producto.unidades : 0,
			subUnidades: producto ? producto.subUnidades : 0,
			productoABuscar: '',
			tipoDePedido: visitaActual.tipoPedidoActual,
			catalogoMotivo: '',
			tipoDePago: producto ? producto.tipoPago : promoPushTemporal,
		};

		setGetValues(defaultValues);
	}, [producto, promoPushTemporal]);

	const datos = useObtenerDatos();
	const {productos} = datos;

	const agregarProductoAlPedidoActual = useAgregarProductoAlPedidoActual(
		item,
		mostrarAdvertenciaEnDialogo,
		getValues,
		setGetValues
	);

	const handleOnChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setGetValues({
			...getValues,
			[e.target.name]: e.target.value.replace(/[^0-9]/g, ''),
		});

		setPuedeAgregar(true);
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === 'Enter') {
			agregarProductoAlPedidoActual(getValues);
		}
	};

	const handleButtons = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		const {value, name} = e.currentTarget;

		if (value === '-' && getValues.unidades === 0) {
			return;
		}
		setGetValues({
			...getValues,
			[name]: value === '+' ? ++getValues.unidades : --getValues.unidades,
		});

		setPuedeAgregar(true);
	};

	React.useEffect(() => {
		if (puedeAgregar) {
			agregarProductoAlPedidoActual(getValues);
			setPuedeAgregar(false);
		}
	}, [puedeAgregar]);

	const manejadorExpandido =
		({id}: any) =>
		(event: React.SyntheticEvent) => {
			setExpandidoexpandidoPromoPush(id);
		};

	return (
		<>
			<CardStyled
				sx={
					getValues.unidades > 0
						? {border: '1.5px solid #00CF91'}
						: expandidoPromoPush === id
						? {border: '0px'}
						: {border: '1.5px solid #D9D9D9'}
				}
			>
				<Box
					sx={
						expandidoPromoPush === id
							? {
									backgroundColor: '#8A4C5F',
									borderTop: '0px',
									padding: '12px 14px',
							  }
							: {backgroundColor: '#FFFFFF', padding: '5px 14px'}
					}
				>
					<Box
						display='flex'
						justifyContent='space-between'
						alignItems='center'
						marginBottom='8px'
					>
						<SwitchCambiarTipoPago
							producto={producto}
							setPromoPushTemporal={setPromoPushTemporal}
							promoPushTemporal={promoPushTemporal}
						/>
						{getValues.unidades > 0 && (
							<CheckRedondoIcon height='17.5px' width='17.5px' />
						)}
					</Box>
					<Box
						display='grid'
						gridTemplateColumns='repeat(2, 1fr)'
						marginBottom='8px'
						sx={
							expandidoPromoPush === id
								? {color: '#FFFFFF'}
								: {color: '#000000'}
						}
					>
						<Box display='flex' flexDirection='column'>
							<Typography variant='subtitle3' marginBottom='2px'>
								{codigoProducto}
							</Typography>
							<Typography
								variant='subtitle3'
								sx={{
									maxWidth: '137px',
									textOverflow: 'ellipsis',
									overflow: 'hidden',
								}}
								marginBottom='6px'
							>
								{nombreProducto}
							</Typography>
							<Typography variant='subtitle3' marginBottom='6px'>
								{formatearNumero(precioConImpuestoUnidad, t)}
							</Typography>
							<Box
								sx={{
									backgroundColor: theme.palette.primary.main,
									width: '98px',
									height: '14px',
									borderRadius: '50px',
									display: 'flex',
									alignContent: 'center',
								}}
							>
								<Typography
									fontFamily='Open Sans'
									variant='caption'
									textAlign='center'
									color={'white'}
									m='auto'
								>
									Ahorras: {formatearNumero(descuentoPromoPush, t)}
								</Typography>
							</Box>
						</Box>
						<Box
							display='flex'
							flexDirection='column'
							justifyContent='center'
							alignItems='center'
						>
							<Typography
								variant='caption'
								alignSelf='end'
								marginBottom='14px'
								fontFamily='Open Sans'
								sx={
									expandidoPromoPush === id
										? {color: '#FFFFFF'}
										: {color: '#000000'}
								}
							>
								Aplicación maxima
							</Typography>
							<Box
								alignSelf='end'
								display='flex'
								alignItems='center'
								justifyContent='center'
								gap='2px'
							>
								<IconButton
									size='small'
									name='unidades'
									value='-'
									onClick={handleButtons}
									disabled={getValues.unidades === 0}
									sx={{padding: '0'}}
								>
									<QuitarRellenoIcon
										width='18px'
										height='18px'
										disabled={getValues.unidades === 0}
									/>
								</IconButton>
								<InputStyled
									value={getValues.unidades}
									disableUnderline
									name='unidades'
									id='unidades_producto'
									onFocus={(e) => e.target.select()}
									inputProps={{
										style: {textAlign: 'center'},
										inputMode: 'numeric',
										pattern: '[0-9]*',
									}}
									onChange={handleOnChange}
									onKeyPress={handleKeyPress}
								/>
								<IconButton
									size='small'
									name='unidades'
									value='+'
									onClick={handleButtons}
									disabled={getValues.unidades >= unidadesDisponibles}
									sx={{padding: '0'}}
								>
									<AgregarRedondoIcon
										width='18px'
										height='18px'
										disabled={getValues.unidades >= unidadesDisponibles}
									/>
								</IconButton>
								<Typography variant={'subtitle3'} fontWeight={700}>
									/ {unidadesDisponibles}
								</Typography>
							</Box>
						</Box>
					</Box>
				</Box>

				<Box
					sx={
						expandidoPromoPush === id
							? getValues.unidades > 0
								? {
										border: '0px',
								  }
								: {
										border: '1.5px solid #D9D9D9',
								  }
							: {border: '0px', padding: '4px 14px'}
					}
				>
					<Collapse in={expandidoPromoPush === id} timeout='auto' unmountOnExit>
						<Stack>
							<Box width='100%' display='flex' flexDirection='row'>
								<GridStyled item xs={6}>
									<Typography
										sx={{padding: '12px 14px'}}
										variant={'subtitle3'}
										fontWeight={700}
									>
										Paquetes
									</Typography>
								</GridStyled>
								<GridStyled item xs={6}>
									<Box
										sx={{
											minWidth: '100%',
											minHeight: '100%',
											backgroundColor: '#F5F0EF',
										}}
										mb={3}
									></Box>
								</GridStyled>
							</Box>

							<Box>
								{componentes?.map((el: any, i: number) => (
									<React.Fragment key={`${el.codigoProducto}${i}`}>
										<Grid container>
											<GridStyled
												item
												xs={6}
												sx={{padding: '5px 14px 0px 14px'}}
											>
												<Box display='flex' flexDirection='column' pb={2}>
													<Typography variant='subtitle3'>
														{el.codigoProducto}
													</Typography>

													<Typography variant='subtitle3'>
														{productos[el.codigoProducto].nombre}
													</Typography>
												</Box>
											</GridStyled>
											<GridStyled
												sx={{
													backgroundColor: '#F5F0EF',
													padding: '5px 14px 0px 14px',
												}}
												item
												xs={6}
												justifyContent='end'
											>
												<Box
													display='flex'
													flexDirection='column'
													marginBottom='8px'
												>
													<Box
														display='flex'
														textAlign='center'
														justifyContent='end'
													>
														<Box mr={'2px'}>
															{promoPush.componentes[i].unidadMedida ===
															'CAJ' ? (
																<CajaIcon height='18px' width='18px' />
															) : (
																<BotellaIcon height='15px' width='15px' />
															)}
														</Box>
														<Box>
															<Typography
																variant='caption'
																mt={0.3}
																color={'#651C32'}
															>
																{` x${promoPush.componentes[i].cantidad} `}
															</Typography>
															<Typography
																color={'#000000'}
																variant='caption'
																mt={0.3}
															>
																{`${formatearNumero(el.precioBase, t)}`}
															</Typography>
														</Box>
													</Box>
													<Box>
														<Typography
															color='primary'
															fontFamily='Open Sans'
															variant='caption'
														>
															Ahorras: {formatearNumero(el.descuento, t)}
														</Typography>
													</Box>
													<Box>
														<Typography variant='subtitle3'>
															Total: {formatearNumero(el.precioFinal, t)}
														</Typography>
													</Box>
												</Box>
											</GridStyled>
										</Grid>
										<Divider />
									</React.Fragment>
								))}
							</Box>
						</Stack>
					</Collapse>
					<Box marginTop='8px' sx={{padding: '6px 14px'}}>
						<ButtonStyled
							disableFocusRipple
							fullWidth
							disableRipple
							onClick={manejadorExpandido({
								id: expandidoPromoPush === id ? false : id,
							})}
						>
							<CardActions disableSpacing style={{padding: 0}}>
								<Box display='flex' gap='6px' alignItems='center'>
									<Typography variant='caption' color='secondary'>
										Ver detalle
									</Typography>
									<Box
										className={clsx(classes.expand, {
											[classes.expandOpen]:
												expandidoPromoPush === id ? true : false,
										})}
										aria-expanded={expandidoPromoPush === id ? true : false}
										style={{padding: 0}}
									>
										<FlechaAbajoIcon width='10px' height='10px' />
									</Box>
								</Box>
							</CardActions>
						</ButtonStyled>
					</Box>
				</Box>
			</CardStyled>
		</>
	);
};

export default TarjetaPromoPush;
