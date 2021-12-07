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
	useObtenerProductosMandatoriosVisitaActual,
} from 'hooks';
import OrdenDeCompra from './OrdenDeCompra';
import {cambiarTipoPedidoActual} from 'redux/features/visitaActual/visitaActualSlice';
import {CompromisoDeCobro} from 'pages';
import {useObtenerHabilitaCanje} from './hooks/useObtenerHabilitaCanje';
import Bonificaciones from './Bonificaciones';

export const Otros: React.FC = () => {
	const [expandido, setExpandido] = React.useState<string | boolean>(false);
	const {t} = useTranslation();
	const {habilitaOrdenDeCompra} = useObtenerConfiguracion();
	const {tipoPagoActual} = useObtenerClienteActual();
	const visitaActual = useObtenerVisitaActual();
	const {canje, ventaenvase, prestamoenvase} = visitaActual.pedidos;

	const productosMandatoriosVisitaActual =
		useObtenerProductosMandatoriosVisitaActual();

	const calcularPresupuestoTipoPedido = useCalcularPresupuestoTipoPedido();

	const productosEnCanjeConUnidades = canje.productos.filter((producto) => {
		return producto.catalogoMotivo !== '';
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
			producto.catalogoMotivo !== '' &&
			(producto.unidades > 0 || producto.subUnidades > 0)
	);

	const cantidadBonificaciones = visitaActual.bonificaciones.filter(
		(bonificacion) => bonificacion.detalle.length > 0
	);

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
					<Typography variant={'subtitle1'}>{t('general.envase')}</Typography>
				}
				subTitulo={
					<Typography variant={'body3'}>
						{t('titulos.tarjetaEnvases')}
					</Typography>
				}
				id='tarjetaEnvases'
				expandido={expandido}
				setExpandido={setExpandido}
				valido={envasesValido}
				dataCy='Envases'
			>
				<EnvasesRetornables />
			</TarjetaColapsable>
			<TarjetaColapsable
				titulo={
					<Typography variant={'subtitle1'}>{t('general.canje')}</Typography>
				}
				subTitulo={
					<Typography variant={'body3'}>
						{t('titulos.tarjetaCanjes')}
					</Typography>
				}
				id='tarjetaCanjes'
				expandido={expandido}
				setExpandido={setExpandido}
				cantidadItems={productosEnCanjeConUnidades.length}
				disabled={
					!habilitaCanje ||
					(saldoPresupuestoTipoPedido && saldoPresupuestoTipoPedido < 1) ||
					productosMandatoriosVisitaActual.mandatorios.length < 1
				}
				mensaje={
					<Typography color='primary' variant='subtitle3'>
						No hay disponibilidad de canje para este cliente en este momento
					</Typography>
				}
				labelChip={`${cantidadCanjes.length} Items`}
				valido={canjeValido}
				dataCy='Canjes'
			>
				<Canjes />
			</TarjetaColapsable>
			<TarjetaColapsable
				titulo={
					<Typography variant={'subtitle1'}>
						{t('titulos.bonificaciones')}
					</Typography>
				}
				subTitulo={
					<Typography variant={'body3'}>
						{t('titulos.tarjetaBonificaciones')}
					</Typography>
				}
				id='tarjetaBonificaciones'
				expandido={expandido}
				setExpandido={setExpandido}
				dataCy='Bonificaciones'
				valido={bonificacionValida}
				cantidadItems={cantidadBonificaciones.length}
				labelChip={`${cantidadBonificaciones.length} Items`}
			>
				<Bonificaciones bonificacionValida={bonificacionValida} />
			</TarjetaColapsable>
			{tipoPagoActual ? (
				<TarjetaColapsable
					titulo={
						<Typography variant={'subtitle1'}>
							{t('general.compromisoCobro')}
						</Typography>
					}
					subTitulo={
						<Typography variant={'body3'}>
							{t('titulos.tarjetaCompromisoCobro')}
						</Typography>
					}
					id='compromisoCobro'
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
						<Typography variant={'subtitle1'}>
							{t('titulos.ordenDeCompra')}
						</Typography>
					}
					subTitulo={
						<Typography variant={'body3'}>
							{t('titulos.tarjetaOrdenDeCompra')}
						</Typography>
					}
					id='titulos.tarjetaEnvases'
					expandido={expandido}
					setExpandido={setExpandido}
					valido={ordenDeCompraValido}
					dataCy='OrdenDeCompra'
				>
					<OrdenDeCompra />
				</TarjetaColapsable>
			) : null}
		</Stack>
	);
};
