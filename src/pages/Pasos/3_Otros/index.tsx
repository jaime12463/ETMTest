import React from 'react';
import EnvasesRetornables from './EnvasesRetornables';
import {Canjes} from './Canjes';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {TarjetaColapsable} from 'components/UI';
import {useTranslation} from 'react-i18next';
import {
	useObtenerClienteActual,
	useObtenerConfiguracion,
	useObtenerVisitaActual,
	useAppDispatch,
	useObtenerCompromisoDeCobroActual,
} from 'redux/hooks';
import {
	useCalcularPresupuestoTipoPedido,
	useObtenerBonificacionesHabilitadas,
	useObtenerDatosCliente,
	useObtenerProductosMandatoriosVisitaActual,
	useValidarTipoPedidosRealizadosSegunConfiguracion,
} from 'hooks';
import OrdenDeCompra from './OrdenDeCompra';
import {cambiarTipoPedidoActual} from 'redux/features/visitaActual/visitaActualSlice';
import {CompromisoDeCobro} from 'pages';
import {useObtenerHabilitaCanje} from './hooks/useObtenerHabilitaCanje';
import Bonificaciones from './Bonificaciones';

const Otros: React.FC = () => {
	const [expandido, setExpandido] = React.useState<string | boolean>(false);
	const {t} = useTranslation();
	const {habilitaOrdenDeCompra} = useObtenerConfiguracion();
	const {condicion} = useObtenerClienteActual();
	const visitaActual = useObtenerVisitaActual();

	const clienteActual = useObtenerClienteActual();
	const {datosCliente} = useObtenerDatosCliente(clienteActual.codigoCliente);
	const configuracion = useObtenerConfiguracion();

	const mostrarTarjetaBonificaciones = !(
		(configuracion.habilitaCompromisoDeCobro &&
			datosCliente?.informacionCrediticia.esCreditoBloqueado &&
			clienteActual.condicion === 'creditoFormal') ||
		(configuracion.habilitaCompromisoDeCobro &&
			datosCliente?.informacionCrediticia.esCreditoBloqueado &&
			datosCliente?.informacionCrediticia.esBloqueadoVenta &&
			clienteActual.condicion === 'creditoInformal')
	);

	const {canje, ventaenvase, prestamoenvase} = visitaActual.pedidos;

	const productosMandatoriosVisitaActual =
		useObtenerProductosMandatoriosVisitaActual();

	const calcularPresupuestoTipoPedido = useCalcularPresupuestoTipoPedido();
	const bonificaciones = useObtenerBonificacionesHabilitadas();
	const bonificacionesHabilitadas = bonificaciones();

	const productosEnCanjeConUnidades = canje.productos.filter((producto) => {
		return (
			(producto.catalogoMotivo !== '' && producto.unidades > 0) ||
			(producto.catalogoMotivo !== '' && producto.subUnidades > 0)
		);
	});
	const habilitaCanje = useObtenerHabilitaCanje();
	const dispatch = useAppDispatch();
	const [saldoPresupuestoTipoPedido, setSaldoPresupuestoTipoPedido] =
		React.useState<number | undefined>();
	const [envasesValido, setEnvasesValido] = React.useState<boolean>(false);
	const [canjeValido, setCanjeValido] = React.useState<boolean>(false);
	const [compromisoDeCobroValido, setCompromisoDeCobroValido] =
		React.useState<boolean>(false);
	const [ordenDeCompraValido, setOrdenDeCompraValido] =
		React.useState<boolean>(false);
	const [bonificacionValida, setBonificacionValida] =
		React.useState<boolean>(false);

	const compromisoDeCobroActual = useObtenerCompromisoDeCobroActual();

	const cantidadCanjes = canje.productos.filter(
		(producto) =>
			(producto.catalogoMotivo !== '' && producto.unidades > 0) ||
			(producto.catalogoMotivo !== '' && producto.subUnidades > 0)
	);

	const cantidadBonificaciones = visitaActual.bonificaciones.filter(
		(bonificacion) => bonificacion.detalle.length > 0
	);

	const validarTipoPedidosRealizadosSegunConfiguracion =
		useValidarTipoPedidosRealizadosSegunConfiguracion('esValorizado');
	const enableOrdenDeCompra = validarTipoPedidosRealizadosSegunConfiguracion();

	React.useEffect(() => {
		dispatch(cambiarTipoPedidoActual({tipoPedido: 'canje'}));
		setSaldoPresupuestoTipoPedido(calcularPresupuestoTipoPedido('canje'));
	}, []);

	React.useEffect(() => {
		if (
			ventaenvase.productos.length > 0 ||
			prestamoenvase.productos.length > 0
		) {
			setEnvasesValido(true);
		} else {
			setEnvasesValido(false);
		}

		if (
			canje.productos.some(
				(producto) =>
					producto.catalogoMotivo !== '' &&
					(producto.unidades > 0 || producto.subUnidades > 0)
			)
		) {
			setCanjeValido(true);
		} else {
			setCanjeValido(false);
		}

		if (compromisoDeCobroActual.monto > 0) {
			setCompromisoDeCobroValido(true);
		} else {
			setCompromisoDeCobroValido(false);
		}

		if (visitaActual.ordenDeCompra !== '') {
			setOrdenDeCompraValido(true);
		} else {
			setOrdenDeCompraValido(false);
		}

		const hayBonificaciones = visitaActual.bonificaciones.some(
			(bonificacion) => {
				return bonificacion.detalle.length > 0;
			}
		);

		if (hayBonificaciones) {
			setBonificacionValida(true);
		}

		return () => {
			setCanjeValido(false);
			setEnvasesValido(false);
			setCompromisoDeCobroValido(false);
			setOrdenDeCompraValido(false);
			setBonificacionValida(false);
		};
	}, [
		ventaenvase.productos,
		canje.productos,
		prestamoenvase.productos,
		compromisoDeCobroActual.monto,
		visitaActual.ordenDeCompra,
		visitaActual.bonificaciones,
	]);

	return (
		<Stack spacing={2}>
			<TarjetaColapsable
				titulo={
					<Typography variant={'subtitle2'}>{t('general.envases')}</Typography>
				}
				subTitulo={
					<Typography variant={'body3'}>
						{t('titulos.tarjetaEnvases')}
					</Typography>
				}
				id='Envases'
				expandido={expandido}
				setExpandido={setExpandido}
				valido={envasesValido}
				dataCy='Envases'
				disabled={visitaActual.clienteBloqueado}
				mensaje={
					<Typography color='primary' variant='subtitle3'>
						{/*ToDo: pasar a multilenguaje */}
						El pedido no cuenta con envases
					</Typography>
				}
			>
				<EnvasesRetornables />
			</TarjetaColapsable>
			<TarjetaColapsable
				titulo={
					<Typography variant={'subtitle2'}>{t('general.canje')}</Typography>
				}
				subTitulo={
					<Typography color={'black'} variant={'body3'}>
						{t('titulos.tarjetaCanjes')}
					</Typography>
				}
				id='Canjes'
				expandido={expandido}
				setExpandido={setExpandido}
				cantidadItems={
					productosEnCanjeConUnidades.length > 0
						? productosEnCanjeConUnidades.length
						: undefined
				}
				disabled={
					visitaActual.clienteBloqueado ||
					!habilitaCanje ||
					(saldoPresupuestoTipoPedido && saldoPresupuestoTipoPedido < 1) ||
					productosMandatoriosVisitaActual.mandatorios.length < 1
				}
				mensaje={
					<Typography color='primary' variant='subtitle3'>
						{visitaActual.clienteBloqueado
							? 'Sin disponibilidad de canje'
							: t('titulos.canjesDeshabilitadas')}
					</Typography>
				}
				labelChip={`${cantidadCanjes.length} Items`}
				valido={canjeValido}
				dataCy='Canjes'
				disabledPadding
			>
				<Canjes />
			</TarjetaColapsable>
			{mostrarTarjetaBonificaciones ? (
				<TarjetaColapsable
					titulo={
						<Typography variant={'subtitle2'}>
							{t('titulos.bonificaciones')}
						</Typography>
					}
					subTitulo={
						<Typography variant={'body3'}>
							{t('titulos.tarjetaBonificaciones')}
						</Typography>
					}
					id='Bonificaciones'
					expandido={expandido}
					setExpandido={setExpandido}
					dataCy='Bonificaciones'
					valido={bonificacionValida}
					cantidadItems={cantidadBonificaciones.length}
					labelChip={
						<>
							{bonificacionesHabilitadas.length !==
								cantidadBonificaciones.length &&
								`${cantidadBonificaciones.length} de ${bonificacionesHabilitadas.length}
						Bonificaciones`}
							{bonificacionesHabilitadas.length ===
								cantidadBonificaciones.length &&
								`${cantidadBonificaciones.length} Bonificaciones`}
						</>
					}
					disabled={
						bonificacionesHabilitadas.length === 0 ||
						productosMandatoriosVisitaActual.mandatorios.length < 1
					}
					mensaje={
						bonificacionesHabilitadas.length === 0 && (
							<Typography color='primary' variant='subtitle3'>
								{t('titulos.bonificacionesDeshabilitadas')}
							</Typography>
						)
					}
				>
					<Bonificaciones bonificacionValida={bonificacionValida} />
				</TarjetaColapsable>
			) : null}
			{condicion !== 'contado' ? (
				<TarjetaColapsable
					titulo={
						<Typography variant={'subtitle2'}>
							{t('general.compromisoCobro')}
						</Typography>
					}
					subTitulo={
						<Typography variant={'body3'}>
							{t('titulos.tarjetaCompromisoCobro')}
						</Typography>
					}
					id='Compromiso de cobro'
					expandido={expandido}
					setExpandido={setExpandido}
					valido={compromisoDeCobroValido}
					dataCy='CompromisoCobro'
				>
					<CompromisoDeCobro />
				</TarjetaColapsable>
			) : null}
			{habilitaOrdenDeCompra ? (
				<TarjetaColapsable
					titulo={
						<Typography variant={'subtitle2'}>
							{t('titulos.ordenDeCompra')}
						</Typography>
					}
					subTitulo={
						<Typography variant={'body3'}>
							{t('titulos.tarjetaOrdenDeCompra')}
						</Typography>
					}
					id='Orden de compra'
					expandido={expandido}
					setExpandido={setExpandido}
					valido={ordenDeCompraValido}
					dataCy='OrdenDeCompra'
					disabled={!enableOrdenDeCompra}
				>
					<OrdenDeCompra />
				</TarjetaColapsable>
			) : null}
		</Stack>
	);
};

export default Otros;
