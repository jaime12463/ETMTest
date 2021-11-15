import React from 'react';
import {
	TabVentas,
	TotalesMetodoDeVentaDelPedidoActual,
	BotonCerrarPedidoDelCliente,
} from './components';
import {TotalesCompromisoDeCobroPedidoActual} from 'pages/Pasos/3_Otros/CompromisoDeCobro/components/index';
import {
	Dialogo,
	Estructura,
	Tabs,
	BotonBarraInferior,
	Stepper,
	TarjetaColapsable,
	TarjetaDoble,
} from 'components/UI';
import {
	Button,
	Grid,
	IconButton,
	Box,
	Typography,
	Input,
	Stack,
} from '@mui/material';
import {useTranslation} from 'react-i18next';
import {useHistory, useRouteMatch} from 'react-router-dom';
import nombresRutas from 'routes/nombresRutas';
import {
	AutocompleteSeleccionarProducto,
	FechaEntregaDelPedidoActual,
	InfoClienteDelPedidoActual,
} from 'components/Negocio';
import CompromisoDeCobro from 'pages/Pasos/3_Otros/CompromisoDeCobro';
import {validarDeshabilitarTabCompromisoDeCobro} from 'utils/validaciones';
import {
	useAppDispatch,
	useAppSelector,
	useObtenerConfiguracion,
	useObtenerVisitaActual,
} from 'redux/hooks';
import {
	useInicializarPreciosProductosDelClienteActual,
	useMostrarAdvertenciaEnDialogo,
	useObtenerDatosTipoPedido,
	useObtenerTiposPedidoSegunConfiguracion,
} from 'hooks';
import {
	bloquearIniciativas,
	cambiarOrdenDeCompra,
	cambiarTipoPedidoActual,
	selectVisitaActual,
} from 'redux/features/visitaActual/visitaActualSlice';
import {
	AgregarRedondoIcon,
	BotellaIcon,
	CajaIcon,
	PromocionesRellenoIcon,
	QuitarRellenoIcon,
} from '../../../assests/iconos';

import TomaPedido from './TomaPedidos';
import PromoPush from './PromoPush';

const TomaPedidoDelClienteActual: React.FC = () => {
	const [expandido, setExpandido] = React.useState<boolean | string>(false);
	const visitaActual = useObtenerVisitaActual();
	const {venta} = visitaActual.pedidos;
	const productosConUnidades = venta.productos.filter((producto) => {
		return producto.unidades > 0 || producto.subUnidades > 0;
	});
	const cantidadPromoPush = productosConUnidades.filter(
		(producto) => producto.promoPush
	);
	const [ventaValida, setVentaValida] = React.useState<boolean>(false);
	const [promocionesValida, setPromocionesValida] =
		React.useState<boolean>(false);

	const dispatch = useAppDispatch();

	React.useEffect(() => {
		dispatch(cambiarTipoPedidoActual({tipoPedido: 'venta'}));
		dispatch(bloquearIniciativas());
	}, []);

	React.useEffect(() => {
		if (
			venta.productos.some(
				(producto) => producto.unidades > 0 || producto.subUnidades > 0
			)
		) {
			setVentaValida(true);
		} else {
			setVentaValida(false);
		}

		if (
			venta.productos.some(
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
	}, [venta.productos]);

	return (
		<Stack spacing={2}>
			<TarjetaColapsable
				id='Toma de pedido'
				titulo={<Typography variant={'subtitle1'}>Toma de pedido</Typography>}
				subTitulo={
					<Typography variant={'body3'}>
						Modifica tu pedido con las mejores opciones para tu cliente.
					</Typography>
				}
				expandido={expandido}
				setExpandido={setExpandido}
				cantidadItems={productosConUnidades.length}
				labelChip={`${productosConUnidades.length} Items`}
				valido={ventaValida}
			>
				<TomaPedido />
			</TarjetaColapsable>

			<TarjetaColapsable
				id='Promociones'
				titulo={<Typography variant={'subtitle1'}>Promociones</Typography>}
				subTitulo={
					<Typography variant={'body3'}>
						Selecciona las promociones que tienes disponible para tus clientes.
					</Typography>
				}
				expandido={expandido}
				setExpandido={setExpandido}
				valido={promocionesValida}
				cantidadItems={cantidadPromoPush.length}
				labelChip={`${cantidadPromoPush.length} Items`}
			>
				<PromoPush />
			</TarjetaColapsable>
		</Stack>
	);
};

export default TomaPedidoDelClienteActual;
