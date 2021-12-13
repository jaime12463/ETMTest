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
} from 'hooks';
import {useAgregarPedidoActualAPedidosClientes} from 'pages/Pasos/2_TomaDePedido/components/BotonCerrarPedidoDelCliente/hooks';
import {Configuracion} from 'components/UI/Modal';
import {VistaPromoPush} from 'pages/Pasos/1_Planeacion/VistaPromoPush/index';

import {
	useAppDispatch,
	useObtenerClienteActual,
	useObtenerCompromisoDeCobroActual,
	useObtenerVisitaActual,
} from 'redux/hooks';

import {TClienteActual} from 'models';
import {useTranslation} from 'react-i18next';
import {useReiniciarCompromisoDeCobro} from 'hooks/useReiniciarCompromisoDeCobro';
import {AvisoIcon, PromocionesRellenoIcon} from 'assests/iconos';
import Modal from 'components/UI/Modal';
import {resetearClienteActual} from 'redux/features/clienteActual/clienteActualSlice';
import BotonResumenPedido from 'components/UI/BotonResumenPedido';
import ResumenPedido from 'components/UI/ResumenPedido';
import {cambiarSeQuedaAEditar} from 'redux/features/visitaActual/visitaActualSlice';

const formatearItems = (items: number) => {
	const cerosCharacters = 3;

	let ceros = cerosCharacters - items.toString().length;
	return '0'.repeat(ceros) + items.toString();
};

const Pasos: React.FC = () => {
	const {t} = useTranslation();
	const [pasoActual, setPasoActual] = useState<number>(0);
	const [openVistaPromoPush, setOpenVistaPromoPush] = React.useState(false);

	const [leyendaBoton, setLeyendaBoton] = useState(
		`${t('general.continuarA')} ${t(controlador[1].titulo)}`
	);
	const dispatch = useAppDispatch();
	const history = useHistory();
	const {razonSocial}: TClienteActual = useObtenerClienteActual();
	const mostrarAviso = useMostrarAviso();
	const ObtenerPedidosValorizados = useObtenerPedidosValorizados();
	const itemsValorizados = ObtenerPedidosValorizados();
	const compromisoDeCobroActual = useObtenerCompromisoDeCobroActual();
	const obtenerTotalPedidosVisitaActual = useObtenerTotalPedidosVisitaActual();
	const {mostrarAdvertenciaEnDialogo, mostarDialogo, parametrosDialogo} =
		useMostrarAdvertenciaEnDialogo();
	const agregarPedidoActualAPedidosClientes =
		useAgregarPedidoActualAPedidosClientes(mostrarAdvertenciaEnDialogo);

	const totalVisitaActual =
		obtenerTotalPedidosVisitaActual().totalPrecio +
		compromisoDeCobroActual.monto;

	const reiniciarVisita = useResetVisitaActual();
	const reiniciarCompromisoDeCobro = useReiniciarCompromisoDeCobro();
	const handleOpenVistaPromoPush = () => setOpenVistaPromoPush(true);
	const reiniciarClienteActual = useReiniciarClienteActual();

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

	const manejadorPasoAtras = () => {
		if (pasoActual == 0) {
			setConfigAlerta({
				titulo: '¿Quieres salir de toma de pedido?',
				mensaje:
					'Si sales de toma de pedido, toda la actividad registrada se perderá.',
				tituloBotonAceptar: t('general.salir'),
				tituloBotonCancelar: t('general.continuar'),
				callbackAceptar: () => {
					reiniciarVisita();
					reiniciarCompromisoDeCobro();
					reiniciarClienteActual();
					history.goBack();
				},
				callbackCancelar: () => {},
				iconoMensaje: <AvisoIcon />,
			});
			setAlertaPasos(true);
		} else {
			if (pasoActual === 1) {
				mostrarAviso(
					'warning',
					'No es posible editar las cantidades',
					'Si necesitas editar las cantidad de coberturas e iniciativas, deberas hacerlo en toma de pedido',
					undefined,
					'advertenciaPaso1'
				);
			}
			setPasoActual(pasoActual - 1);
		}
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
				dispatch(cambiarSeQuedaAEditar({seQueda: true, bordeError: true}));
			}
		}
		if (pasoActual < controlador.length - 1) {
			if (!valido.contenidoMensajeAviso) {
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
					<PromocionesRellenoIcon fill='white' />
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
				{openVistaPromoPush && (
					<VistaPromoPush
						stateOpen={{openVistaPromoPush, setOpenVistaPromoPush}}
					/>
				)}
				<Box my={3}>
					<IndicadoresDelPedidoActual />
				</Box>
				<Box my={3}>
					<Stepper
						pasos={controlador.map(
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
				<ResumenPedido
					open={openResumenPedido}
					setOpen={setOpenResumenPedido}
				/>
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
