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
		stateFocusId,
		stateInputFocus,
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

	/* 	const {focusId, setFocusId} = stateFocusId;
	const {inputFocus, setInputFocus} = stateInputFocus; */
	let esEnPromociones = false;
	if (!stateFocusId && !stateInputFocus) {
		esEnPromociones = true;
	}

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

	const {productos, envases, medidas} = useObtenerDatos();

	const agregarProductoAlPedidoActual = useAgregarProductoAlPedidoActual(
		item,
		mostrarAdvertenciaEnDialogo,
		getValues,
		setGetValues,
		esEnPromociones
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
			props?.stateFocusId?.setFocusId(0);
			props?.stateInputFocus?.setInputFocus('productoABuscar');
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

	const manejadorExpandido = (id: string | boolean) => {
		setExpandidoexpandidoPromoPush(id);
		props?.stateInputFocus?.setInputFocus('unidades');
		props?.stateFocusId?.setFocusId(codigoProducto);
	};

	return (
		<>
			<CardStyled
				sx={{
					border:
						getValues.unidades > 0
							? `1px solid ${theme.palette.success.main}`
							: '1px solid #D9D9D9',

					maxWidth: '166px',
				}}
			>
				<Box
					padding='12px 14px 0 14px'
					sx={{
						background:
							expandidoPromoPush === id
								? theme.palette.secondary.light
								: '#fff',
						transition: 'all 0.3s ease-in-out',
					}}
				>
					<Box
						display='flex'
						justifyContent='space-between'
						alignItems='center'
						marginBottom='10px'
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
						display='flex'
						flexWrap='wrap'
						paddingBottom='12px'
						sx={{color: expandidoPromoPush === id ? '#fff' : '#000'}}
					>
						<Box
							display='flex'
							flexDirection='column'
							width='100%'
							gap='2px'
							marginBottom='8px'
						>
							<Typography variant='subtitle3'>{codigoProducto}</Typography>
							<Typography variant='subtitle3'>{nombreProducto}</Typography>
						</Box>
						<Box display='flex' flexDirection='column' width='50%' gap='6px'>
							<Typography
								variant='body3'
								fontFamily='Open Sans'
								color={expandidoPromoPush === id ? '#fff' : '#000'}
								sx={{textDecoration: 'line-through'}}
							>
								{`${t('general.precioUnitario')}: ${formatearNumero(
									precioConImpuestoUnidad + descuentoPromoPush,
									t
								)}`}
							</Typography>
							<Typography
								variant='caption'
								color={
									expandidoPromoPush === id
										? '#fff'
										: theme.palette.secondary.main
								}
							>
								{`${t('general.ahorras')}: ${formatearNumero(
									descuentoPromoPush,
									t
								)}`}
							</Typography>
							<Typography
								fontFamily='Open Sans'
								variant='subtitle3'
								textAlign='center'
								color='#fff'
								sx={{
									background: theme.palette.primary.main,
									borderRadius: '50px',
									padding: '2px 12px',
									width: 'fit-content',
								}}
							>
								{`${t('general.total')}: ${formatearNumero(
									precioConImpuestoUnidad,
									t
								)}`}
							</Typography>
						</Box>
						<Box display='flex' flexDirection='column' width='50%'>
							<Box
								display='flex'
								flexDirection='column'
								gap='14px'
								alignSelf='end'
							>
								<Typography
									variant='caption'
									fontFamily='Open Sans'
									sx={{color: expandidoPromoPush === id ? '#fff' : '#000'}}
								>
									{`${t('general.aplicacionMaxima')}:`}
								</Typography>
								<Box
									alignSelf='start'
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
										onClick={() => {
											props?.stateInputFocus?.setInputFocus('unidades');
											props?.stateFocusId?.setFocusId(codigoProducto);
										}}
										inputProps={{
											style: {textAlign: 'center'},
											inputMode: 'numeric',
											pattern: '[0-9]*',
										}}
										inputRef={(input) => {
											if (
												props?.stateInputFocus?.inputFocus === 'unidades' &&
												props?.stateFocusId?.focusId === codigoProducto
											) {
												input?.focus();
											}
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
											style={{marginRight: '8px'}}
										/>
									</IconButton>
									<Typography variant={'subtitle3'} fontWeight={700}>
										/ {unidadesDisponibles}
									</Typography>
								</Box>
							</Box>
						</Box>
					</Box>
				</Box>

				<Box>
					<Collapse in={expandidoPromoPush === id} timeout='auto' unmountOnExit>
						<Stack>
							<Box width='100%' display='flex' flexDirection='row'>
								<GridStyled item xs={6}>
									<Typography
										sx={{
											padding: '6px 14px 14px 14px',
											letterSpacing: '-0.4px',
										}}
										variant={'subtitle3'}
										fontWeight={700}
									>
										{t('general.paquetes')}
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
												sx={{padding: '6px 14px 0px 14px'}}
											>
												<Box display='flex' flexDirection='column' pb={2}>
													<Typography variant='subtitle3'>
														{el.codigoProducto}
													</Typography>

													<Typography
														variant='subtitle3'
														marginBottom={
															productos[el.codigoProducto].atributos ? 0 : '6px'
														}
													>
														{productos[el.codigoProducto].nombre}
													</Typography>
													{productos[el.codigoProducto].atributos && (
														<Typography
															margin='4px 0 6px 0'
															variant='caption'
															color={theme.palette.secondary.main}
														>
															{`${
																medidas[
																	productos[el.codigoProducto].atributos
																		?.medida ?? 0
																].descripcion
															} | ${
																envases[
																	productos[el.codigoProducto].atributos
																		?.envase ?? 0
																].descripcion
															}`}
														</Typography>
													)}
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
																color={theme.palette.secondary.main}
															>
																{`x${promoPush.componentes[i].cantidad}`}
															</Typography>
															<Typography color={'#000000'} variant='caption'>
																{`${formatearNumero(el.precioBase, t)}`}
															</Typography>
														</Box>
													</Box>
													<Typography
														color='primary'
														fontFamily='Open Sans'
														variant='caption'
														marginBottom='12px'
														alignSelf='end'
													>
														{`${t('general.ahorras')}: ${formatearNumero(
															el.descuento,
															t
														)}`}
													</Typography>
													<Typography variant='subtitle3' alignSelf='end'>
														{`${t('general.total')}: ${formatearNumero(
															el.precioFinal,
															t
														)}`}
													</Typography>
												</Box>
											</GridStyled>
										</Grid>
										<Divider />
									</React.Fragment>
								))}
							</Box>
						</Stack>
					</Collapse>
					<Box
						padding={
							expandidoPromoPush === id
								? '8px 14px 12px 14px'
								: '0 14px 12px 14px'
						}
					>
						<ButtonStyled
							disableFocusRipple
							fullWidth
							disableRipple
							onClick={() =>
								manejadorExpandido(expandidoPromoPush === id ? false : id)
							}
						>
							<CardActions disableSpacing style={{padding: 0}}>
								<Box display='flex' gap='6px' alignItems='center'>
									<Typography variant='caption' color='secondary'>
										{expandidoPromoPush !== id
											? t('general.verDetalle')
											: t('general.ocultarDetalle')}
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
