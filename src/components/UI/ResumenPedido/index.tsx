import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import {CerrarIcon} from 'assests/iconos';
import useEstilos from './useEstilos';
import {
	useObtenerCompromisoDeCobroActual,
	useObtenerVisitaActual,
} from 'redux/hooks';
import {ETiposDePago} from 'models';
import Resumen from './Resumen';
import theme from 'theme';
import {ProductoEnvases} from './Resumen/Envases';
import {useTranslation} from 'react-i18next';
import {formatearFecha, formatearNumero} from 'utils/methods';
import {useObtenerBonificacionesHabilitadas} from 'hooks';
interface Props {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ResumenPedido: React.FC<Props> = ({open, setOpen}) => {
	const classes = useEstilos({open});
	const compromisoDeCobro = useObtenerCompromisoDeCobroActual();
	const visitaActual = useObtenerVisitaActual();
	const {venta, canje, prestamoenvase, ventaenvase} = visitaActual.pedidos;

	const bonificacionesHabilitadas = useObtenerBonificacionesHabilitadas();
	const bonificacionesCliente = bonificacionesHabilitadas();

	const bonificaciones = visitaActual.bonificaciones.map(
		(bonificacion, index) => ({
			id: bonificacion.idBonificacion,
			nombre: bonificacionesCliente[index].nombreBonificacion,
			detalle: bonificacion.detalle,
		})
	);

	const cantidadBonificaciones = visitaActual.bonificaciones
		.map((bonificacion) => bonificacion.detalle)
		.flat().length;

	const canjes = canje?.productos?.map((producto) => producto);

	// const envases: ProductoEnvases[] = [
	// 	...prestamoenvase.productos.map((producto) => ({
	// 		...producto,
	// 		tipo: 'prestamo',
	// 	})),
	// 	...ventaenvase.productos.map((producto) => ({...producto, tipo: 'venta'})),
	// ];

	const ventaCredito = venta?.productos?.filter(
		(producto) =>
			producto.tipoPago === ETiposDePago.Credito && !producto.promoPush
	);

	const promocionesCredito = venta?.productos?.filter(
		(producto) =>
			producto.tipoPago === ETiposDePago.Credito && producto.promoPush
	);

	const ventaContado = venta?.productos?.filter(
		(producto) =>
			producto.tipoPago === ETiposDePago.Contado && !producto.promoPush
	);

	const promocionesContado = venta?.productos?.filter(
		(producto) =>
			producto.tipoPago === ETiposDePago.Contado && producto.promoPush
	);

	const totalContado =
		ventaContado?.reduce((total, actual) => (total += actual.total), 0) +
		promocionesContado?.reduce((total, actual) => (total += actual.total), 0);

	const totalCredito =
		ventaCredito?.reduce((total, actual) => (total += actual.total), 0) +
		promocionesCredito?.reduce((total, actual) => (total += actual.total), 0);

	const {t} = useTranslation();

