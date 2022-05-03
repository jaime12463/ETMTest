import React from 'react';
import {CheckRedondoIcon, FlechaAbajoIcon} from 'assests/iconos';
import theme from 'theme';
import {useTranslation} from 'react-i18next';
import {
	EFormaBeneficio,
	EFormaDeAsignacion,
	ETipoProducto,
	ETiposDePago,
	TCliente,
	TClienteActual,
	TCodigoCantidad,
	TPromoOngoing,
} from 'models';
import {
	useAppDispatch,
	useObtenerVisitaActual,
	useObtenerClienteActual,
	useObtenerPedidoActual,
} from 'redux/hooks';
import {
	agregarBeneficiosPromoOngoing,
	agregarProductoDelPedidoActual,
} from 'redux/features/visitaActual/visitaActualSlice';
import {
	TProductosUsadosEnOtrasPromos,
	TPromoOngoingAplicables,
	PromocionesOngoing,
	TPromoOngoingDisponibilidad,
} from 'utils/procesos/promociones/PromocionesOngoing';
import {TarjetaPromociones} from './TarjetaPromociones';
import {
	Box,
	Button,
	Card as CardMUI,
	Collapse,
	Divider,
	Stack,
	Typography,
} from '@mui/material';
import {
	useMostrarAviso,
	useObtenerPreciosProductosDelCliente,
	useObtenerDatosCliente,
} from 'hooks';
import {BotonSmall, MaterialSelect} from 'components/UI';
import {useObtenerDatosProducto} from 'pages/Pasos/3_Otros/EnvasesRetornables/components/ContenedorEnvasesRetornables/hooks';

export interface CardProps {
	promocionesOngoing: PromocionesOngoing;
	promocionAutomatica?: boolean;
	tipo?: 'contado' | 'credito';
	soloLectura?: boolean;
	setExpandidoexpandido: React.Dispatch<React.SetStateAction<string | boolean>>;
	expandido: string | boolean;
	promocion: TPromoOngoing & TPromoOngoingAplicables;
	promosMismosRequisitos?: TProductosUsadosEnOtrasPromos;
	borroPromociones?: {
		credito: boolean;
		contado: boolean;
	};
	index: number;
	promosDisponibles?: TPromoOngoingDisponibilidad;
	setpromosDisponibles?: React.Dispatch<
		React.SetStateAction<TPromoOngoingDisponibilidad>
	>;
	setBorroPromociones?: React.Dispatch<
		React.SetStateAction<{
			credito: boolean;
			contado: boolean;
		}>
	>;
}

