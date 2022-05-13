import React from 'react';
import {TarjetaColapsable} from 'components/UI';
import {Typography, Stack} from '@mui/material';
import {useAppDispatch, useObtenerVisitaActual} from 'redux/hooks';
import {
	pasoATomaPedido,
	cambiarTipoPedidoActual,
	cambiarSeQuedaAEditar,
	cambiarAvisos,
} from 'redux/features/visitaActual/visitaActualSlice';
import TomaPedido from './TomaPedidos';
import PromoPush from './PromoPush';
import {useTranslation} from 'react-i18next';
import {useObtenerPromoPushDelCliente} from 'hooks';

const TomaPedidoDelClienteActual: React.FC = () => {
	const [expandido, setExpandido] = React.useState<boolean | string>(false);
	const visitaActual = useObtenerVisitaActual();
	const {venta} = visitaActual.pedidos;
	const promociones = useObtenerPromoPushDelCliente();
	const productosConUnidades = venta?.productos?.filter((producto) => {
		return (
			(producto.unidades > 0 || producto.subUnidades > 0) &&
			!producto.codigoPromo
		);
	});
	const cantidadPromoPush = productosConUnidades?.filter(
		(producto) => producto.promoPush
	);
	const [ventaValida, setVentaValida] = React.useState<boolean>(false);
	const [promocionesValida, setPromocionesValida] =
		React.useState<boolean>(false);

	const dispatch = useAppDispatch();
	const {t} = useTranslation();

	React.useEffect(() => {
		if (visitaActual.seQuedaAEditar.seQueda) {
			setExpandido('Toma de pedido');
			dispatch(cambiarSeQuedaAEditar({seQueda: false, bordeError: true}));
		}
	}, [visitaActual.seQuedaAEditar.seQueda]);

	React.useEffect(() => {
		dispatch(cambiarTipoPedidoActual({tipoPedido: 'venta'}));
		dispatch(pasoATomaPedido());
		dispatch(cambiarAvisos({cambiosPasoActual: false}));
	}, []);

	React.useEffect(() => {
		if (
			venta?.productos?.some(
				(producto) => producto.unidades > 0 || producto.subUnidades > 0
			)
		) {
			setVentaValida(true);
		} else {
			setVentaValida(false);
		}

		if (
			venta?.productos?.some(
				(producto) =>
					(producto.unidades > 0 || producto.subUnidades > 0) &&
					producto.promoPush
			)
		) {
			setPromocionesValida(true);
		} else {
			setPromocionesValida(false);
		}
		return () => {
			setVentaValida(false);
			setPromocionesValida(false);
		};
	}, [venta?.productos]);

	return (
		<Stack spacing={2}>
			<TarjetaColapsable
				cantidadItems={productosConUnidades?.length}
				dataCy='TomaDePedido'
				disabledPadding
				expandido={expandido}
				id='Toma de pedido'
				labelChip={`${productosConUnidades?.length} Items`}
				setExpandido={setExpandido}
				subTitulo={
					<Typography color={'black'} variant={'body3'}>
						{t('titulos.tarjetaTomaDePedido')}
					</Typography>
				}
				titulo={
					<Typography variant={'subtitle2'}>
						{t('titulos.tomaDePedido')}
					</Typography>
				}
				valido={ventaValida}
			>
				<TomaPedido />
			</TarjetaColapsable>

			<TarjetaColapsable
				cantidadItems={cantidadPromoPush?.length}
				dataCy='Promociones'
				disabled={promociones.length === 0}
				expandido={expandido}
				id='Promociones'
				labelChip={`${cantidadPromoPush?.length} Items`}
				mensaje={
					<Typography
						color='primary'
						fontFamily='Open Sans'
						variant='subtitle3'
					>
						{t('titulos.promocionesDeshabilitadas')}
					</Typography>
				}
				setExpandido={setExpandido}
				subTitulo={
					<Typography color={'black'} variant={'body3'}>
						{t('titulos.tarjetaPromociones')}
					</Typography>
				}
				titulo={
					<Typography variant={'subtitle2'}>
						{t('titulos.promociones')}
					</Typography>
				}
				valido={promocionesValida}
			>
				<PromoPush />
			</TarjetaColapsable>
		</Stack>
	);
};

export default TomaPedidoDelClienteActual;