	return (
		<>
			{open && (
				<Box className={classes.container}>
					<Box className={classes.card}>
						<Box
							display='flex'
							justifyContent='end'
							marginBottom='10px'
							onClick={() => setOpen((prevState) => !prevState)}
							sx={{cursor: 'pointer'}}
						>
							<CerrarIcon fill='#565657' />
						</Box>
						<Typography
							variant='subtitle2'
							fontFamily='Open Sans'
							color='#565657'
							textAlign='center'
							marginBottom='4px'
						>
							Resumen del pedido
						</Typography>
						<Box
							alignItems='center'
							display='flex'
							justifyContent='center'
							gap='2px'
						>
							<Typography
								variant='subtitle3'
								fontFamily='Open Sans'
								color='#565657'
							>
								Fecha de entrega:
							</Typography>
							<Typography
								variant='body3'
								fontFamily='Open Sans'
								color='#565657'
							>
								{formatearFecha(visitaActual.fechaEntrega, t)}
							</Typography>
						</Box>
						<Stack spacing='24px' margin='40px 0'>
							{(ventaCredito.length > 0 || promocionesCredito.length > 0) && (
								<Resumen.Container>
									<Resumen.Titulo background={theme.palette.success.dark}>
										{t('general.credito')}
									</Resumen.Titulo>
									{ventaCredito.map((producto, index) => {
										return (
											<Box key={producto.codigoProducto}>
												<Resumen.Tarjeta producto={producto} />
												{index !== ventaCredito.length - 1 && <Divider />}
											</Box>
										);
									})}
									{promocionesCredito.length > 0 && (
										<>
											<Resumen.TituloPromo />
											{promocionesCredito.map((promocion) => {
												return (
													<Resumen.PromoPush
														key={promocion.codigoProducto}
														promocion={promocion}
													/>
												);
											})}
										</>
									)}
								</Resumen.Container>
							)}

							{(ventaContado.length > 0 || promocionesContado.length > 0) && (
								<Resumen.Container>
									<Resumen.Titulo background={theme.palette.secondary.dark}>
										{t('general.contado')}
									</Resumen.Titulo>
									{ventaContado.map((producto, index) => {
										return (
											<Box key={producto.codigoProducto}>
												<Resumen.Tarjeta producto={producto} />
												{index !== ventaCredito.length - 1 && <Divider />}
											</Box>
										);
									})}
									{promocionesContado.length > 0 && (
										<>
											<Resumen.TituloPromo />
											{promocionesContado.map((promocion) => {
												return (
													<Resumen.PromoPush
														key={promocion.codigoProducto}
														promocion={promocion}
													/>
												);
											})}
										</>
									)}
								</Resumen.Container>
							)}

							{ventaenvase?.productos?.length > 0 ||
								(prestamoenvase?.productos?.length > 0 && (
									<Resumen.Container>
										<Resumen.Titulo background={theme.palette.secondary.main}>
											{t('general.envases')}
										</Resumen.Titulo>
										{ventaenvase?.productos?.map((envase, index) => {
											return (
												<Box key={`${envase.codigoProducto} ${index}`}>
													<Resumen.Envases
														producto={{...envase, tipo: 'venta'}}
													/>
													{index !== ventaenvase?.productos?.length - 1 && (
														<Divider />
													)}
												</Box>
											);
										})}
										{prestamoenvase?.productos?.map((envase, index) => {
											return (
												<Box key={`${envase.codigoProducto} ${index}`}>
													<Resumen.Envases
														producto={{...envase, tipo: 'prestamo'}}
													/>
													{index !== prestamoenvase?.productos?.length - 1 && (
														<Divider />
													)}
												</Box>
											);
										})}
									</Resumen.Container>
								))}

							{canjes.length > 0 && (
								<Resumen.Container>
									<Resumen.Titulo background={theme.palette.secondary.main}>
										Canjes
									</Resumen.Titulo>
									{canjes.map((canje, index) => {
										return (
											<Box key={canje.codigoProducto}>
												<Resumen.Canjes producto={canje} />
												{index !== canjes.length - 1 && <Divider />}
											</Box>
										);
									})}
								</Resumen.Container>
							)}

							{cantidadBonificaciones > 0 && (
								<Resumen.Container>
									<Resumen.Titulo
										background={theme.palette.secondary.main}
										bonificacion
									>
										{t('titulos.bonificaciones')}
									</Resumen.Titulo>
									<Resumen.Bonificaciones bonificaciones={bonificaciones} />
								</Resumen.Container>
							)}

							{compromisoDeCobro.monto !== 0 && (
								<Resumen.Container>
									<Resumen.Titulo background={theme.palette.secondary.main}>
										{t('general.compromisoCobro')}
									</Resumen.Titulo>
									<Resumen.CompromisoDeCobro />
								</Resumen.Container>
							)}

							{visitaActual.ordenDeCompra !== '' && (
								<Resumen.Container>
									<Resumen.Titulo background={theme.palette.secondary.main}>
										{t('titulos.ordenDeCompra')}
									</Resumen.Titulo>
									<Resumen.OrdenDeCompra
										ordenDeCompra={visitaActual.ordenDeCompra}
									/>
								</Resumen.Container>
							)}
						</Stack>
						<Box>
							<Box
								display='flex'
								justifyContent='space-between'
								padding='12px 14px'
								sx={{background: '#F5F0EF'}}
							>
								<Typography variant='subtitle3' color='#000'>
									Total contado:
								</Typography>
								<Typography variant='subtitle3' color='#000'>
									{formatearNumero(totalContado, t)}
								</Typography>
							</Box>
							<Box
								display='flex'
								justifyContent='space-between'
								padding='12px 14px'
								sx={{background: '#F5F0EF50'}}
							>
								<Typography variant='subtitle3' color='#000'>
									Total credito:
								</Typography>
								<Typography variant='subtitle3' color='#000'>
									{formatearNumero(totalCredito, t)}
								</Typography>
							</Box>
							<Box
								display='flex'
								justifyContent='space-between'
								padding='12px 14px'
								sx={{background: '#F5F0EF'}}
							>
								<Typography variant='subtitle3' color='#000'>
									Total de ahorro:
								</Typography>
								<Typography variant='subtitle3' color='#000'>
									{formatearNumero(0, t)}
								</Typography>
							</Box>
							<Box
								display='flex'
								justifyContent='space-between'
								padding='12px 14px'
								sx={{background: '#F5F0EF50'}}
							>
								<Typography variant='subtitle3' color='#000'>
									Total de cargos financieros:
								</Typography>
								<Typography variant='subtitle3' color='#000'>
									{formatearNumero(0, t)}
								</Typography>
							</Box>
						</Box>
					</Box>
				</Box>
			)}
		</>
	);
};

export default ResumenPedido;
