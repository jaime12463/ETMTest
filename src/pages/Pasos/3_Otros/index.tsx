import EnvasesRetornables from './EnvasesRetornables';
import {Canjes} from './Canjes';

import React, {useEffect} from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {TarjetaColapsable} from 'components/UI';
import {useTranslation} from 'react-i18next';
import {
	useObtenerClienteActual,
	useObtenerConfiguracion,
	useObtenerVisitaActual,
	useAppDispatch,
} from 'redux/hooks';
import {
	useCalcularPresupuestoTipoPedido,
	useObtenerProductosMandatoriosVisitaActual,
} from 'hooks';
import OrdenDeCompra from './OrdenDeCompra';
import {cambiarTipoPedidoActual} from 'redux/features/visitaActual/visitaActualSlice';
import {CompromisoDeCobro} from 'pages';
import {useObtenerHabilitaCanje} from './hooks/useObtenerHabilitaCanje';

export const Otros: React.FC = () => {
	const [expandido, setExpandido] = React.useState<string | boolean>(false);
	const {t} = useTranslation();
	const {habilitaOrdenDeCompra} = useObtenerConfiguracion();
	const {tipoPagoActual} = useObtenerClienteActual();
	const visitaActual = useObtenerVisitaActual();
	const {canje} = visitaActual.pedidos;

	const productosMandatoriosVisitaActual =
		useObtenerProductosMandatoriosVisitaActual();

	const calcularPresupuestoTipoPedido = useCalcularPresupuestoTipoPedido();
	const saldoPresupuestoTipoPedido = calcularPresupuestoTipoPedido('canje');

	const productosEnCanjeConUnidades = canje.productos.filter((producto) => {
		return producto.catalogoMotivo !== '';
	});

	const habilitaCanje = useObtenerHabilitaCanje();
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(cambiarTipoPedidoActual({tipoPedido: 'canje'}));
		calcularPresupuestoTipoPedido('canje');
	}, []);

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
				>
					<OrdenDeCompra />
				</TarjetaColapsable>
			) : null}
		</Stack>
	);
};
