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

import {useObtenerDatos} from 'redux/hooks';
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

	const manejadorExpandido =
		({id}: any) =>
		(event: React.SyntheticEvent) => {
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
						: {backgroundColor: '#FFFFFF', padding: '0 0 12px 0',}
				}
			>
				<Box
					display='grid'
					gridTemplateColumns='repeat(2, 1fr)'
					sx={
						expandidoPromoPush === id ? {color: '#FFFFFF'} : {color: '#000000'}
					}
				>
					<Box display='flex' flexDirection='column' padding="12px 14px 0 14px">
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
								backgroundColor: '#FF0000',
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
								Ahorras: {formatearNumero(precioConImpuestoUnidad, t)}
							</Typography>
						</Box>
					</Box>
					<Box
						display='flex'
						flexDirection='column'
						justifyContent='center'
						alignItems='center'
						ml={5}
						paddingRight="14px"
					>
						<Typography
							variant='caption'
							marginBottom='5px'
							fontFamily='Open Sans'
							textAlign="right"
							sx={{width: '100%'}}
							color={expandidoPromoPush === id ? 'white' : 'black'}
						>
							Unidades máximas que puedes aplicar:
						</Typography>
						<Box display='flex' justifyContent="end" width="100%">
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
								borderRadius: '0 0 8px 8px'
						  }
						: {border: '0px', padding: '0 0 12px 0'}
				}
			>
				<Collapse in={expandidoPromoPush === id} timeout='auto' unmountOnExit>
					<Stack>
					<Box width='100%' display='flex' flexDirection='row'>
								<GridStyled item xs={7}>
									<Typography
										sx={{padding: '12px 14px'}}
										variant={'subtitle3'}
										fontWeight={700}
									>
										Paquetes
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
							{
								componentes?.map((el: any, i: number) => (
									<Box key={`${el.codigoProducto}${i}`}>
										<Grid container>
											<GridStyled item xs={7} padding="0 14px" mt={1}>
												<Box display='flex' flexDirection='column'>
													<Typography variant='subtitle3'>
														{el.codigoProducto}
													</Typography>

													<Typography variant='subtitle3'>
														{productos[el.codigoProducto].nombre}
													</Typography>
												</Box>
											</GridStyled>
											<GridStyled item xs={5} justifyContent="end" sx={{background: '#F5F0EF'}}>
												<Box
													display='flex'
													flexDirection='column'
													marginBottom='8px'
													mt={1}
													paddingRight="14px"
												>
													<Box display='flex' textAlign='center' justifyContent="end" >
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
									</Box>
								))}
						</Box>
					</Stack>
				</Collapse>
				<Box marginTop='8px' padding="0 14px">
					<ButtonStyled
						disableFocusRipple
						fullWidth
						disableRipple
						onClick={manejadorExpandido({
							id: expandidoPromoPush === id ? false : id,
						})}
					>
						<CardActions disableSpacing style={{padding: 0}}>
							<Box display='flex' gap='6px'>
								<Typography variant='caption' color='secondary'>
									Ver detalle
								</Typography>
								<Box
								display='flex'
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
	);
};
