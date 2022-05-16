import React, {Suspense, FunctionComponent, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {IndicadoresDelPedidoActual} from './components';
import {controlador} from './controlador';
import {
	Estructura,
	BotonBarraInferior,
	Dialogo,
	BotonResumenPedido,
	ModalCore,
} from 'components/UI';
import {Box} from '@mui/material';
import {InfoClienteDelPedidoActual, Navegacion} from 'components/Negocio';
import {
	useObtenerPedidosValorizados,
	useObtenerTotalPedidosVisitaActual,
	useMostrarAdvertenciaEnDialogo,
	useResetVisitaActual,
	useValidarPasos,
	useReiniciarClienteActual,
	useMostrarAviso,
	useObtenerDatosCliente,
	useObtenerTiposPedidoSegunConfiguracion,
	useObtenerPedidosClienteMismaFechaEntrega,
} from 'hooks';
import {useAgregarPedidoActualAPedidosClientes} from 'pages/Pasos/2_TomaDePedido/components/BotonCerrarPedidoDelCliente/hooks';
import {Configuracion} from 'components/UI/Modal';
import {
	useAppDispatch,
	useObtenerClienteActual,
	useObtenerCompromisoDeCobroActual,
	useObtenerVisitaActual,
	useObtenerConfiguracion,
} from 'redux/hooks';
import {
	EPasos,
	ETiposDePago,
	TCliente,
	TClienteActual,
	TPromoOngoing,
	TPromoOngoingAplicadas,
	TStatePasos,
} from 'models';
import {useTranslation} from 'react-i18next';
import {useReiniciarCompromisoDeCobro} from 'hooks/useReiniciarCompromisoDeCobro';
import {AvisoIcon} from 'assests/iconos';
import ResumenPedido from 'components/UI/ResumenPedido';
import {
	agregarBeneficiosPromoOngoing,
	cambiarAvisos,
	cambiarSeQuedaAEditar,
} from 'redux/features/visitaActual/visitaActualSlice';
import {obtenerTotalesPedidosCliente} from 'utils/methods';
import {
	PromocionesOngoing,
	TPromoOngoingAplicablesResultado,
	TPromoOngoingDisponibilidad,
} from 'utils/procesos/promociones/PromocionesOngoing';
import {Loading, Modal} from 'components/UI';
import {FechaEntregaDelPedidoActual} from '../../components/Negocio/FechaEntregaDelPedidoActual/index';

const formatearItems = (items: number) => {
	const cerosCharacters = 3;

	let ceros = cerosCharacters - items.toString().length;
	return '0'.repeat(ceros) + items.toString();
};

const Pasos: React.FC = () => {
	const {t} = useTranslation();
	const [pasoActual, setPasoActual] = useState<TStatePasos>({
		actual: EPasos.Planeacion,
		visitados: {
			[EPasos.Planeacion]: true,
			[EPasos.TomaPedido]: false,
			[EPasos.Otros]: false,
			[EPasos.FinalizarPedido]: false,
		},
	});
	const {tipoPedidoEnvasesHabilitados, tipoPedidos} = useObtenerConfiguracion();
	const [leyendaBoton, setLeyendaBoton] = useState(
		`${t('general.continuarA')} ${t(controlador[1].titulo)}`
	);
	const [alertaPasos, setAlertaPasos] = React.useState<boolean>(false);

	const [configAlerta, setConfigAlerta] = React.useState<Configuracion>({
		titulo: '',
		mensaje: '',
		tituloBotonAceptar: '',
		tituloBotonCancelar: '',
		iconoMensaje: <></>,
		callbackAceptar: () => {},
	});
	const dispatch = useAppDispatch();
	const history = useHistory();
	const {razonSocial, codigoCliente}: TClienteActual =
		useObtenerClienteActual();
	const mostrarAviso = useMostrarAviso();
	const {obtenerDatosCliente} = useObtenerDatosCliente();
	const ObtenerPedidosValorizados = useObtenerPedidosValorizados();
	const itemsValorizados = ObtenerPedidosValorizados();
	const compromisoDeCobroActual = useObtenerCompromisoDeCobroActual();
	const obtenerTiposPedidoSegunConfiguracion =
		useObtenerTiposPedidoSegunConfiguracion('contribuyeAMinimo', true);

	const pedidosContribuyeAlMinimo = obtenerTiposPedidoSegunConfiguracion();
	const pedidoEnvaseContribuyeAlMinimo = tipoPedidoEnvasesHabilitados?.some(
		(pedidosEnvases) =>
			pedidosContribuyeAlMinimo?.find((pedido) => pedido === pedidosEnvases)
	);

	const obtenerTotalPedidosVisitaActual = useObtenerTotalPedidosVisitaActual();
	const datosCliente: TCliente | undefined = obtenerDatosCliente(codigoCliente);
	if (!datosCliente) return <></>;
	const {mostarDialogo, parametrosDialogo} = useMostrarAdvertenciaEnDialogo();
	const agregarPedidoActualAPedidosClientes =
		useAgregarPedidoActualAPedidosClientes({setAlertaPasos, setConfigAlerta});

	const totalVisitaActual =
		obtenerTotalPedidosVisitaActual().totalPrecio +
		compromisoDeCobroActual.monto;

	const visitaActual = useObtenerVisitaActual();
	const reiniciarVisita = useResetVisitaActual();
	const reiniciarCompromisoDeCobro = useReiniciarCompromisoDeCobro();
	const {obtenerPedidosClienteMismaFechaEntrega} =
		useObtenerPedidosClienteMismaFechaEntrega();
	const pedidosClienteMismaFechaEntrega =
		obtenerPedidosClienteMismaFechaEntrega(datosCliente?.codigoCliente ?? '');
	const reiniciarClienteActual = useReiniciarClienteActual();
	const totalesPedidoCliente = obtenerTotalesPedidosCliente({
		pedidosClienteMismaFechaEntrega,
		tipoPedidos,
	});

	const promocionesOngoing = PromocionesOngoing.getInstance();

	useEffect(() => {
		if (pasoActual.actual < controlador.length - 1) {
			setLeyendaBoton(
				`${t('general.continuarA')}\n ${t(
					controlador[pasoActual.actual + 1].titulo
				).toLowerCase()}`
			);
		} else {
			setLeyendaBoton(t(controlador[pasoActual.actual].titulo));
		}
	}, [pasoActual]);

	const valido = useValidarPasos(pasoActual.actual);
	const [openResumenPedido, setOpenResumenPedido] =
		React.useState<boolean>(false);

	const [pasos, setPasos] = useState(controlador);

	const manejadorPasoAtras = () => {
		if (
			pasoActual.actual === EPasos.Planeacion ||
			(pasoActual.actual === EPasos.Otros && visitaActual.clienteBloqueado)
		) {
			setConfigAlerta({
				titulo: t('modal.salirOrderTaking'),
				mensaje: t('modal.salirOrderTakingMensaje'),
				tituloBotonAceptar: t('general.salir'),
				tituloBotonCancelar: t('general.cancelar'),
				callbackAceptar: () => {
					reiniciarVisita();
					reiniciarCompromisoDeCobro();
					reiniciarClienteActual();
					history.push('/clientes');
				},
				iconoMensaje: <AvisoIcon />,
			});
			setAlertaPasos(true);
			return;
		}

		if (pasoActual.actual === EPasos.TomaPedido) {
			mostrarAviso(
				'warning',
				t('advertencias.noEditarPlaneacionTitulo'),
				t('advertencias.noEditarPlaneacionDescripcion'),
				undefined,
				'advertenciaPaso1'
			);
		}

		if (
			pasoActual.actual === EPasos.Otros &&
			visitaActual.seQuedaAEditar.seQueda
		) {
			mostrarAviso(
				'error',
				t('toast.errorBonificacionTotalTitulo'),
				t('toast.errorBonificacionTotalMensaje')
			);
			return;
		}

		if (
			pasoActual.actual === EPasos.Otros &&
			visitaActual.seQuedaAEditar.bordeError
		) {
			mostrarAviso(
				'error',
				t('toast.errorBonificacionExcedeCantidadTitulo'),
				t('toast.errorBonificaionExcedeCantidadMensaje')
			);
			return;
		}

		setPasoActual((state) => ({...state, actual: state.actual - 1}));
	};

	const pedidoMinimoCumplido =
		!!datosCliente?.configuracionPedido?.ventaMinima?.cumplimientoPorFecha.find(
			(fecha) => fecha.fechaEntrega === visitaActual.fechaEntrega
		)?.cumplido;

	const manejadorPasoAdelante = () => {
		if (valido?.error) {
			if (valido?.contenidoMensajeModal) {
				setConfigAlerta(valido?.contenidoMensajeModal);
				return setAlertaPasos(true);
			} else if (valido?.contenidoMensajeAviso) {
				const aviso = valido?.contenidoMensajeAviso;
				mostrarAviso(
					aviso.tipo,
					aviso.titulo,
					aviso.mensaje,
					aviso.opciones,
					aviso.dataCy
				);
			}
		}

		if (pasoActual.actual < controlador.length - 1) {
			if (!valido.contenidoMensajeAviso) {
				if (
					pasoActual.actual === EPasos.Planeacion &&
					visitaActual.clienteBloqueado
				) {
					setConfigAlerta({
						titulo: t('toast.ventaBloqueadaTitulo'),
						mensaje: t('toast.noPuedesGenerarPedidoMensaje'),
						tituloBotonAceptar: t('general.continuar'),
						tituloBotonCancelar: t('general.finalizarVisita'),
						callbackAceptar: () => {
							setPasoActual((state) => ({
								...state,
								visitados: {...state.visitados, [state.actual + 1]: true},
								actual: state.actual + 1,
							}));
							setPasos(
								controlador.filter(
									(paso) =>
										paso.id !== 'planeacion' && paso.id !== 'tomaDePedido'
								)
							);
						},
						callbackCancelar: () => {
							reiniciarVisita();
							reiniciarCompromisoDeCobro();
							reiniciarClienteActual();
							history.push('/clientes');
						},
						iconoMensaje: <AvisoIcon />,
					});
					return setAlertaPasos(true);
				}

				if (
					visitaActual?.avisos?.cambiosPasoActual &&
					pasoActual.actual === EPasos.Planeacion
				) {
					mostrarAviso(
						'success',
						t('toast.cambiosGuardados'),
						undefined,
						undefined,
						'successpaso2'
					);
				}
				if (pasoActual.actual === EPasos.TomaPedido) {
					let promociones: {
						contado: TPromoOngoingAplicablesResultado | undefined;
						credito: TPromoOngoingAplicablesResultado | undefined;
						noAplicable: TPromoOngoing[];
						benficiosParaAgregar: TPromoOngoingAplicadas[];
						disponibles: TPromoOngoingDisponibilidad;
					} = {
						contado: {promosAplicables: [], indiceProductosxPromosManuales: []},
						credito: {promosAplicables: [], indiceProductosxPromosManuales: []},
						noAplicable: [],
						benficiosParaAgregar: [],
						disponibles: {},
					};

					if (
						visitaActual?.avisos?.cambioElPedidoSinPromociones.contado ||
						visitaActual?.avisos?.cambioElPedidoSinPromociones.credito
					) {
						let tipos: ETiposDePago[] =
							visitaActual?.avisos?.cambioElPedidoSinPromociones.contado &&
							visitaActual?.avisos?.cambioElPedidoSinPromociones.credito
								? [ETiposDePago.Contado, ETiposDePago.Credito]
								: visitaActual?.avisos?.cambioElPedidoSinPromociones.contado &&
								  !visitaActual?.avisos?.cambioElPedidoSinPromociones.credito
								? [ETiposDePago.Contado]
								: visitaActual?.avisos?.cambioElPedidoSinPromociones.credito &&
								  !visitaActual?.avisos?.cambioElPedidoSinPromociones.contado
								? [ETiposDePago.Credito]
								: [ETiposDePago.Contado, ETiposDePago.Credito];

						promociones = promocionesOngoing.calcular(
							visitaActual?.pedidos?.venta?.productos,
							tipos
						);

						let promocionesAutomaticasContado =
							promociones.contado?.promosAplicables
								.filter((promocion) => promocion.aplicacion === 'A')
								.map((promocion) => ({
									...promocion,
									tipoPago: ETiposDePago.Contado,
								})) ?? [];

						let promocionesAutomaticasCredito =
							promociones.credito?.promosAplicables
								.filter((promocion) => promocion.aplicacion === 'A')
								.map((promocion) => ({
									...promocion,
									tipoPago: ETiposDePago.Credito,
								})) ?? [];

						dispatch(
							agregarBeneficiosPromoOngoing({
								beneficios: [
									...promocionesAutomaticasContado,
									...promocionesAutomaticasCredito,
								],
							})
						);

						dispatch(
							cambiarAvisos({
								calculoPromociones: true,
								cambioElPedidoSinPromociones: {contado: false, credito: false},
							})
						);
					}

					let tienePromocionesAutomaticas =
						promociones.contado?.promosAplicables.some(
							(promocion) => promocion.aplicacion === 'A'
						) ||
						promociones.credito?.promosAplicables.some(
							(promocion) => promocion.aplicacion === 'A'
						);

					if (
						visitaActual?.avisos?.cambiosPasoActual &&
						!tienePromocionesAutomaticas
					) {
						mostrarAviso(
							'success',
							t('toast.cambiosGuardados'),
							undefined,
							undefined,
							'successpaso2'
						);
					}

					if (
						(visitaActual?.avisos?.cambioElPedidoSinPromociones.contado &&
							tienePromocionesAutomaticas) ||
						(visitaActual?.avisos?.cambioElPedidoSinPromociones.credito &&
							tienePromocionesAutomaticas)
					) {
						mostrarAviso(
							'success',
							t('toast.cambiosGuardados'),
							t('toast.cambiosGuardadosConPromo'),
							undefined,
							'successpaso2'
						);
					}

					if (datosCliente?.informacionCrediticia?.esBloqueadoVenta) {
						mostrarAviso(
							'warning',
							t('toast.ventaBloqueadaTitulo'),
							t('toast.ventaBloqueadaMensaje'),
							undefined,
							'bloqueadoParaVenta'
						);
					}
					if (!pedidoMinimoCumplido) {
						if (
							pedidoEnvaseContribuyeAlMinimo &&
							!datosCliente?.informacionCrediticia.esBloqueadoVenta &&
							datosCliente?.configuracionPedido.ventaMinima?.montoVentaMinima &&
							totalesPedidoCliente +
								(obtenerTotalPedidosVisitaActual().totalPrecio ?? 0) <
								datosCliente?.configuracionPedido.ventaMinima?.montoVentaMinima
						) {
							mostrarAviso(
								'warning',
								t('toast.pedidoMinimoNoAlcanzadoTitulo'),
								t('toast.pedidoMinimoNoAlcanzadoMensaje'),
								undefined,
								'pedidoMinimoNoAlcanzadoWarning'
							);
						}
					}
				}

				setPasoActual((state) => ({
					...state,
					visitados: {
						...state.visitados,
						[state.actual + 1]: true,
					},
					actual: state.actual + 1,
				}));
			}
		} else {
			agregarPedidoActualAPedidosClientes();
		}
	};

	return (
		<Suspense fallback={<Loading />}>
			<Estructura>
				<Estructura.Encabezado
					esConFechaHaciaAtras={true}
					titulo={razonSocial}
					onClick={() => manejadorPasoAtras()}
					botonResumen={<BotonResumenPedido setOpen={setOpenResumenPedido} />}
					fechaEntrega={<FechaEntregaDelPedidoActual />}
				>
					<InfoClienteDelPedidoActual />
				</Estructura.Encabezado>
				<Estructura.Cuerpo>
					{mostarDialogo && <Dialogo {...parametrosDialogo} />}

					<Box
						display='flex'
						justifyContent='center'
						marginBottom='12px'
						position='sticky'
						top='2px'
						sx={{zIndex: 99}}
					>
						<Navegacion pasos={pasoActual} setPasos={setPasoActual} />
					</Box>
					<Box padding='0 10px'>
						<Box marginBottom='16px'>
							<IndicadoresDelPedidoActual />
						</Box>

						<Contenedor pasoActivo={pasoActual.actual} />
						<Modal
							setAlerta={setAlertaPasos}
							alerta={alertaPasos}
							setPasoActual={setPasoActual}
							contenidoMensaje={configAlerta}
						/>
						<ModalCore open={openResumenPedido}>
							<ResumenPedido setOpen={setOpenResumenPedido} />
						</ModalCore>
					</Box>
				</Estructura.Cuerpo>
				<Estructura.PieDePagina>
					<BotonBarraInferior
						descripcion={leyendaBoton}
						numeroItems={formatearItems(itemsValorizados.length)}
						total={totalVisitaActual}
						onClick={() => manejadorPasoAdelante()}
						pasoActual={pasoActual.actual}
					/>
				</Estructura.PieDePagina>
			</Estructura>
		</Suspense>
	);
};

type Props = {
	pasoActivo: number;
};

const Contenedor: FunctionComponent<Props> = ({pasoActivo}) => {
	return controlador[pasoActivo].componente;
};

export default Pasos;
