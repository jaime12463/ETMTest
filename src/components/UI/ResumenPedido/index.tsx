import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import {CerrarIcon} from 'assests/iconos';
import useEstilos from './useEstilos';
import {
	useObtenerCompromisoDeCobroActual,
	useObtenerConfiguracion,
	useObtenerVisitaActual,
} from 'redux/hooks';
import {ETiposDePago, TConsolidadoImplicitos, TProductoPedido} from 'models';
import Resumen from './Resumen';
import theme from 'theme';
import {useTranslation} from 'react-i18next';
import {formatearFecha, formatearNumero} from 'utils/methods';
import {useObtenerBonificacionesHabilitadas} from 'hooks';
import {useObtenerConsolidacionImplicitos} from 'pages/Pasos/3_Otros/EnvasesRetornables/components/ContenedorEnvasesRetornables/hooks';
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

	const ventaCredito = [
		venta?.productos?.filter((producto) => {
			if (producto.tipoPago === ETiposDePago.Credito && !producto.promoPush) {
				return producto;
			}
		}),
		ventaenvase?.productos?.filter((producto) => {
			if (producto.tipoPago === ETiposDePago.Credito) {
				return producto;
			}
		}),
	].flat();

	const promocionesCredito = venta?.productos?.filter(
		(producto) =>
			producto.tipoPago === ETiposDePago.Credito && producto.promoPush
	);

	const ventaContado = [
		venta?.productos?.filter((producto) => {
			if (producto.tipoPago === ETiposDePago.Contado && !producto.promoPush) {
				return producto;
			}
		}),
		ventaenvase?.productos?.filter((producto) => {
			if (producto.tipoPago === ETiposDePago.Contado) {
				return producto;
			}
		}),
	].flat();

	const promocionesContado = venta?.productos?.filter(
		(producto) =>
			producto.tipoPago === ETiposDePago.Contado && producto.promoPush
	);

	let totalDescuentos = 0;
	let totalContado = 0;
	let totalCredito = 0;

	ventaContado?.forEach((producto) => {
		if (producto) {
			totalContado += producto?.total;
		}
	});

	promocionesContado?.forEach((promocion) => {
		if (promocion) {
			totalContado += promocion?.total;
		}
	});

	ventaCredito?.forEach((producto) => {
		if (producto) {
			totalCredito += producto?.total;
		}
	});

	promocionesCredito?.forEach((promocion) => {
		if (promocion) {
			totalCredito += promocion?.total;
		}
	});

	venta?.productos?.forEach((producto) => {
		if (
			producto.preciosBase.unidad !== producto.preciosNeto.unidad &&
			producto.preciosBase.subUnidad !== producto.preciosNeto.subUnidad
		) {
			const descuentoUnidad =
				(producto.preciosBase.unidad - producto.preciosNeto.unidad) *
				producto.unidades;
			const descuentoSubUnidad =
				(producto.preciosBase.subUnidad - producto.preciosNeto.subUnidad) *
				producto.subUnidades;

			totalDescuentos += descuentoUnidad + descuentoSubUnidad;
		}
	});

	venta?.productos?.forEach((producto) => {
		if (producto.descuentoPromoPush) {
			totalDescuentos += producto.descuentoPromoPush * producto.unidades;
		}
	});

	const {t} = useTranslation();

	const {tipoPedidos} = useObtenerConfiguracion();
	const obtenerConsolidacionImplicitos = useObtenerConsolidacionImplicitos();

	let pedidosArray: TProductoPedido[] = [];
	let esGeneraEnvases = false;
	let puedeVerEnvases = false;

	Object.values(visitaActual.pedidos).forEach((pedido) => {
		tipoPedidos.forEach((tipoPedido) => {
			if (tipoPedido.codigo === pedido.tipoPedido)
				esGeneraEnvases = tipoPedido.generaEnvases;
			if (tipoPedido.generaEnvases && pedido.productos.length) {
				puedeVerEnvases = true;
			}
		});

		if (esGeneraEnvases) pedidosArray = pedidosArray.concat(pedido.productos);
	});

	const consolidacionImplicitos: TConsolidadoImplicitos[] =
		obtenerConsolidacionImplicitos(pedidosArray).sort((a, b) =>
			a.tipoPago !== undefined && b.tipoPago !== undefined
				? a.codigoImplicito - b.codigoImplicito || a.tipoPago - b.tipoPago
				: a.codigoImplicito - b.codigoImplicito
		);

	const envasesRetorno = consolidacionImplicitos?.map((envase) => {
		const existeEnvaseVenta = ventaenvase?.productos?.find(
			(producto) => envase.codigoImplicito === producto.codigoProducto
		);
		const existeEnvasePrestamo = prestamoenvase?.productos?.find(
			(producto) => envase.codigoImplicito === producto.codigoProducto
		);

		let cantidadDeRetorno = envase;

		if (existeEnvaseVenta) {
			cantidadDeRetorno.unidades -= existeEnvaseVenta.unidades;
			cantidadDeRetorno.subUnidades -= existeEnvaseVenta.subUnidades;
		}

		if (existeEnvasePrestamo) {
			cantidadDeRetorno.unidades -= existeEnvasePrestamo.unidades;
			cantidadDeRetorno.subUnidades -= existeEnvasePrestamo.subUnidades;
		}

		return cantidadDeRetorno;
	});

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
							{t('general.resumenDePedido')}
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
								{t('general.fechaEntrega')}
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
										if (!producto) return null;

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
										if (!producto) return null;

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

							{(prestamoenvase?.productos?.length > 0 ||
								envasesRetorno?.length > 0) && (
								<Resumen.Container>
									<Resumen.Titulo background={theme.palette.secondary.main}>
										{t('general.envases')}
									</Resumen.Titulo>
									{prestamoenvase?.productos?.map((envase, index) => {
										return (
											<Box key={`${envase.codigoProducto}${index}`}>
												<Resumen.Envases
													producto={{...envase, tipo: 'prestamo'}}
													key={`${envase.codigoProducto}${index}`}
												/>
												{index !== prestamoenvase?.productos?.length - 1 && (
													<Divider />
												)}
											</Box>
										);
									})}
									{prestamoenvase?.productos?.length > 0 &&
										envasesRetorno?.length > 0 && <Divider />}
									{envasesRetorno?.map((envase, index) => {
										if (envase.unidades === 0) {
											return;
										}

										return (
											<Box key={`${envase.codigoImplicito} ${index}`}>
												<Resumen.Envases retorno={envase} />
												{index !== envasesRetorno?.length - 1 && <Divider />}
											</Box>
										);
									})}
								</Resumen.Container>
							)}

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
									{t('general.totalContado')}
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
									{t('general.totalCredito')}
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
									{t('general.totalDeAhorro')}
								</Typography>
								<Typography variant='subtitle3' color='#000'>
									{formatearNumero(totalDescuentos, t)}
								</Typography>
							</Box>
							<Box
								display='flex'
								justifyContent='space-between'
								padding='12px 14px'
								sx={{background: '#F5F0EF50'}}
							>
								<Typography variant='subtitle3' color='#000'>
									{t('general.totalCargosFinancieros')}
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
