import {
	Grid,
	Card,
	Typography,
	Box,
	Stack,
	Button,
	Collapse,
	CardActions,
	Divider,
} from '@mui/material';
import {Theme} from '@mui/material';
import {styled} from '@mui/material/styles';
import {makeStyles, createStyles} from '@material-ui/styles';
import clsx from 'clsx';

import {useObtenerDatos} from 'redux/hooks';
import {FlechaAbajoIcon, CajaIcon, BotellaIcon} from 'assests/iconos';
import {useTranslation} from 'react-i18next';
import {formatearNumero} from 'utils/methods';
import theme from 'theme';

const GridStyled = styled(Grid)(({theme}) => ({
	display: 'flex',
}));

const ButtonStyled = styled(Button)(({theme}) => ({
	border: `1.5px solid ${theme.palette.secondary.main}`,
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
	boxSizing: 'border-box',
	borderRadius: '4px',
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

export const TarjetaVistaPromoPush = (props: any) => {
	const {t} = useTranslation();
	const classes = useEstilos();
	const datos = useObtenerDatos();
	const {productos} = datos;
	const {item, expandidoPromoPush, setExpandidoexpandidoPromoPush, id} = props;

	const {
		codigoProducto,
		nombreProducto,
		unidadesDisponibles,
		precioConImpuestoUnidad,
		descuento,
		componentes,
		promoPush,
	} = item;

	const manejadorExpandido = (id: string | boolean) => {
		setExpandidoexpandidoPromoPush(id);
	};

	return (
		<CardStyled
			sx={
				expandidoPromoPush === id
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
								padding: '0 0 12px 0',
						  }
						: {backgroundColor: '#FFFFFF', padding: '0 0 12px 0'}
				}
			>
				<Box
					display='grid'
					gridTemplateColumns='repeat(2, 1fr)'
					sx={
						expandidoPromoPush === id ? {color: '#FFFFFF'} : {color: '#000000'}
					}
				>
					<Box display='flex' flexDirection='column' padding='12px 14px 0 14px'>
						<Typography variant='subtitle3' marginBottom='2px'>
							{codigoProducto}
						</Typography>
						<Typography
							sx={{
								maxWidth: '137px',
								textOverflow: 'ellipsis',
								overflow: 'hidden',
							}}
							variant='subtitle3'
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
								alignItems: 'center',
							}}
						>
							<Typography
								fontFamily='Open Sans'
								variant='caption'
								textAlign='center'
								color={'white'}
								m='auto'
							>
								{`${t('general.ahorras')}:
								${formatearNumero(precioConImpuestoUnidad, t)}`}
							</Typography>
						</Box>
					</Box>
					<Box
						display='flex'
						flexDirection='column'
						justifyContent='center'
						alignItems='center'
						ml={5}
						paddingRight='14px'
					>
						<Typography
							variant='caption'
							marginBottom='5px'
							fontFamily='Open Sans'
							textAlign='right'
							sx={{width: '100%'}}
							color={expandidoPromoPush === id ? 'white' : 'black'}
						>
							{`${t('general.unidadesMaximasAplicar')}:`}
						</Typography>
						<Box display='flex' justifyContent='end' width='100%'>
							<Typography variant={'subtitle3'} fontWeight={700}>
								{unidadesDisponibles}
							</Typography>
						</Box>
					</Box>
				</Box>
			</Box>

			<Box
				sx={
					expandidoPromoPush === id
						? {
								border: '1.5px solid #D9D9D9',
								borderTop: '0px',
								padding: '0 0 12px 0',
								borderRadius: '0 0 8px 8px',
						  }
						: {border: '0px', padding: '0 0 12px 0'}
				}
			>
				<Collapse in={expandidoPromoPush === id} timeout='auto' unmountOnExit>
					<Stack>
						<Box width='100%' display='flex' flexDirection='row'>
							<GridStyled item xs={7}>
								<Typography
									sx={{padding: '4px 14px 8px 14px'}}
									variant={'subtitle3'}
									fontWeight={700}
									letterSpacing='-0.4px'
								>
									{t('general.paquetes')}
								</Typography>
							</GridStyled>
							<GridStyled item xs={5}>
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
								<Box key={`${el.codigoProducto}${i}`}>
									<Grid container>
										<GridStyled item xs={7} padding='4px 14px'>
											<Box display='flex' flexDirection='column'>
												<Typography variant='subtitle3'>
													{el.codigoProducto}
												</Typography>

												<Typography variant='subtitle3'>
													{productos[el.codigoProducto].nombre}
												</Typography>
											</Box>
										</GridStyled>
										<GridStyled
											item
											xs={5}
											justifyContent='end'
											sx={{background: '#F5F0EF'}}
										>
											<Box
												display='flex'
												flexDirection='column'
												padding='4px 14px 4px 0'
											>
												<Box
													display='flex'
													flexDirection='column'
													gap='2px'
													marginBottom='12px'
												>
													<Box
														alignItems='center'
														display='flex'
														gap='4px'
														justifyContent='end'
													>
														<Box alignItems='center' display='flex' gap='2px'>
															{promoPush.componentes[i].unidadMedida ===
															'CAJ' ? (
																<CajaIcon height='18px' width='18px' />
															) : (
																<BotellaIcon height='15px' width='15px' />
															)}
															<Typography
																color={theme.palette.secondary.main}
																fontFamily='Open Sans'
																variant='caption'
															>
																{`x${promoPush.componentes[i].cantidad} `}
															</Typography>
														</Box>
														<Typography
															color={'#000000'}
															fontFamily='Open Sans'
															variant='caption'
														>
															{`${formatearNumero(el.precioBase, t)}`}
														</Typography>
													</Box>
													<Typography
														color='primary'
														fontFamily='Open Sans'
														variant='caption'
														textAlign='right'
													>
														{`${t('general.ahorras')}: ${formatearNumero(
															el.descuento,
															t
														)}`}
													</Typography>
												</Box>
												<Typography variant='subtitle3'>
													{`${t('general.total')}: ${formatearNumero(
														el.precioFinal,
														t
													)}`}
												</Typography>
											</Box>
										</GridStyled>
									</Grid>
									<Divider />
								</Box>
							))}
						</Box>
					</Stack>
				</Collapse>
				<Box marginTop='8px' padding='0 14px'>
					<ButtonStyled
						disableFocusRipple
						fullWidth
						disableRipple
						onClick={() =>
							manejadorExpandido(expandidoPromoPush === id ? false : id)
						}
					>
						<CardActions disableSpacing style={{padding: 0}}>
							<Box display='flex' gap='6px'>
								<Typography variant='caption' color='secondary.dark'>
									{expandidoPromoPush === id
										? t('general.ocultarDetalle')
										: t('general.verDetalle')}
								</Typography>
								<Box
									display='flex'
									className={clsx(classes.expand, {
										[classes.expandOpen]: expandidoPromoPush === id,
									})}
									aria-expanded={expandidoPromoPush === id}
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
	);
};