export const Card: React.VFC<CardProps> = ({
	promocionAutomatica = false,
	soloLectura = false,
	promocion,
	promosMismosRequisitos,
	borroPromociones,
	tipo,
	setBorroPromociones,
	promocionesOngoing,
	setpromosDisponibles,
	promosDisponibles,
	setExpandidoexpandido,
	expandido,
	index,
}) => {
	const [mostrarCheck, setMostrarCheck] = React.useState<boolean>(false);
	const [bordeColor, setBordeColor] = React.useState<string>('#D9D9D9');
	const [focusId, setFocusId] = React.useState<string>('');
	const [beneficiosParaAgregar, setBeneficiosParaAgregar] =
		React.useState<TPromoOngoingAplicables>();
	const [gruposSelect, setGruposSelect] = React.useState<string>('');
	const [grupoYSecuenciaActual, setGrupoYSecuenciaActual] = React.useState<{
		grupo: number;
		secuencia: number;
	}>({grupo: 0, secuencia: 0});

	const [secuenciaSelect, setSecuenciaSelect] = React.useState<string>('');
	const [promocionSinDisponible, setPromocionSinDisponible] =
		React.useState<boolean>(true);

	const [valorBeneficio, setValorBeneficio] = React.useState<string>('');
	const {t} = useTranslation();
	const {promocionID} = promocion;
	const dispatch = useAppDispatch();
	const visitaActual = useObtenerVisitaActual();
	const obtenerDatosProducto = useObtenerDatosProducto();
	const {obtenerDatosCliente} = useObtenerDatosCliente();
	const clienteActual: TClienteActual = useObtenerClienteActual();
	const pedidoActual = useObtenerPedidoActual();
	const datosCliente: TCliente | undefined = obtenerDatosCliente(
		clienteActual.codigoCliente
	);
	const fechaEntrega: string = pedidoActual?.fechaEntrega;
	const obtenerPreciosProductosDelCliente =
		useObtenerPreciosProductosDelCliente();

	const expandID = `${promocion.promocionID}-${tipo}`;

	const [promocionAplicada, setPromocionAplicada] =
		React.useState<boolean>(false);

	const [disponibleSecuencia, setDisponibleSecuencia] =
		React.useState<number>(0);

	const mostrarAviso = useMostrarAviso();

	const tipoPago =
		tipo === 'contado' ? ETiposDePago.Contado : ETiposDePago.Credito;

	const [cantidadesPedido, setCantidadesPedido] = React.useState<{
		[codigo: number]: number;
	}>(() => {
		let cantidades: {[codigo: number]: number} = {};

		promocion.beneficios[grupoYSecuenciaActual.grupo].secuencias.forEach(
			(secuencia) => {
				secuencia.materialesBeneficio.forEach((producto) => {
					const {cantidad, codigo} = producto as TCodigoCantidad;

					if (!!codigo) {
						cantidades = {...cantidades, [+codigo]: cantidad};
					}
				});
			}
		);
		return cantidades;
	});

	React.useEffect(() => {
		if (beneficiosParaAgregar) {
			const materiales = beneficiosParaAgregar.beneficios[
				grupoYSecuenciaActual.grupo
			].secuencias[grupoYSecuenciaActual.secuencia]
				.materialesBeneficio as TCodigoCantidad[];
			const totalProductos = materiales.reduce(
				(a: number, v: TCodigoCantidad) => a + cantidadesPedido[+v.codigo],
				0
			);

			setDisponibleSecuencia(
				beneficiosParaAgregar.beneficios[grupoYSecuenciaActual.grupo]
					.secuencias[grupoYSecuenciaActual.secuencia].tope - totalProductos
			);
		}
	}, [beneficiosParaAgregar, grupoYSecuenciaActual, cantidadesPedido]);

	React.useEffect(() => {
		setBeneficiosParaAgregar(JSON.parse(JSON.stringify(promocion)));
	}, [expandido]);

	React.useEffect(() => {
		if (!promocionAutomatica && !soloLectura && setpromosDisponibles) {
			if (promocion.aplicada) {
				setPromocionAplicada(true);
				setMostrarCheck(true);
				setBordeColor(theme.palette.success.main);
				setpromosDisponibles((prevState) => ({
					...prevState,
					[Number(promocionID)]: {
						disponibles: prevState[Number(promocionID)].disponibles,
						aplicadas: prevState[Number(promocionID)].aplicadas + 1,
					},
				}));
			} else {
				setPromocionAplicada(false);
			}
		}
	}, []);

	React.useEffect(() => {
		if (promocion) {
			setGruposSelect(promocion.beneficios[0].descripcion);
			setGrupoYSecuenciaActual({grupo: 0, secuencia: 0});
			setSecuenciaSelect(
				promocion.beneficios[0].secuencias[0].secuencia.toString()
			);
		}

		return () => setExpandidoexpandido(false);
	}, []);

	React.useEffect(() => {
		setGruposSelect(promocion.beneficios[0].descripcion);
	}, [expandido]);

	React.useEffect(() => {
		if (promocion && gruposSelect !== '') {
			const indexGrupo = promocion.beneficios.findIndex(
				(grupo) =>
					grupo.descripcion.toLowerCase() === gruposSelect.toLowerCase()
			);
			setGrupoYSecuenciaActual({grupo: indexGrupo, secuencia: 0});
			setSecuenciaSelect(
				promocion.beneficios[indexGrupo].secuencias[0].secuencia.toString()
			);
			setBeneficiosParaAgregar(JSON.parse(JSON.stringify(promocion)));
		}
	}, [gruposSelect]);

	React.useEffect(() => {
		if (promocion && secuenciaSelect !== '') {
			const indexSecuencia = promocion.beneficios[
				grupoYSecuenciaActual.grupo
			].secuencias.findIndex(
				(secuncia) => secuncia.secuencia === Number(secuenciaSelect)
			);

			setGrupoYSecuenciaActual((prevState) => ({
				...prevState,
				secuencia: indexSecuencia,
			}));
		}
	}, [secuenciaSelect]);

	React.useEffect(() => {
		if (beneficiosParaAgregar) {
			const secuenciaActual =
				beneficiosParaAgregar.beneficios[grupoYSecuenciaActual.grupo]
					.secuencias[grupoYSecuenciaActual.secuencia];

			secuenciaActual.formaBeneficio === EFormaBeneficio.DescuentoPorcentaje
				? setValorBeneficio(`Beneficio: ${secuenciaActual.valorBeneficio}%`)
				: secuenciaActual.formaBeneficio === EFormaBeneficio.DescuentoMonto
				? setValorBeneficio(`Beneficio: $-${secuenciaActual.valorBeneficio}`)
				: secuenciaActual.formaBeneficio === EFormaBeneficio.Precio
				? setValorBeneficio(
						`Precio recuperación: $${secuenciaActual.valorBeneficio}`
				  )
				: setValorBeneficio('Beneficio: Obsequio');
		}
	}, [grupoYSecuenciaActual]);

	React.useEffect(() => {
		if (!promocionAutomatica) {
			if (!promocionAplicada && promosDisponibles) {
				if (
					promosDisponibles[Number(promocionID)].disponibles -
						promosDisponibles[Number(promocionID)].aplicadas <=
					0
				) {
					setPromocionSinDisponible(true);
				} else {
					setPromocionSinDisponible(false);
				}
			}
		}
	}, [promosDisponibles, borroPromociones, visitaActual.promosOngoing]);

	const onClick = () => {
		if (!promocionAplicada && beneficiosParaAgregar) {
			if (beneficiosParaAgregar.asignacion === EFormaDeAsignacion.Total) {
				let apliacionTotalIncomplenta = false;

				beneficiosParaAgregar.beneficios[
					grupoYSecuenciaActual.grupo
				].secuencias.forEach((secuencia: any) => {
					let tope = secuencia.tope;

					let totalCantidadMateriales = secuencia.materialesBeneficio.reduce(
						(a: number, v: TCodigoCantidad) => a + v.cantidad,
						0
					);

					if (totalCantidadMateriales < tope) {
						apliacionTotalIncomplenta = true;
					}
				});

				if (apliacionTotalIncomplenta) {
					setBordeColor(theme.palette.error.main);
					return mostrarAviso(
						'error',
						'Aplicación máxima incompleta',
						'Se debe asignar la aplicación total del beneficio'
					);
				}
			}
			setMostrarCheck(true);
			setBordeColor(theme.palette.success.main);
			setPromocionAplicada(true);
			promocionesOngoing.aplicarPromo(tipoPago, index, {
				...beneficiosParaAgregar,
				aplicada: true,
			});

			if (promocion && beneficiosParaAgregar && setpromosDisponibles) {
				setpromosDisponibles((prevState) => ({
					...prevState,
					[Number(promocionID)]: {
						disponibles: prevState[Number(promocionID)].disponibles,
						aplicadas: prevState[Number(promocionID)].aplicadas + 1,
					},
				}));

				dispatch(
					agregarBeneficiosPromoOngoing({
						beneficios: [
							...visitaActual.promosOngoing,
							{
								...beneficiosParaAgregar,
								tipoPago,
								beneficios: [
									beneficiosParaAgregar.beneficios[grupoYSecuenciaActual.grupo],
								],
							},
						],
					})
				);
				if (!datosCliente) return;

				beneficiosParaAgregar.beneficios.forEach((grupo) =>
					grupo.secuencias.forEach((secuencia) =>
						secuencia.materialesBeneficio.forEach((material) => {
							const {codigo, cantidad} = material as TCodigoCantidad;
							const productoActual = obtenerDatosProducto(Number(codigo));
							const preciosProductosDelCliente =
								obtenerPreciosProductosDelCliente(datosCliente, fechaEntrega);

							if (productoActual.tipoProducto == ETipoProducto.Envase) {
								let productoImplicito = preciosProductosDelCliente.find(
									(el) => el.codigoProducto === Number(codigo)
								);
								let preciosPromo = {
									unidad:
										secuencia.formaBeneficio !== EFormaBeneficio.Obsequio
											? productoImplicito?.precioConImpuestoUnidad ?? 0
											: 0,
									subUnidad:
										secuencia.formaBeneficio !== EFormaBeneficio.Obsequio
											? productoImplicito?.precioConImpuestoSubunidad ?? 0
											: 0,
								};

								if (
									secuencia.formaBeneficio === EFormaBeneficio.DescuentoMonto
								) {
									preciosPromo.unidad -= secuencia.valorBeneficio;
									preciosPromo.subUnidad =
										preciosPromo.unidad / productoActual.presentacion;
								} else if (
									secuencia.formaBeneficio ===
									EFormaBeneficio.DescuentoPorcentaje
								) {
									preciosPromo.unidad *= (100 - secuencia.valorBeneficio) / 100;
									preciosPromo.subUnidad *=
										(100 - secuencia.valorBeneficio) / 100;
								} else if (
									secuencia.formaBeneficio === EFormaBeneficio.Precio
								) {
									preciosPromo.unidad = secuencia.valorBeneficio;
									preciosPromo.subUnidad =
										preciosPromo.unidad / productoActual.presentacion;
								}

								dispatch(
									agregarProductoDelPedidoActual({
										productoPedido: {
											codigoProducto: productoActual.codigoProducto,
											nombreProducto: productoActual.nombre,
											unidades:
												secuencia.unidadMedida.toLowerCase() == 'unidad'
													? cantidad
													: 0,
											subUnidades:
												secuencia.unidadMedida.toLowerCase() == 'subunidad'
													? cantidad
													: 0,
											presentacion: productoActual.presentacion,
											subunidadesVentaMinima: 0,
											esVentaSubunidades: false,
											precioConImpuestoUnidad:
												productoImplicito?.precioConImpuestoUnidad ?? 0,
											precioConImpuestoSubunidad:
												productoImplicito?.precioConImpuestoSubunidad ?? 0,
											tipoProducto: productoActual.tipoProducto,
											total:
												secuencia.unidadMedida === 'Unidad'
													? preciosPromo.unidad * cantidad
													: preciosPromo.subUnidad * cantidad,
											tipoPago: tipoPago,
											catalogoMotivo: '',
											estado: 'activo',
											preciosBase: {
												unidad: 0, // productoActual.precioConImpuestoUnidad,
												subUnidad: 0, // productoActual.precioConImpuestoSubunidad,
											},
											preciosNeto: {
												unidad: 1,
												subUnidad: 1,
											},
											preciosPromo,
											codigoPromo: beneficiosParaAgregar.promocionID,
										},
									})
								);
							}
						})
					)
				);

				setExpandidoexpandido(false);
			}
		}
	};

	React.useEffect(() => {
		if (
			!promocionAutomatica &&
			borroPromociones &&
			tipo &&
			borroPromociones[tipo] &&
			setBorroPromociones
		) {
			setMostrarCheck(false);
			setBordeColor('#D9D9D9');
			setBorroPromociones({...borroPromociones, [tipo]: false});
			setPromocionAplicada(false);
			const indexGrupo = promocion.beneficios.findIndex(
				(grupo) =>
					grupo.descripcion.toLowerCase() === gruposSelect.toLowerCase()
			);
			if (indexGrupo !== -1) {
				setGrupoYSecuenciaActual({grupo: indexGrupo, secuencia: 0});
				setSecuenciaSelect(
					promocion.beneficios[indexGrupo].secuencias[0].secuencia.toString()
				);
			}

			setBeneficiosParaAgregar(JSON.parse(JSON.stringify(promocion)));
			setCantidadesPedido((state) => {
				let cantidades: {[codigo: number]: number} = {...state};

				promocion.beneficios[grupoYSecuenciaActual.grupo].secuencias.forEach(
					(secuencia) => {
						secuencia.materialesBeneficio.forEach((producto) => {
							const {cantidad, codigo} = producto as TCodigoCantidad;

							if (!!codigo) {
								cantidades = {...cantidades, [+codigo]: cantidad};
							}
						});
					}
				);
				return cantidades;
			});
			setExpandidoexpandido(false);
		}
	}, [borroPromociones]);

	React.useEffect(() => {
		if (promocionAutomatica) {
			setMostrarCheck(true);
			setBordeColor(theme.palette.success.main);
			if (
				promocion &&
				!visitaActual.promosOngoing.some(
					(promo) => promo.promocionID === promocionID
				)
			) {
				dispatch(
					agregarBeneficiosPromoOngoing({
						beneficios: [
							...visitaActual.promosOngoing,
							{
								...promocion,
								tipoPago,
								beneficios: [promocion.beneficios[grupoYSecuenciaActual.grupo]],
							},
						],
					})
				);
			}
		}
	}, [promocionAutomatica, borroPromociones]);

	React.useEffect(() => {
		if (!soloLectura && !promocionAplicada && promosMismosRequisitos) {
			promocion.beneficios[grupoYSecuenciaActual.grupo].secuencias[
				grupoYSecuenciaActual.secuencia
			].materialesBeneficio.forEach((producto) => {
				const {codigo} = producto as TCodigoCantidad;

				if (promosMismosRequisitos[Number(codigo)]) {
					const promoActualEnMismosRequisitos = promosMismosRequisitos[
						Number(codigo)
					].some((promo: number) => Number(promo) === Number(promocionID));

					if (promoActualEnMismosRequisitos) {
						const promosAplicadas = visitaActual.promosOngoing.filter(
							(promo) => promo.tipoPago === tipoPago
						);

						promosAplicadas.forEach((promoAplicada) => {
							const promoEnMismosRequisitos = promosMismosRequisitos[
								Number(codigo)
							].some(
								(promo: number) =>
									Number(promo) === Number(promoAplicada.promocionID)
							);

							if (promoEnMismosRequisitos) {
								setPromocionSinDisponible(true);
							}
						});
					}
				}
			});
		}
	}, [
		promosMismosRequisitos,
		visitaActual.promosOngoing,
		beneficiosParaAgregar,
	]);

	const manejadorExpandido = (id: string | boolean) => {
		setExpandidoexpandido(id);
	};

	return (
		<CardMUI
			style={{
				boxShadow: 'none',
				overflow: 'visible',
			}}
		>
			<Box border={`1px solid ${bordeColor}`} borderRadius='8px'>
				<Box
					align-items='center'
					color={expandido === expandID ? '#fff' : '#000'}
					borderRadius='4px 4px 0 0 '
					display='flex'
					flexDirection='column'
					justifyContent='space-between'
					padding={
						expandido === expandID
							? '12px 14px 12px 14px'
							: '12px 14px 8px 14px'
					}
					sx={{
						background:
							expandido === expandID ? theme.palette.secondary.light : 'none',
						borderBottom: 'none',
						transition: 'all 0.3s ease-in-out',
					}}
				>
					<Box display='flex' justifyContent='space-between'>
						<Box display='flex' flexDirection='column'>
							<Typography
								variant='subtitle3'
								fontFamily='Open Sans'
								data-cy={`promoOnGoing-ID-${promocion.promocionID}-${tipo}`}
							>
								{promocion.promocionID}
							</Typography>
							<Typography variant='subtitle3'>
								{promocion.descripcion}
							</Typography>
						</Box>
						{mostrarCheck && (
							<CheckRedondoIcon
								height='20px'
								width='20px'
								data-cy={`promoOnGoing-Check-${promocion.promocionID}-${tipo}`}
							/>
						)}
					</Box>
					{promocionAutomatica && (
						<Box
							borderRadius='50px'
							display='flex'
							marginTop='8px'
							padding='2px 12px'
							sx={{background: theme.palette.primary.main}}
							width='fit-content'
						>
							<Typography variant='caption' color='#fff' fontFamily='Open Sans'>
								{t('general.promocionAutomatica')}
							</Typography>
						</Box>
					)}
				</Box>

				<Collapse in={expandido === expandID} timeout='auto' unmountOnExit>
					<Box
						borderBottom='none'
						borderTop='none'
						padding='10px 14px 0px 14px'
					>
						<Box display='flex'>
							<Box marginBottom='8px'>
								<Typography variant='subtitle3' fontFamily='Open Sans'>
									Grupos
								</Typography>
								<Box width='181px' height='24px' mt='8px'>
									<MaterialSelect
										state={gruposSelect}
										setState={setGruposSelect}
										opciones={[
											...promocion?.beneficios?.map(
												(beneficio) => beneficio.descripcion
											),
										]}
									/>
								</Box>
							</Box>
							<Box marginBottom='8px' padding='0 14px'>
								<Typography variant='subtitle3' fontFamily='Open Sans'>
									Secuencia
								</Typography>
								<Box width='81px' height='24px' mt='8px' mb='8px'>
									<MaterialSelect
										state={secuenciaSelect}
										setState={setSecuenciaSelect}
										opciones={[
											...promocion?.beneficios[
												grupoYSecuenciaActual.grupo
											].secuencias?.map((secuencia) =>
												secuencia?.secuencia?.toString()
											),
										]}
									/>
								</Box>
								<Typography
									variant='caption'
									fontFamily='Open Sans'
									color='red'
								>
									Disponible:
									{disponibleSecuencia}
								</Typography>
							</Box>
						</Box>

						<Stack spacing={'14px'}>
							<Box>
								<Typography
									fontSize={'14px'}
									color={'red'}
									variant='subtitle2'
									fontFamily='Open Sans'
								>
									{valorBeneficio}
								</Typography>
							</Box>
							<Box>
								<Button
									onClick={onClick}
									disabled={
										promocionAplicada ||
										promocionAutomatica ||
										promocionSinDisponible
									}
									sx={{
										border:
											promocionAplicada ||
											promocionAutomatica ||
											promocionSinDisponible
												? 'none'
												: `1px solid ${theme.palette.secondary.main}`,
										borderRadius: '50px',
										display: 'flex',
										gap: '4px',
										padding: '4px 12px',
										width: '276px',
										height: '33px',
										backgroundColor:
											promocionAplicada ||
											promocionAutomatica ||
											promocionSinDisponible
												? '#D9D9D9'
												: '#fff',
										textTransform: 'none',
										'&:hover': {
											background: 'none',
										},
									}}
									data-cy={`boton-aplicarPromocion`}
								>
									<Typography
										color={
											promocionAplicada ||
											promocionAutomatica ||
											promocionSinDisponible
												? ''
												: theme.palette.secondary.light
										}
										fontSize={'12px'}
										variant='subtitle3'
										fontFamily='Poppins'
										sx={{padding: '4px 12px'}}
									>
										Aplicar Beneficio
									</Typography>
								</Button>
							</Box>
							<Box>
								<Typography variant='subtitle3'>
									Detalles del beneficio
								</Typography>
							</Box>
						</Stack>
					</Box>
					<Divider sx={{marginTop: '10px'}} variant='fullWidth' />
					{!soloLectura &&
						promocion.beneficios[grupoYSecuenciaActual.grupo].secuencias[
							grupoYSecuenciaActual.secuencia
						].materialesBeneficio.map((producto) => {
							const {cantidad, codigo, tope} = producto as TCodigoCantidad;

							return (
								<TarjetaPromociones
									cantidadesPedido={cantidadesPedido}
									grupoYSecuenciaActual={grupoYSecuenciaActual}
									key={Number(codigo)}
									producto={{
										codigoProducto: Number(codigo),
										tope: tope,
										topeSecuencia:
											promocion.beneficios[grupoYSecuenciaActual.grupo]
												.secuencias[grupoYSecuenciaActual.secuencia].tope,
										tipoPago,
										cantidad: cantidad,
										unidadMedida:
											promocion.beneficios[grupoYSecuenciaActual.grupo]
												.secuencias[grupoYSecuenciaActual.secuencia]
												.unidadMedida,
									}}
									promocionAplicada={promocionAplicada}
									promocionAutomatica={promocionAutomatica}
									promocionSinDisponible={promocionSinDisponible}
									stateBeneficiosParaAgregar={{
										beneficiosParaAgregar,
										setBeneficiosParaAgregar,
									}}
									statefocusId={{focusId, setFocusId}}
									setCantidadesPedido={setCantidadesPedido}
								/>
							);
						})}
					<Divider sx={{marginBottom: '10px'}} variant='fullWidth' />
				</Collapse>

				<Box
					padding={
						expandido === expandID ? '0 14px 12px 14px' : '0 14px 12px 14px'
					}
					sx={{
						borderTop: 'none',
					}}
				>
					{!soloLectura && (
						<BotonSmall
							fullWidth
							onClick={() => {
								if (
									(expandido === expandID && promocion.asignacion) ===
									EFormaDeAsignacion.Total
								) {
									let apliacionTotalIncomplenta = false;
									promocion.beneficios[
										grupoYSecuenciaActual.grupo
									].secuencias.forEach((secuencia: any) => {
										let tope = secuencia.tope;

										let totalCantidadMateriales =
											secuencia.materialesBeneficio.reduce(
												(a: number, v: TCodigoCantidad) => a + v.cantidad,
												0
											);

										if (totalCantidadMateriales < tope) {
											apliacionTotalIncomplenta = true;
										}
									});

									if (apliacionTotalIncomplenta) {
										setBordeColor(theme.palette.error.main);
										return mostrarAviso(
											'error',
											'Aplicación máxima incompleta',
											'Se debe asignar la aplicación total del beneficio'
										);
									} else {
										manejadorExpandido(
											expandido === expandID ? false : expandID
										);
									}
								} else {
									manejadorExpandido(expandido === expandID ? false : expandID);
								}
							}}
						>
							<Typography
								color='secondary'
								fontFamily='Open Sans'
								variant='caption'
							>
								{expandido !== expandID
									? t('general.verDetalle')
									: t('general.ocultarDetalle')}
							</Typography>
							<FlechaAbajoIcon
								height={10}
								width={10}
								style={{
									transition: 'transform .3s ease-in-out',
									transform:
										expandido === expandID
											? 'rotateX(180deg)'
											: 'rotateX(0deg)',
								}}
							/>
						</BotonSmall>
					)}
				</Box>
			</Box>
		</CardMUI>
	);
};
