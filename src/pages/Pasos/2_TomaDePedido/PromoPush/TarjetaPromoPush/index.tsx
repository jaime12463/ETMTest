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
		descuento,
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
						: {border: '1.5px solid #D9D9D9'}
				}
				style={{padding: '12px 14px'}}
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
						<CheckRedondoIcon
							height='17.5px'
							width='17.5px'
							fill={`${theme.palette.success.main}`}
						/>
					)}
				</Box>
				<Box
					display='grid'
					gridTemplateColumns='repeat(2, 1fr)'
					marginBottom='8px'
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
						<Typography variant='caption' color='primary'>
							Ahorras: {formatearNumero(descuento, t)}
						</Typography>
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
						>
							Aplicación maxima
						</Typography>
						<Box
							alignSelf='end'
							display='flex'
							alignItems='center'
							justifyContent='center'
						>
							<IconButton
								size='small'
								name='unidades'
								value='-'
								onClick={handleButtons}
								disabled={getValues.unidades > 0 ? false : true}
							>
								<QuitarRellenoIcon
									width='18px'
									height='18px'
									fill={getValues.unidades > 0 ? '#2F000E' : '#D9D9D9'}
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
								disabled={
									getValues.unidades >= unidadesDisponibles ? true : false
								}
							>
								<AgregarRedondoIcon
									width='18px'
									height='18px'
									fill={
										getValues.unidades >= unidadesDisponibles
											? '#D9D9D9'
											: '#2F000E'
									}
								/>
							</IconButton>
							<Typography variant={'subtitle3'} fontWeight={700}>
								/ {unidadesDisponibles}
							</Typography>
						</Box>
					</Box>
				</Box>
				<Box>
					<Collapse in={expandidoPromoPush === id} timeout='auto' unmountOnExit>
						<Stack>
							<Divider />
							<Typography variant={'subtitle3'} fontWeight={700} mt={1}>
								Paquetes
							</Typography>
							<Box>
								{componentes?.map((el: any, i: number) => (
									<div key={`${el.codigoProducto}${i}`}>
										<Grid container mt={1}>
											<GridStyled item xs={8}>
												<Box display='flex' flexDirection='column'>
													<Typography variant='subtitle3'>
														{el.codigoProducto}
													</Typography>

													<Typography variant='subtitle3'>
														{productos[el.codigoProducto].nombre}
													</Typography>
												</Box>
											</GridStyled>
											<GridStyled item xs={4} justifyContent='end'>
												<Box
													display='flex'
													flexDirection='column'
													marginBottom='8px'
												>
													<Box display='flex' textAlign='center'>
														<CajaIcon width={'19px'} height='14px' />
														<Typography variant='caption' mt={0.3}>
															{`x${promoPush.componentes[i].cantidad}
																	${formatearNumero(el.precioBase, t)}`}
														</Typography>
													</Box>
													<Box>
														<Typography color='primary' variant='caption'>
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
									</div>
								))}
							</Box>
						</Stack>
					</Collapse>
					<Box marginTop='8px'>
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
