import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Box, Typography} from '@mui/material';
import {TarjetaColapsable} from 'components/UI';
import {
	useAppDispatch,
	useObtenerConfiguracion,
	useObtenerVisitaActual,
} from 'redux/hooks';
import {useObtenerCoberturas, useObtenerPromoPushDelCliente} from 'hooks';
import {
	cambiarSeQuedaAEditar,
	limpiarProductosSinCantidad,
	cambiarAvisos,
	agregarCoberturasEjecutadas,
} from 'redux/features/visitaActual/visitaActualSlice';
import {Configuracion, Modal} from 'components/UI';
import {useValidarClienteBloqueado} from './hooks';
import {VistaPromoPush} from './VistaPromoPush';
import {Iniciativas} from './Iniciativas';
import {Coberturas} from './Coberturas';
import {EPasos, TStatePasos} from 'models';

const Planeacion: React.FC = () => {
	const [expandido, setExpandido] = useState<string | boolean>(false);
	const {t} = useTranslation();
	const {iniciativas} = useObtenerVisitaActual();
	const configuracion = useObtenerConfiguracion();
	const coberturas = useObtenerCoberturas();
	const promociones = useObtenerPromoPushDelCliente();
	const visitaActual = useObtenerVisitaActual();
	const {venta} = visitaActual.pedidos;
	const dispatch = useAppDispatch();
	const [alertaPasos, setAlertaPasos] = useState<boolean>(false);
	const [pasoActual, setPasoActual] = useState<TStatePasos>({
		actual: EPasos.Planeacion,
		visitados: {
			[EPasos.Planeacion]: false,
			[EPasos.TomaPedido]: false,
			[EPasos.Otros]: false,
			[EPasos.FinalizarPedido]: false,
		},
	});
	const validarClienteBloqueado = useValidarClienteBloqueado();

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
		if (
			codigosCoberturas.includes(producto.codigoProducto) &&
			(producto.unidades > 0 || producto.subUnidades > 0)
		) {
			return producto;
		}
	});

	console.log(coberturasAgregadas);

	const iniciativasCanceladasSinMotivo = iniciativas.some(
		(iniciativa) =>
			iniciativa.estado === 'cancelada' && iniciativa.motivo === ''
	);

	const iniciativasEjecutadas = iniciativas.filter(
		(iniciativa) => iniciativa.estado === 'ejecutada'
	);

	const iniciativasEjecutadasSinCantidad = iniciativas.filter((iniciativa) => {
		const cantidadesEnIniciativa = Object.values(
			iniciativa.cantidadesProductos
		).reduce(
			(total, actual) => (total += actual.unidades + actual.subUnidades),
			0
		);

		return iniciativa.estado === 'ejecutada' && cantidadesEnIniciativa === 0;
	});

	const totalesIniciativasCompletas = iniciativas.filter((iniciativa) => {
		const cantidadesEnIniciativa = Object.values(
			iniciativa.cantidadesProductos
		).reduce(
			(total, actual) => (total += actual.unidades + actual.subUnidades),
			0
		);

		return iniciativa.estado === 'ejecutada' && cantidadesEnIniciativa > 0;
	});

	useEffect(() => {
		dispatch(cambiarAvisos({cambiosPasoActual: false}));
	}, []);

	useEffect(() => {
		if (visitaActual.seQuedaAEditar.seQueda) {
			setExpandido('Iniciativas');
			dispatch(cambiarSeQuedaAEditar({seQueda: false, bordeError: true}));
		}
	}, [visitaActual.seQuedaAEditar.seQueda]);

	useEffect(() => {
		return () => {
			dispatch(limpiarProductosSinCantidad());
		};
	}, []);

	const [configAlerta, setConfigAlerta] = useState<Configuracion>({
		titulo: '',
		mensaje: '',
		tituloBotonAceptar: '',
		tituloBotonCancelar: '',
		iconoMensaje: <></>,
		callbackAceptar: () => {},
	});

	useEffect(() => {
		validarClienteBloqueado(setConfigAlerta, setAlertaPasos);
	}, []);

	// useEffect(() => {
	// 	if (coberturasAgregadas.length === 0) {
	// 		visitaActual.coberturasEjecutadas.map((cobertura) =>
	// 			dispatch(
	// 				agregarCoberturasEjecutadas({
	// 					codigoProducto: cobertura.codigoProducto,
	// 					unidades: 0,
	// 					subUnidades: 0,
	// 				})
	// 			)
	// 		);
	// 	}
	// 	coberturasAgregadas.map((cobertura) =>
	// 		dispatch(
	// 			agregarCoberturasEjecutadas({
	// 				codigoProducto: cobertura.codigoProducto,
	// 				unidades: cobertura.unidades,
	// 				subUnidades: cobertura.subUnidades,
	// 			})
	// 		)
	// 	);
	// }, [coberturasAgregadas.length]);

	return (
		<Box display='flex' flexDirection='column' gap='18px'>
			<Modal
				setAlerta={setAlertaPasos}
				alerta={alertaPasos}
				setPasoActual={setPasoActual}
				contenidoMensaje={configAlerta}
			/>
			<TarjetaColapsable
				titulo={<Typography variant='subtitle2'>Pedidos en curso</Typography>}
				subTitulo={
					<Typography variant='body3'>
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
				iniciativasCanceladasSinMotivo={iniciativasCanceladasSinMotivo}
				mensaje={
					<Typography
						color='primary'
						fontFamily='Open Sans'
						variant='subtitle3'
					>
						{t('titulos.pedidosEnCursoDeshabilitado')}
					</Typography>
				}
				disabled={visitaActual.clienteBloqueado}
			>
				<div> PEDIDOS EN CURSO</div>
			</TarjetaColapsable>
			<TarjetaColapsable
				titulo={<Typography variant='subtitle2'>Sugerido para ti</Typography>}
				subTitulo={
					<Typography variant='body3'>
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
				iniciativasCanceladasSinMotivo={iniciativasCanceladasSinMotivo}
				mensaje={
					<Typography
						color='primary'
						fontFamily='Open Sans'
						variant='subtitle3'
					>
						{t('titulos.sugeridosDeshabilitado')}
					</Typography>
				}
				disabled={visitaActual.clienteBloqueado}
			>
				{/*ToDo: agregar a multilenguaje*/}
				<div>SUGERIDOS PARA TI PEDIDOS EN CURSO</div>
			</TarjetaColapsable>
			<TarjetaColapsable
				titulo={
					<Typography variant='subtitle2'>
						{t('titulos.promociones')}
					</Typography>
				}
				subTitulo={
					<Typography variant='body3'>
						{t('titulos.promocionesMensaje')}
					</Typography>
				}
				id='Promociones'
				expandido={expandido}
				setExpandido={setExpandido}
				dataCy='Promociones'
				iniciativasEjecutadasSinCantidad={iniciativasEjecutadasSinCantidad}
				iniciativasCanceladasSinMotivo={iniciativasCanceladasSinMotivo}
				mensaje={
					<Typography
						color='primary'
						fontFamily='Open Sans'
						variant='subtitle3'
					>
						{t('titulos.promocionesDeshabilitadas')}
					</Typography>
				}
				disabled={visitaActual.clienteBloqueado || promociones.length === 0}
			>
				<VistaPromoPush />
			</TarjetaColapsable>
			<TarjetaColapsable
				titulo={
					<Typography variant='subtitle2'>
						{t('titulos.iniciativas')}
					</Typography>
				}
				subTitulo={
					<Typography variant='body3'>
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
					<Typography
						color='primary'
						fontFamily='Open Sans'
						variant='subtitle3'
					>
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
				iniciativasCanceladasSinMotivo={iniciativasCanceladasSinMotivo}
			>
				<Iniciativas />
			</TarjetaColapsable>
			<TarjetaColapsable
				titulo={
					<Typography variant='subtitle2'>{t('titulos.coberturas')}</Typography>
				}
				subTitulo={
					<Typography variant='body3'>
						{t('titulos.tarjetaCoberturas')}
					</Typography>
				}
				id='Coberturas'
				expandido={expandido}
				setExpandido={setExpandido}
				cantidadItems={coberturasEjecutadas.length}
				labelChip={`${coberturasEjecutadas.length} de ${cantidadCoberturas.length} Items`}
				valido={coberturasEjecutadas.length > 0}
				disabled={coberturas.length === 0 || visitaActual.clienteBloqueado}
				mensaje={
					<Typography
						color='primary'
						fontFamily='Open Sans'
						variant='subtitle3'
					>
						{t('titulos.coberturasDeshabilitadas')}
					</Typography>
				}
				dataCy='Coberturas'
				iniciativasEjecutadasSinCantidad={iniciativasEjecutadasSinCantidad}
				iniciativasCanceladasSinMotivo={iniciativasCanceladasSinMotivo}
			>
				<Coberturas coberturasAgregadas={coberturasAgregadas} />
			</TarjetaColapsable>
		</Box>
	);
};

export default Planeacion;
