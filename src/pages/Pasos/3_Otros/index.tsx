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

interface StateProps {
	envases: boolean;
	canjes: boolean;
	ordenDeCompra: boolean;
	compromisoDeCobro: boolean;
}

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
	const saldoPresupuestoTipoPedido = calcularPresupuestoTipoPedido('canje');

	const productosEnCanjeConUnidades = canje.productos.filter((producto) => {
		return producto.catalogoMotivo !== '';
	});
	const habilitaCanje = useObtenerHabilitaCanje();
	const dispatch = useAppDispatch();
	const [tarjetasValidas, setTarjetasValidas] = React.useState<StateProps>({
		envases: false,
		canjes: false,
		compromisoDeCobro: false,
		ordenDeCompra: false,
	});

	const compromisoDeCobroActual = useObtenerCompromisoDeCobroActual();

	React.useEffect(() => {
		dispatch(cambiarTipoPedidoActual({tipoPedido: 'canje'}));
		calcularPresupuestoTipoPedido('canje');
	}, []);

	React.useEffect(() => {
		if (
			ventaenvase.productos.length > 0 ||
			prestamoenvase.productos.length > 0
		) {
			setTarjetasValidas({...tarjetasValidas, envases: true});
		}

		if (compromisoDeCobroActual.monto > 0) {
			setTarjetasValidas({...tarjetasValidas, compromisoDeCobro: true});
		}

		if (visitaActual.ordenDeCompra !== '') {
			setTarjetasValidas({...tarjetasValidas, ordenDeCompra: true});
		}

		return () =>
			setTarjetasValidas({
				envases: false,
				canjes: false,
				compromisoDeCobro: false,
				ordenDeCompra: false,
			});
	}, [
		ventaenvase.productos,
		prestamoenvase.productos,
		compromisoDeCobroActual.monto,
		visitaActual.ordenDeCompra,
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
				valido={tarjetasValidas.envases}
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
					saldoPresupuestoTipoPedido < 1 ||
					productosMandatoriosVisitaActual.mandatorios.length < 1
				}
				mensaje={
					<Typography color='primary' variant='subtitle3'>
						No hay disponibilidad de canje para este cliente en este momento
					</Typography>
				}
				valido={tarjetasValidas.canjes}
			>
				<Canjes />
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
					valido={tarjetasValidas.compromisoDeCobro}
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
					valido={tarjetasValidas.ordenDeCompra}
				>
					<OrdenDeCompra />
				</TarjetaColapsable>
			) : null}
		</Stack>
	);
};
