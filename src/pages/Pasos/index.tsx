import React from 'react';
import {FunctionComponent, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {IndicadoresDelPedidoActual} from './components';
import {controlador, TControlador} from './controlador';
import {Estructura, BotonBarraInferior, Stepper, Dialogo} from 'components/UI';
import {Box, Button} from '@mui/material';
import {InfoClienteDelPedidoActual} from 'components/Negocio';
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
import {VistaPromoPush} from 'pages/Pasos/1_Planeacion/VistaPromoPush/index';

import {
	useAppDispatch,
	useObtenerClienteActual,
	useObtenerCompromisoDeCobroActual,
	useObtenerVisitaActual,
	useObtenerConfiguracion,
} from 'redux/hooks';

import {TCliente, TClienteActual} from 'models';
import {useTranslation} from 'react-i18next';
import {useReiniciarCompromisoDeCobro} from 'hooks/useReiniciarCompromisoDeCobro';
import {AvisoIcon, PromocionesRellenoIcon} from 'assests/iconos';
import Modal from 'components/UI/Modal';
import BotonResumenPedido from 'components/UI/BotonResumenPedido';
import ResumenPedido from 'components/UI/ResumenPedido';
import {cambiarSeQuedaAEditar} from 'redux/features/visitaActual/visitaActualSlice';
import ModalCore from 'components/UI/ModalCore';
import {obtenerTotalesPedidosCliente} from 'utils/methods';

const formatearItems = (items: number) => {
	const cerosCharacters = 3;

	let ceros = cerosCharacters - items.toString().length;
	return '0'.repeat(ceros) + items.toString();
};

const Pasos: React.FC = () => {
	const {t} = useTranslation();
	const [pasoActual, setPasoActual] = useState<number>(0);
	const [openVistaPromoPush, setOpenVistaPromoPush] = React.useState(false);
	const {tipoPedidoEnvasesHabilitados, tipoPedidos} = useObtenerConfiguracion();
	const [leyendaBoton, setLeyendaBoton] = useState(
		`${t('general.continuarA')} ${t(controlador[1].titulo)}`
	);
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
	const pedidoEnvaseContribuyeAlMinimo = tipoPedidoEnvasesHabilitados.some(
		(pedidosEnvases) =>
			pedidosContribuyeAlMinimo.find((pedido) => pedido === pedidosEnvases)
	);

	const obtenerTotalPedidosVisitaActual = useObtenerTotalPedidosVisitaActual();
	const datosCliente: TCliente | undefined = obtenerDatosCliente(codigoCliente);
	const {mostrarAdvertenciaEnDialogo, mostarDialogo, parametrosDialogo} =
		useMostrarAdvertenciaEnDialogo();
	const agregarPedidoActualAPedidosClientes =
		useAgregarPedidoActualAPedidosClientes(mostrarAdvertenciaEnDialogo);

	const totalVisitaActual =
		obtenerTotalPedidosVisitaActual().totalPrecio +
		compromisoDeCobroActual.monto;

	const visitaActual = useObtenerVisitaActual();

	const reiniciarVisita = useResetVisitaActual();
	const reiniciarCompromisoDeCobro = useReiniciarCompromisoDeCobro();
	const {obtenerPedidosClienteMismaFechaEntrega} =
		useObtenerPedidosClienteMismaFechaEntrega();
	const handleOpenVistaPromoPush = () => setOpenVistaPromoPush(true);
	const pedidosClienteMismaFechaEntrega =
		obtenerPedidosClienteMismaFechaEntrega(datosCliente?.codigoCliente ?? '');
	const reiniciarClienteActual = useReiniciarClienteActual();
	const totalesPedidoCliente = obtenerTotalesPedidosCliente({
		pedidosClienteMismaFechaEntrega,
		tipoPedidos,
	});

	useEffect(() => {
		if (pasoActual < controlador.length - 1) {
			setLeyendaBoton(
				`${t('general.continuarA')}\n ${t(
					controlador[pasoActual + 1].titulo
				).toLowerCase()}`
			);
		} else {
			setLeyendaBoton(t(controlador[pasoActual].titulo));
		}
	}, [pasoActual]);

	const valido = useValidarPasos(pasoActual);
	const [openResumenPedido, setOpenResumenPedido] =
		React.useState<boolean>(false);
	const [alertaPasos, setAlertaPasos] = React.useState<boolean>(false);

	const [configAlerta, setConfigAlerta] = React.useState<Configuracion>({
		titulo: '',
		mensaje: '',
		tituloBotonAceptar: '',
		tituloBotonCancelar: '',
		iconoMensaje: <></>,
		callbackAceptar: () => {},
	});

	const [pasos, setPasos] = useState(controlador);

	const manejadorPasoAtras = () => {
		if (pasoActual === 0 || (pasoActual === 2 && visitaActual.clienteBloqueado)) {
			setConfigAlerta({
				titulo: t('modal.salirOrderTaking'),
				mensaje: t('modal.salirOrderTakingMensaje'),
				tituloBotonAceptar: t('general.salir'),
				tituloBotonCancelar: t('general.cancelar'),
				callbackAceptar: () => {
					reiniciarVisita();
					reiniciarCompromisoDeCobro();
					reiniciarClienteActual();
					history.goBack();
				},
				iconoMensaje: <AvisoIcon />,
			});
			setAlertaPasos(true);
			return;
		}

		if (pasoActual === 1) {
			mostrarAviso(
				'warning',
				t('advertencias.noEditarPlaneacionTitulo'),
				t('advertencias.noEditarPlaneacionDescripcion'),
				undefined,
				'advertenciaPaso1'
			);
		}

		if (pasoActual === 2 && visitaActual.seQuedaAEditar.seQueda) {
			dispatch(cambiarSeQuedaAEditar({seQueda: true, bordeError: true}));
			mostrarAviso(
				'error',
				t('toast.errorBonificacionTotalTitulo'),
				t('toast.errorBonificacionTotalMensaje')
			);
			return;
		}

		setPasoActual(pasoActual - 1);
	};

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

		if (pasoActual < controlador.length - 1) {
			if (!valido.contenidoMensajeAviso) {
				if (pasoActual === 0 && visitaActual.clienteBloqueado) {
					setConfigAlerta({
						titulo: t('toast.ventaBloqueadaTitulo'),
						mensaje:
							'No puedes generar un pedido para este cliente ¿Quieres generar un compromiso de pago?',
						tituloBotonAceptar: t('general.continuar'),
						tituloBotonCancelar: t('general.finalizarVisita'),
						callbackAceptar: () => {
							setPasoActual(pasoActual + 1);
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
							history.goBack();
						},
						iconoMensaje: <AvisoIcon />,
					});
					return setAlertaPasos(true);
				}

				if (
					visitaActual.avisos.cambiosPasoActual &&
					(pasoActual === 0 || pasoActual === 1)
				) {
					mostrarAviso(
						'success',
						t('toast.cambiosGuardados'),
						undefined,
						undefined,
						'successpaso2'
					);
				}
				if (pasoActual === 1) {
					if (datosCliente?.informacionCrediticia.esBloqueadoVenta) {
						mostrarAviso(
							'warning',
							t('toast.ventaBloqueadaTitulo'),
							t('toast.ventaBloqueadaMensaje'),
							undefined,
							'bloqueadoParaVenta'
						);
					}
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

				setPasoActual(pasoActual + 1);
			}
		} else {
			agregarPedidoActualAPedidosClientes();
		}
	};

	const AccionesEstructura = () => (
		<>
			{pasoActual === 0 && (
				<Button onClick={() => handleOpenVistaPromoPush()}>
					<PromocionesRellenoIcon />
				</Button>
			)}
		</>
	);

	return (
		<Estructura>
			<Estructura.Encabezado
				esConFechaHaciaAtras={true}
				titulo={razonSocial}
				onClick={() => manejadorPasoAtras()}
				acciones={<AccionesEstructura />}
			>
				<InfoClienteDelPedidoActual />
			</Estructura.Encabezado>
			<Estructura.Cuerpo>
				{mostarDialogo && <Dialogo {...parametrosDialogo} />}
				<ModalCore open={openVistaPromoPush} borderRadius>
					<VistaPromoPush setOpenVistaPromoPush={setOpenVistaPromoPush} />
				</ModalCore>
				<Box
					display='flex'
					justifyContent='center'
					marginTop='20px'
					padding='10px'
					marginBottom='10px'
					position='sticky'
					top='2px'
					sx={{background: '#e5e5e5', zIndex: 99}}
				>
					<IndicadoresDelPedidoActual />
				</Box>
				<Box padding='0 10px'>
					<Box>
						<Stepper
							pasos={pasos.map(
								(paso: TControlador, index) => `${index + 1}. ${t(paso.titulo)}`
							)}
							pasoActivo={pasoActual}
						/>
					</Box>

					<Contenedor pasoActivo={pasoActual} />
					<Modal
						setAlerta={setAlertaPasos}
						alerta={alertaPasos}
						setPasoActual={setPasoActual}
						contenidoMensaje={configAlerta}
					/>
					<ModalCore open={openResumenPedido} borderRadius>
						<ResumenPedido setOpen={setOpenResumenPedido} />
					</ModalCore>
				</Box>
			</Estructura.Cuerpo>
			<Estructura.PieDePagina>
				<BotonResumenPedido setOpen={setOpenResumenPedido} />
				<BotonBarraInferior
					descripcion={leyendaBoton}
					numeroItems={formatearItems(itemsValorizados.length)}
					total={totalVisitaActual}
					onClick={() => manejadorPasoAdelante()}
				/>
			</Estructura.PieDePagina>
		</Estructura>
	);
};

type Props = {
	pasoActivo: number;
};

const Contenedor: FunctionComponent<Props> = ({pasoActivo}) => {
	return controlador[pasoActivo].componente;
};

export default Pasos;
