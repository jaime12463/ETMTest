import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import {CerrarIcon} from 'assests/iconos';
import {
	useObtenerClienteActual,
	useObtenerCompromisoDeCobroActual,
	useObtenerConfiguracion,
	useObtenerVisitaActual,
} from 'redux/hooks';
import {
	EFormaBeneficio,
	ETiposDePago,
	TConsolidadoImplicitos,
	TProductoPedido,
} from 'models';
import {Resumen} from './Resumen';
import theme from 'theme';
import {useTranslation} from 'react-i18next';
import {formatearNumero} from 'utils/methods';
import {
	useCalularProductoEnPromoOnGoing,
	useObtenerBonificacionesHabilitadas,
	useObtenerDatosCliente,
} from 'hooks';
import {
	useCalcularEnvasesDeObsequios,
	useObtenerConsolidacionImplicitos,
} from 'pages/Pasos/3_Otros/EnvasesRetornables/components/ContenedorEnvasesRetornables/hooks';
import {TPromoOngoingAplicables} from 'utils/procesos/promociones/PromocionesOngoing';
import i18n from '../../../lang/i18n';

interface Props {
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ResumenPedido: React.FC<Props> = ({setOpen}) => {
	const compromisoDeCobro = useObtenerCompromisoDeCobroActual();
	const visitaActual = useObtenerVisitaActual();
	const {venta, canje, prestamoenvase, ventaenvase} = visitaActual.pedidos;
	const {promosOngoing} = visitaActual;
	const clienteActual = useObtenerClienteActual();
	const {datosCliente} = useObtenerDatosCliente(clienteActual.codigoCliente);
	const bonificacionesHabilitadas = useObtenerBonificacionesHabilitadas();
	const bonificacionesCliente = bonificacionesHabilitadas();
	const calcularEnvasesDeObsequios = useCalcularEnvasesDeObsequios();
	const calularPruductoEnPromoOnGoing = useCalularProductoEnPromoOnGoing();

	const bonificaciones = visitaActual.bonificaciones.map(
		(bonificacion, index) => ({
			id: bonificacion.idBonificacion,
			nombre: bonificacionesCliente[index].nombreBonificacion,
			detalle: bonificacion.detalle,
		})
	);

	const [promoOngoingCredito, promoOngoingContado] = promosOngoing.reduce(
		(acc, promocion) => {
			promocion.tipoPago === ETiposDePago.Credito
				? acc[0].push(promocion)
				: acc[1].push(promocion);

			return acc;
		},
		[[], []] as [TPromoOngoingAplicables[], TPromoOngoingAplicables[]]
	);

	const cantidadBonificaciones = visitaActual.bonificaciones
		.map((bonificacion) => bonificacion.detalle)
		.flat().length;

	const canjes = canje?.productos?.map((producto) => producto);

	let totalDescuentos = 0;
	let totalContado = 0;
	let totalCredito = 0;

	totalContado += compromisoDeCobro.monto > 0 ? compromisoDeCobro.monto : 0;

	const [ventaCredito, ventaContado, promocionesCredito, promocionesContado] =
		venta?.productos.reduce(
			(acc, producto) => {
				// Se evaluan las condiciones de los productos y se hace push a su array correspondiente. De esta manera se recorre el array de prodcutos una única vez.
				// arr[0] = venta credito | arr[1] = venta contado | arr[2] = promociones credito | arr[3] = promociones contado

				const infoBeneficio = calularPruductoEnPromoOnGoing(
					producto.codigoProducto
				);

				//Se evalua si el producto esta en PromoOngoing
				if (
					infoBeneficio.cantidad &&
					infoBeneficio.tipoPago === ETiposDePago.Credito &&
					infoBeneficio.formaBeneficio !== EFormaBeneficio.Obsequio
				) {
					let unidadesFinales = producto.unidades;
					let subUnidadesFinales = producto.subUnidades;

					if (infoBeneficio.unidadMedida === 'Unidad') {
						unidadesFinales = producto.unidades - infoBeneficio.cantidad;
					} else {
						subUnidadesFinales = producto.subUnidades - infoBeneficio.cantidad;
					}

					totalCredito += producto.total;
					// Si unidadesFinales === 0 && subUnidadesFinales === 0 el producto esta en su totalidad en promoOngoing, por ende no se muestra en el apartado crédito.
					if (unidadesFinales > 0 || subUnidadesFinales > 0) {
						acc[0].push(producto);
					}
				} else if (
					producto.tipoPago === ETiposDePago.Credito &&
					!producto.promoPush &&
					(producto.unidades > 0 || producto.subUnidades > 0)
				) {
					totalCredito += producto.total;
					acc[0].push(producto);
				}

				//Se evalua si el producto esta en PromoOngoing
				if (
					infoBeneficio.cantidad &&
					infoBeneficio.tipoPago === ETiposDePago.Contado &&
					infoBeneficio.formaBeneficio !== EFormaBeneficio.Obsequio
				) {
					let unidadesFinales = producto.unidades;
					let subUnidadesFinales = producto.subUnidades;

					if (infoBeneficio.unidadMedida === 'Unidad') {
						unidadesFinales = producto.unidades - infoBeneficio.cantidad;
					} else {
						subUnidadesFinales = producto.subUnidades - infoBeneficio.cantidad;
					}

					totalContado += producto.total;
					// Si unidadesFinales === 0 && subUnidadesFinales === 0 el producto esta en su totalidad en promoOngoing, por ende no se muestra en el apartado contado.
					if (unidadesFinales > 0 || subUnidadesFinales > 0) {
						acc[1].push(producto);
					}
				} else if (
					producto.tipoPago === ETiposDePago.Contado &&
					!producto.promoPush &&
					(producto.unidades > 0 || producto.subUnidades > 0)
				) {
					totalContado += producto.total;
					acc[1].push(producto);
				}

				if (
					producto.tipoPago === ETiposDePago.Credito &&
					producto.promoPush &&
					(producto.unidades > 0 || producto.subUnidades > 0)
				) {
					totalCredito += producto.total;
					acc[2].push(producto);
				}

				if (
					producto.tipoPago === ETiposDePago.Contado &&
					producto.promoPush &&
					(producto.unidades > 0 || producto.subUnidades > 0)
				) {
					totalContado += producto.total;
					acc[3].push(producto);
				}

				if (producto.descuentoPromoPush) {
					totalDescuentos += producto.descuentoPromoPush * producto.unidades;
				}

				// Si el producto tiene PromoOngoing
				if (infoBeneficio.cantidad) {
					// Si la PromoOngoing es Descuento Monto | Descuento Porcentaje
					if (
						infoBeneficio.formaBeneficio === EFormaBeneficio.DescuentoMonto ||
						infoBeneficio.formaBeneficio === EFormaBeneficio.DescuentoPorcentaje
					) {
						// Se verifica la unidad de medida para saber donde calcular los descuentos
						if (infoBeneficio.unidadMedida === 'Unidad') {
							if (infoBeneficio.cantidad === producto.unidades) {
								totalDescuentos +=
									producto.precioConImpuestoUnidad * infoBeneficio.cantidad -
									producto.preciosPromo.unidad * infoBeneficio.cantidad;
							} else {
								const descuentoSinPromoOngoing =
									producto.precioConImpuestoUnidad *
										(producto.unidades - infoBeneficio.cantidad) -
									producto.preciosNeto.unidad *
										(producto.unidades - infoBeneficio.cantidad);

								const descuentoPromoOngoing =
									producto.precioConImpuestoUnidad * infoBeneficio.cantidad -
									producto.preciosPromo.unidad * infoBeneficio.cantidad;

								totalDescuentos +=
									descuentoSinPromoOngoing + descuentoPromoOngoing;
							}
						} else {
							if (infoBeneficio.cantidad === producto.subUnidades) {
								totalDescuentos +=
									producto.precioConImpuestoSubunidad * infoBeneficio.cantidad -
									producto.preciosPromo.subUnidad * infoBeneficio.cantidad;
							} else {
								const descuentoSinPromoOngoing =
									producto.precioConImpuestoSubunidad *
										(producto.subUnidades - infoBeneficio.cantidad) -
									producto.preciosNeto.subUnidad *
										(producto.subUnidades - infoBeneficio.cantidad);

								const descuentoPromoOngoing =
									producto.precioConImpuestoSubunidad * infoBeneficio.cantidad -
									producto.preciosPromo.subUnidad * infoBeneficio.cantidad;

								totalDescuentos +=
									descuentoSinPromoOngoing + descuentoPromoOngoing;
							}
						}
					}
					// Si no hay PromoOngoing se verifica que si precios base es !== a precios neto ==> hay descuentos por calcular
				} else if (
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

				return acc;
			},
			[[], [], [], []] as [
				TProductoPedido[],
				TProductoPedido[],
				TProductoPedido[],
				TProductoPedido[]
			]
		);

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

	pedidosArray = pedidosArray.concat(calcularEnvasesDeObsequios());

	const consolidacionImplicitos: TConsolidadoImplicitos[] =
		obtenerConsolidacionImplicitos(pedidosArray).sort((a, b) =>
			!!a.tipoPago && !!b.tipoPago
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

	const hayEnvasesParaRetorno = envasesRetorno?.some(
		(envase) => envase.unidades > 0 || envase.subUnidades > 0
	);

	const lenguaje = i18n.language !== 'br' ? i18n.language : 'pt';

	const fechaEntregaSplit = visitaActual.fechaEntrega.split('-');
	const fechaEntrega = new Date(
		Number(fechaEntregaSplit[0]),
		Number(fechaEntregaSplit[1]) - 1,
		Number(fechaEntregaSplit[2])
	);

	let fechaFormateada = new Intl.DateTimeFormat(lenguaje, {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	}).format(fechaEntrega);

	// Si el lenguaje no es ingles, se pasa a mayuscula el mes
	if (lenguaje !== 'en') {
		let aux = fechaFormateada.split(' ');
		aux[2] = aux[2].slice(0, 1).toUpperCase() + aux[2].slice(1);
		fechaFormateada = aux.join(' ');
	}

	return (
		<Box sx={{background: '#fff'}} borderRadius='8px' width='100%'>
			<Box
				display='flex'
				justifyContent='flex-end'
				padding='22px 24px 10px 24px'
			>
				<IconButton
					onClick={() => setOpen((prevState) => !prevState)}
					sx={{padding: 0}}
				>
					<CerrarIcon />
				</IconButton>
			</Box>
			<Typography
				variant='subtitle2'
				fontFamily='Open Sans'
				color='#000'
				textAlign='center'
				marginBottom='10px'
			>
				{t('general.resumenDePedido')}
			</Typography>
			<Box
				alignItems='center'
				display='flex'
				justifyContent='center'
				gap='10px'
				width='100%'
			>
				<Typography variant='subtitle3' fontFamily='Open Sans' color='#565657'>
					{t('general.fechaEntrega')}:
				</Typography>
				<Typography variant='body3' fontFamily='Open Sans' color='#565657'>
					{fechaFormateada}
				</Typography>
			</Box>

			<Stack spacing='20px' padding='16px 18px 20px 18px' width='100%'>
				{!!ventaCredito.length && (
					<Resumen.Container>
						<Resumen.Titulo background={theme.palette.success.dark}>
							{t('general.credito')}
						</Resumen.Titulo>
						<Box border={`1px solid ${theme.palette.success.dark}`}>
							{ventaCredito
								.sort((a, b) => (a.codigoProducto > b.codigoProducto ? 1 : -1))
								.map((producto, index) => {
									return (
										<Box key={producto.codigoProducto}>
											<Resumen.Tarjeta producto={producto} />
											{index !== ventaCredito.length - 1 && (
												<Divider
													sx={{borderColor: theme.palette.success.dark}}
												/>
											)}
										</Box>
									);
								})}
						</Box>
					</Resumen.Container>
				)}

				{!!ventaContado.length && (
					<Resumen.Container>
						<Resumen.Titulo background={theme.palette.secondary.dark}>
							{t('general.contado')}
						</Resumen.Titulo>
						<Box border='1px solid #000'>
							{ventaContado
								.sort((a, b) => (a.codigoProducto > b.codigoProducto ? 1 : -1))
								.map((producto, index) => {
									return (
										<Box key={producto.codigoProducto}>
											<Resumen.Tarjeta producto={producto} />
											{index !== ventaContado.length - 1 && (
												<Divider sx={{borderColor: '#000'}} />
											)}
										</Box>
									);
								})}
						</Box>
					</Resumen.Container>
				)}

				{!!promocionesCredito.length && (
					<Resumen.Container>
						<Resumen.Titulo
							background={theme.palette.primary.dark}
							label='credito'
						>
							{t('general.promocionesPushACredito')}
						</Resumen.Titulo>
						{promocionesCredito
							.sort((a, b) => (a.codigoProducto > b.codigoProducto ? 1 : -1))
							.map((promocion) => {
								return (
									<Resumen.PromoPush
										key={promocion.codigoProducto}
										promocion={promocion}
									/>
								);
							})}
					</Resumen.Container>
				)}

				{!!promocionesContado.length && (
					<Resumen.Container>
						<Resumen.Titulo
							background={theme.palette.primary.dark}
							label='contado'
						>
							{t('general.promocionesPushAContado')}
						</Resumen.Titulo>
						{promocionesContado
							.sort((a, b) => (a.codigoProducto > b.codigoProducto ? 1 : -1))
							.map((promocion) => {
								return (
									<Resumen.PromoPush
										key={promocion.codigoProducto}
										promocion={promocion}
									/>
								);
							})}
					</Resumen.Container>
				)}

				{!!promoOngoingCredito.length && (
					<Resumen.Container>
						<Resumen.Titulo
							background={theme.palette.primary.dark}
							label='credito'
						>
							{t('general.promocionesOngoingACredito')}
						</Resumen.Titulo>
						{promoOngoingCredito
							.sort((a, b) => (a.promocionID > b.promocionID ? 1 : -1))
							.map((promo) => (
								<Resumen.PromoOngoing
									promocion={promo}
									key={promo.promocionID}
								/>
							))}
					</Resumen.Container>
				)}

				{!!promoOngoingContado.length && (
					<Resumen.Container>
						<Resumen.Titulo
							background={theme.palette.primary.dark}
							label='contado'
						>
							{t('general.promocionesOngoingAContado')}
						</Resumen.Titulo>
						{promoOngoingContado
							.sort((a, b) => (a.promocionID > b.promocionID ? 1 : -1))
							.map((promo) => (
								<Resumen.PromoOngoing
									promocion={promo}
									key={promo.promocionID}
								/>
							))}
					</Resumen.Container>
				)}

				{(!!prestamoenvase?.productos?.length ||
					hayEnvasesParaRetorno ||
					!!ventaenvase?.productos?.length) && (
					<Resumen.Container>
						<Resumen.Titulo background={theme.palette.secondary.main}>
							{t('general.envases')}
						</Resumen.Titulo>
						<Box border={`1px solid ${theme.palette.secondary.main}`}>
							{ventaenvase?.productos?.map((envase, index) => {
								return (
									<Box key={`${envase.codigoProducto}${index}`}>
										<Resumen.Envases
											producto={{...envase, tipo: 'venta'}}
											key={`${envase.codigoProducto}${index}`}
										/>
										{index !== ventaenvase?.productos?.length - 1 && (
											<Divider
												sx={{borderColor: theme.palette.secondary.main}}
											/>
										)}
									</Box>
								);
							})}
							{!!prestamoenvase?.productos?.length &&
								!!envasesRetorno?.length && (
									<Divider sx={{borderColor: theme.palette.secondary.main}} />
								)}
							{prestamoenvase?.productos?.map((envase, index) => {
								return (
									<Box key={`${envase.codigoProducto}${index}`}>
										<Resumen.Envases
											producto={{...envase, tipo: 'prestamo'}}
											key={`${envase.codigoProducto}${index}`}
										/>
										{index !== prestamoenvase?.productos?.length - 1 && (
											<Divider
												sx={{borderColor: theme.palette.secondary.main}}
											/>
										)}
									</Box>
								);
							})}
							{!!prestamoenvase?.productos?.length &&
								!!envasesRetorno?.length && (
									<Divider sx={{borderColor: theme.palette.secondary.main}} />
								)}
							{envasesRetorno?.map((envase, index) => {
								if (envase.unidades === 0) {
									return;
								}

								return (
									<Box key={`${envase.nombreImplicito} ${index}`}>
										<Resumen.Envases retorno={envase} />
										{index !== envasesRetorno?.length - 1 && (
											<Divider
												sx={{borderColor: theme.palette.secondary.main}}
											/>
										)}
									</Box>
								);
							})}
						</Box>
					</Resumen.Container>
				)}

				{!!canjes.length && (
					<Resumen.Container>
						<Resumen.Titulo background={theme.palette.secondary.main}>
							{t('titulos.canjes')}
						</Resumen.Titulo>
						<Box border={`1px solid ${theme.palette.secondary.main}`}>
							{canjes.map((canje, index) => {
								return (
									<Box key={canje.codigoProducto}>
										<Resumen.Canjes producto={canje} />
										{index !== canjes.length - 1 && (
											<Divider
												sx={{borderColor: theme.palette.secondary.main}}
											/>
										)}
									</Box>
								);
							})}
						</Box>
					</Resumen.Container>
				)}

				{!!cantidadBonificaciones && (
					<Resumen.Container>
						<Resumen.Titulo background={theme.palette.secondary.main}>
							{t('titulos.bonificaciones')}
						</Resumen.Titulo>
						<Resumen.Bonificaciones bonificaciones={bonificaciones} />
					</Resumen.Container>
				)}

				{!!compromisoDeCobro.monto && (
					<Resumen.Container>
						<Resumen.Titulo background={theme.palette.secondary.main}>
							{t('general.compromisoCobro')}
						</Resumen.Titulo>
						<Resumen.CompromisoDeCobro />
					</Resumen.Container>
				)}

				{!!visitaActual.ordenDeCompra && (
					<Resumen.Container>
						<Resumen.Titulo background={theme.palette.secondary.main}>
							{t('titulos.ordenDeCompra')}
						</Resumen.Titulo>
						<Resumen.OrdenDeCompra ordenDeCompra={visitaActual.ordenDeCompra} />
					</Resumen.Container>
				)}
			</Stack>
			<Box padding='0 18px 16px 18px' width='100%'>
				<Box border={`1px solid ${theme.palette.secondary.main}`}>
					<Box
						display='flex'
						justifyContent='space-between'
						padding='12px 14px'
						sx={{background: '#F5F0EF'}}
					>
						<Typography variant='subtitle3' color='#000'>
							{t('general.totalContado')}:
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
							{t('general.totalCredito')}:
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
							{t('general.totalDeAhorro')}:
						</Typography>
						<Typography variant='subtitle3' color='#000'>
							{formatearNumero(totalDescuentos, t)}
						</Typography>
					</Box>
					{datosCliente?.informacionCrediticia.habilitaCargosFinancieros && (
						<Box
							display='flex'
							justifyContent='space-between'
							padding='12px 14px'
							sx={{background: '#F5F0EF50'}}
						>
							<Typography variant='subtitle3' color='#000'>
								{t('general.totalCargosFinancieros')}:
							</Typography>
							<Typography variant='subtitle3' color='#000'>
								{formatearNumero(0, t)}
							</Typography>
						</Box>
					)}
				</Box>
			</Box>
		</Box>
	);
};

export default ResumenPedido;
