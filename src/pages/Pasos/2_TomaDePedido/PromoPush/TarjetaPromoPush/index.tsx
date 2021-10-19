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
import React, {useState} from 'react';

import {useObtenerDatos} from 'redux/hooks';
import {
	AgregarRedondoIcon,
	QuitarRellenoIcon,
	FlechaAbajoIcon,
	CajaIcon,
} from 'assests/iconos';
import {useTranslation} from 'react-i18next';
import {useObtenerVisitaActual} from 'redux/hooks';
import {formatearNumero} from 'utils/methods';
import {useAgregarProductoAlPedidoActual} from '../hooks/useAgregarProductoAlPedidoActual';

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
	const visitaActual = useObtenerVisitaActual();
	const {venta} = visitaActual.pedidos;

	const producto = venta.productos.find(
		(producto) => producto.codigoProducto === codigoProducto
	);

	const defaultValues = {
		unidades: producto ? producto.unidades : 0,
		subUnidades: producto ? producto.subUnidades : 0,
		productoABuscar: '',
		tipoDePedido: visitaActual.tipoPedidoActual,
		catalogoMotivo: '',
	};

	const [getValues, setGetValues] = React.useState(defaultValues);

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

		agregarProductoAlPedidoActual(getValues);
	};

	React.useEffect(() => {
		agregarProductoAlPedidoActual(getValues);
	}, [getValues]);

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
			>
				<Grid container p={2}>
					<GridStyled item xs={6}>
						<Box display='flex' flexDirection='column'>
							<Stack spacing={1}>
								<Box display='flex' flexDirection='column'>
									<Typography variant='subtitle3'>{codigoProducto}</Typography>
									<Typography
										sx={{
											width: '150px',
											overflow: 'hidden',
											textOverflow: 'ellipsis',
										}}
										variant='subtitle3'
									>
										{nombreProducto}
									</Typography>
								</Box>
								<Box display='flex' flexDirection='column'>
									<Typography variant='subtitle3'>
										{formatearNumero(precioConImpuestoUnidad, t)}
									</Typography>
								</Box>
								<Box display='flex' flexDirection='column'>
									<Typography color='primary' variant='caption'>
										Ahorras: {formatearNumero(descuento, t)}
									</Typography>
								</Box>
							</Stack>
						</Box>
					</GridStyled>
					<GridStyled item xs={6}>
						<Stack spacing={1}>
							<Box textAlign='right'>
								<Typography variant='caption'>Aplicación maxima</Typography>
							</Box>
							<Box>
								<IconButton
									size='small'
									name='unidades'
									value='-'
									onClick={(e) => handleButtons(e)}
								>
									<QuitarRellenoIcon width='18px' height='18px' />
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
									onChange={(e) => handleOnChange(e)}
									onKeyPress={(e) => handleKeyPress(e)}
								/>
								<IconButton
									size='small'
									name='unidades'
									value='+'
									onClick={(e) => handleButtons(e)}
								>
									<AgregarRedondoIcon width='18px' height='18px' />
								</IconButton>
								<Typography variant={'subtitle3'} fontWeight={700}>
									/ {unidadesDisponibles}
								</Typography>
							</Box>
						</Stack>
					</GridStyled>
					<Grid item xs={12} mt={0.5}>
						<Collapse
							in={expandidoPromoPush === id}
							timeout='auto'
							unmountOnExit
						>
							<Stack>
								<Divider />
								<Typography variant={'subtitle3'} fontWeight={700} mt={1}>
									Paquetes
								</Typography>
								<Box>
									{componentes &&
										componentes.map((el: any, i: number) => (
											<React.Fragment key={i}>
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
													<GridStyled item xs={4}>
														<Box display='flex' flexDirection='column'>
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
											</React.Fragment>
										))}
								</Box>
							</Stack>
						</Collapse>
					</Grid>
					<Grid item xs={12} mt={1}>
						<ButtonStyled
							disableFocusRipple
							fullWidth
							disableRipple
							onClick={manejadorExpandido({
								id: expandidoPromoPush === id ? false : id,
							})}
						>
							<CardActions disableSpacing style={{padding: 0}}>
								<Box display='flex'>
									<Typography variant='caption' color='secondary'>
										Ver detalle
									</Typography>
									<IconButton
										className={clsx(classes.expand, {
											[classes.expandOpen]:
												expandidoPromoPush === id ? true : false,
										})}
										aria-expanded={expandidoPromoPush === id ? true : false}
										style={{padding: 0}}
									>
										<FlechaAbajoIcon width='10px' height='10px' />
									</IconButton>
								</Box>
							</CardActions>
						</ButtonStyled>
					</Grid>
				</Grid>
			</CardStyled>
		</>
	);
};

export default TarjetaPromoPush;
