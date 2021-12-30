import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {TarjetaColapsable} from 'components/UI';
import Iniciativas from './Iniciativas';
import {useTranslation} from 'react-i18next';
import {
	useAppDispatch,
	useObtenerClienteActual,
	useObtenerVisitaActual,
} from 'redux/hooks';
import Coberturas from './Coberturas';
import {
	useMostrarAviso,
	useObtenerCoberturas,
	useObtenerCreditoDisponible,
	useObtenerDatosCliente,
} from 'hooks';
import {
	cambiarEstadoIniciativa,
	cambiarSeQuedaAEditar,
} from 'redux/features/visitaActual/visitaActualSlice';
import {TCliente, TClienteActual} from 'models';
import Modal from 'components/UI/Modal';
import {AvisoIcon} from 'assests/iconos';

export const Planeacion: React.FC = () => {
	const [expandido, setExpandido] = React.useState<string | boolean>(false);
	const {t} = useTranslation();
	const {iniciativas} = useObtenerVisitaActual();
	const coberturas = useObtenerCoberturas();
	const visitaActual = useObtenerVisitaActual();
	const {venta} = visitaActual.pedidos;
	const dispatch = useAppDispatch();
	const {codigoCliente}: TClienteActual = useObtenerClienteActual();
	const {obtenerDatosCliente} = useObtenerDatosCliente();
	const creditoDisponible = useObtenerCreditoDisponible().creditoDisponible;
	const datosCliente: TCliente | undefined = obtenerDatosCliente(codigoCliente);
	const mostrarAviso = useMostrarAviso();

	const [alerta, setAlerta] = React.useState<boolean>(false);

	const codigosCoberturas = coberturas.reduce(
		(codigos: number[], cobertura) => {
			return [
				...codigos,
				...cobertura.productosGrupoCobertura.map((cobertura) => cobertura),
			];
		},
		[]
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

	if (
		datosCliente?.informacionCrediticia.condicion !== 'contado' &&
		creditoDisponible <= 0
	) {
		mostrarAviso(
			'warning',
			'Limite de credito excedido',
			'este cliente ha excedido su limite de crédito, por lo que no se podra levantar pedidos a crédito',
			undefined,
			'sinLimiteCredito'
		);
	}

	React.useEffect(() => {
		if (visitaActual.seQuedaAEditar.seQueda) {
			setExpandido('Iniciativas');
			dispatch(cambiarSeQuedaAEditar({seQueda: false, bordeError: true}));
		}
	}, [visitaActual.seQuedaAEditar.seQueda]);

	return (
		<Box display='flex' flexDirection='column' gap='18px'>
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
				disabled={iniciativas.length === 0}
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
				labelChip={`${coberturasEjecutadas?.length} de ${codigosCoberturas.length} Items`}
				valido={coberturasEjecutadas?.length > 0}
				disabled={coberturas.length === 0}
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
