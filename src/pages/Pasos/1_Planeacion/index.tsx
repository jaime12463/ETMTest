import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {TarjetaColapsable} from 'components/UI';
import Iniciativas from './Iniciativas';
import {useTranslation} from 'react-i18next';
import {
	useAppDispatch,
	useObtenerClienteActual,
	useObtenerConfiguracion,
	useObtenerVisitaActual,
} from 'redux/hooks';
import Coberturas from './Coberturas';
import {
	useMostrarAviso,
	useObtenerCoberturas,
	useObtenerCreditoDisponible,
	useObtenerDatosCliente,
	useReiniciarClienteActual,
	useResetVisitaActual,
} from 'hooks';
import {
	cambiarSeQuedaAEditar,
	limpiarProductosSinCantidad,
	cambiarAvisos,
	activarClienteBloqueado,
} from 'redux/features/visitaActual/visitaActualSlice';
import {TCliente, TClienteActual} from 'models';
import {AvisoIcon} from 'assests/iconos';
import Modal, {Configuracion} from 'components/UI/Modal';
import {useReiniciarCompromisoDeCobro} from 'hooks/useReiniciarCompromisoDeCobro';
import {useHistory} from 'react-router-dom';

export const Planeacion: React.FC = () => {
	const [expandido, setExpandido] = React.useState<string | boolean>(false);
	const {t} = useTranslation();
	const {iniciativas} = useObtenerVisitaActual();
	const configuracion = useObtenerConfiguracion();
	const coberturas = useObtenerCoberturas();
	const visitaActual = useObtenerVisitaActual();
	const {venta} = visitaActual.pedidos;
	const dispatch = useAppDispatch();
	const {codigoCliente}: TClienteActual = useObtenerClienteActual();
	const {obtenerDatosCliente} = useObtenerDatosCliente();
	const creditoDisponible = useObtenerCreditoDisponible().creditoDisponible;
	const datosCliente: TCliente | undefined = obtenerDatosCliente(codigoCliente);
	const mostrarAviso = useMostrarAviso();
	const clienteActual: TClienteActual = useObtenerClienteActual();
	const [alertaPasos, setAlertaPasos] = useState<boolean>(false);
	const [pasoActual, setPasoActual] = useState<number>(0);
	const reiniciarVisita = useResetVisitaActual();
	const reiniciarCompromisoDeCobro = useReiniciarCompromisoDeCobro();
	const reiniciarClienteActual = useReiniciarClienteActual();
	const history = useHistory();

	const codigosCoberturas = coberturas.reduce(
		(codigos: number[], cobertura) => {
			return [
				...codigos,
				...cobertura.productosGrupoCobertura.map((cobertura) => cobertura),
			];
		},
		[]
	);

	const cantidadCoberturas = coberturas.slice(
		0,
		configuracion.maximoGrupoCoberturaAMostrar
	);

	const coberturasEjecutadas = visitaActual?.coberturasEjecutadas.filter(
		(cobertura) => {
			if (cobertura.unidades > 0 || cobertura.subUnidades > 0) {
				return cobertura;
			}
		}
	);

	const coberturasAgregadas = venta?.productos.filter((producto) => {
		if (codigosCoberturas.includes(producto.codigoProducto)) {
			return producto;
		}
	});

	const iniciativasCanceladasSinMotivo = iniciativas.some(
		(iniciativa) =>
			iniciativa.estado === 'cancelada' && iniciativa.motivo === ''
	);

	const iniciativasEjecutadas = iniciativas.filter(
		(iniciativa) => iniciativa.estado === 'ejecutada'
	);

	const iniciativasEjecutadasSinCantidad = iniciativas.find(
		(iniciativa) =>
			iniciativa.estado === 'ejecutada' &&
			iniciativa.unidadesEjecutadas === 0 &&
			iniciativa.subUnidadesEjecutadas === 0
	);

	const totalesIniciativasCompletas = iniciativas.filter(
		(iniciativa) =>
			iniciativa.estado === 'ejecutada' ||
			(iniciativa.estado === 'cancelada' && iniciativa.motivo !== '')
	);

	React.useEffect(() => {
		dispatch(cambiarAvisos({cambiosPasoActual: false}));
	}, []);

	React.useEffect(() => {
		if (visitaActual.seQuedaAEditar.seQueda) {
			setExpandido('Iniciativas');
			dispatch(cambiarSeQuedaAEditar({seQueda: false, bordeError: true}));
		}
	}, [visitaActual.seQuedaAEditar.seQueda]);

	React.useEffect(() => {
		return () => {
			dispatch(limpiarProductosSinCantidad());
		};
	}, []);

	const [configAlerta, setConfigAlerta] = React.useState<Configuracion>({
		titulo: '',
		mensaje: '',
		tituloBotonAceptar: '',
		tituloBotonCancelar: '',
		iconoMensaje: <></>,
		callbackAceptar: () => {},
	});

	const validacionClienteBloqueado = () => {
		console.log('Estoy en paso planeacion');
		const esCreditoBloqueado =
			datosCliente?.informacionCrediticia.esCreditoBloqueado;
		const esVentaBloqueado =
			datosCliente?.informacionCrediticia.esBloqueadoVenta;
		const esCondicionCreditoInformal =
			clienteActual.condicion === 'creditoInformal';
		const esCondicionCreditoFormal =
			clienteActual.condicion === 'creditoFormal';
		const {habilitaCompromisoDeCobro} = configuracion;

		/*console.log("esCreditoBloqueado", esCreditoBloqueado);
		console.log("esCondicionCreditoInformal", esCondicionCreditoInformal);
		console.log("!esVentaBloqueado", !esVentaBloqueado);*/
		if (esCreditoBloqueado && esCondicionCreditoInformal && !esVentaBloqueado) {
			console.log('Escenario 1');
			mostrarAviso(
				'warning',
				t('toast.clienteBloqueadoTitulo'),
				t('toast.clienteBloqueadoMensaje'),
				undefined,
				'cliente-bloqueado'
			);
		}

		if (
			esCreditoBloqueado &&
			esCondicionCreditoFormal &&
			habilitaCompromisoDeCobro
		) {
			console.log('Escenario 2');
			mostrarAviso(
				'error',
				t('toast.ventaBloqueadaTitulo'),
				t('toast.ventaBloqueadaMensaje'),
				undefined,
				'cliente-bloqueado'
			);
			dispatch(activarClienteBloqueado());
		}

		if (
			esCreditoBloqueado &&
			esCondicionCreditoInformal &&
			esVentaBloqueado &&
			habilitaCompromisoDeCobro
		) {
			console.log('Escenario 3');
			mostrarAviso(
				'error',
				t('toast.ventaBloqueadaTitulo'),
				t('toast.ventaBloqueadaMensaje'),
				undefined,
				'cliente-bloqueado'
			);
			dispatch(activarClienteBloqueado());
		}

		if (
			esCreditoBloqueado &&
			esCondicionCreditoFormal &&
			!habilitaCompromisoDeCobro
		) {
			console.log('Escenario 4');
			setConfigAlerta({
				titulo: t('toast.clienteBloqueadoTitulo'),
				mensaje: t('toast.clienteBloqueadoMensaje'),
				tituloBotonAceptar: t('general.finalizarVisita'),
				callbackAceptar: () => {
					reiniciarVisita();
					reiniciarCompromisoDeCobro();
					reiniciarClienteActual();
					history.goBack();
				},
				iconoMensaje: <AvisoIcon />,
			});
			setAlertaPasos(true);
			dispatch(activarClienteBloqueado());
		}

		if (
			esCreditoBloqueado &&
			esCondicionCreditoInformal &&
			esVentaBloqueado &&
			!habilitaCompromisoDeCobro
		) {
			console.log('Escenario 5');
			setConfigAlerta({
				titulo: t('toast.clienteBloqueadoTitulo'),
				mensaje: t('toast.clienteBloqueadoMensaje'),
				tituloBotonAceptar: t('general.finalizarVisita'),
				callbackAceptar: () => {
					reiniciarVisita();
					reiniciarCompromisoDeCobro();
					reiniciarClienteActual();
					history.goBack();
				},
				iconoMensaje: <AvisoIcon />,
			});
			setAlertaPasos(true);
			dispatch(activarClienteBloqueado());
		}
	};

	useEffect(() => {
		validacionClienteBloqueado();
	}, []);

	return (
		<Box display='flex' flexDirection='column' gap='18px'>
			<Modal
				setAlerta={setAlertaPasos}
				alerta={alertaPasos}
				setPasoActual={setPasoActual}
				contenidoMensaje={configAlerta}
			/>
			<TarjetaColapsable
				titulo={<Typography variant={'subtitle2'}>Pedidos en curso</Typography>}
				subTitulo={
					<Typography variant={'body3'}>
						{/*ToDo: pasar a multilenguaje */}
						Aquí se muestra un listado de pedidos que estan pendientes por
						entregar
					</Typography>
				}
				id='PedidosEnCurso'
				expandido={expandido}
				setExpandido={setExpandido}
				dataCy='PedidosEnCurso'
				iniciativasEjecutadasSinCantidad={iniciativasEjecutadasSinCantidad}
				mensaje={
					<Typography color='primary' variant='subtitle3'>
						{t('titulos.pedidosEnCursoDeshabilitado')}
					</Typography>
				}
				disabled={visitaActual.clienteBloqueado}
			>
				<div> PEDIDOS EN CURSO</div>
			</TarjetaColapsable>
			<TarjetaColapsable
				titulo={<Typography variant={'subtitle2'}>Sugerido para ti</Typography>}
				subTitulo={
					<Typography variant={'body3'}>
						{/*ToDo: pasar a multilenguaje */}
						Aquí se muestra un listado de pedidos que estan pendientes por
						entregar
					</Typography>
				}
				id='Sugeridos'
				expandido={expandido}
				setExpandido={setExpandido}
				dataCy='Sugeridos'
				iniciativasEjecutadasSinCantidad={iniciativasEjecutadasSinCantidad}
				mensaje={
					<Typography color='primary' variant='subtitle3'>
						{t('titulos.sugeridosDeshabilitado')}
					</Typography>
				}
				disabled={visitaActual.clienteBloqueado}
			>
				<div>SUGERIDOS PARA TI PEDIDOS EN CURSO</div>
			</TarjetaColapsable>
			<TarjetaColapsable
				titulo={
					<Typography variant={'subtitle2'}>
						{t('titulos.iniciativas')}
					</Typography>
				}
				subTitulo={
					<Typography variant={'body3'}>
						{t('titulos.tarjetaIniciativas')}
					</Typography>
				}
				id='Iniciativas'
				expandido={expandido}
				setExpandido={setExpandido}
				cantidadItems={totalesIniciativasCompletas.length}
				labelChip={
					<>
						{totalesIniciativasCompletas.length !== iniciativas.length &&
							`${totalesIniciativasCompletas.length} de ${iniciativas.length}
						Iniciativas`}
						{totalesIniciativasCompletas.length === iniciativas.length &&
							`${totalesIniciativasCompletas.length} Iniciativas`}
					</>
				}
				disabled={iniciativas.length === 0 || visitaActual.clienteBloqueado}
				mensaje={
					<Typography color='primary' variant='subtitle3'>
						{/*ToDo: pasar a multilenguaje */}
						Este cliente no cuenta con iniciativas
					</Typography>
				}
				valido={iniciativasEjecutadas.length > 0}
				dataCy='Iniciativas'
				mostrarAvisoAlCerrar={iniciativasCanceladasSinMotivo}
				contenidoMensajeAviso={{
					tipo: 'error',
					titulo: 'Iniciativa cancelada sin motivo',
					mensaje: 'ingrese un motivo para la iniciativa cancelada',
					opciones: undefined,
					dataCy: 'clienteNoPortafolio',
				}}
				iniciativasEjecutadasSinCantidad={iniciativasEjecutadasSinCantidad}
			>
				<Iniciativas />
			</TarjetaColapsable>
			<TarjetaColapsable
				titulo={
					<Typography variant={'subtitle2'}>
						{t('titulos.coberturas')}
					</Typography>
				}
				subTitulo={
					<Typography variant={'body3'}>
						{t('titulos.tarjetaCoberturas')}
					</Typography>
				}
				id='Coberturas'
				expandido={expandido}
				setExpandido={setExpandido}
				cantidadItems={coberturasEjecutadas?.length}
				labelChip={`${coberturasEjecutadas?.length} de ${cantidadCoberturas.length} Items`}
				valido={coberturasEjecutadas?.length > 0}
				disabled={coberturas.length === 0 || visitaActual.clienteBloqueado}
				mensaje={
					<Typography color='primary' variant='subtitle3'>
						{/*ToDo: pasar a multilenguaje */}
						Este cliente no cuenta con coberturas
					</Typography>
				}
				dataCy='Coberturas'
				iniciativasEjecutadasSinCantidad={iniciativasEjecutadasSinCantidad}
			>
				<Coberturas coberturasAgregadas={coberturasAgregadas} />
			</TarjetaColapsable>
		</Box>
	);
};
