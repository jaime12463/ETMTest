import React from 'react';
import {
	ETiposDePago,
	TInfoDescuentos,
	TProductoPedido,
	TStateInputFocus,
} from 'models';
import Box from '@mui/material/Box';
import theme from 'theme';
import Controles from './components/Controles';
import Informacion from './components/Informacion';
import Descuentos from './components/Descuentos';
import {useObtenerClienteActual, useObtenerVisitaActual} from 'redux/hooks';
import SwitchYCheck from './components/SwitchYCheck';
import {useTranslation} from 'react-i18next';
import {
	useObtenerCalculoDescuentoProducto,
	useObtenerDatosCliente,
	useMostrarAviso,
	useObtenerCreditoDisponible,
	useObtenerTotalPedidosVisitaActual,
} from 'hooks';

export interface StateFocusID {
	focusId: number;
	setFocusId: React.Dispatch<React.SetStateAction<number>>;
}
interface Props {
	producto: TProductoPedido;
	conSwitch?: boolean;
	bordeRedondeado?: boolean;
	stateInputFocus: TStateInputFocus;
	stateFocusId: StateFocusID;
	stateAviso: any;
}

const TarjetaTomaPedido: React.FC<Props> = ({
	producto,
	conSwitch = false,
	bordeRedondeado = false,
	stateInputFocus,
	stateFocusId,
	stateAviso,
}) => {
	const clienteActual = useObtenerClienteActual();
	const [productoAgregado, setProductoAgregado] = React.useState<boolean>(true);
	const {focusId, setFocusId} = stateFocusId;
	const visitaActual = useObtenerVisitaActual();
	const mostrarAviso = useMostrarAviso();
	const {t} = useTranslation();
	const {setAlerta, setConfigAlerta} = stateAviso;
	const {datosCliente} = useObtenerDatosCliente(clienteActual.codigoCliente);
	const {configuracionPedido}: any = datosCliente;
	const {venta} = visitaActual.pedidos;
	const productoEnVenta = venta.productos.find(
		(p) => producto.codigoProducto === p.codigoProducto
	);
	const [colorBorde, setColorBorde] = React.useState<string>('');

	const productoAMandar: TProductoPedido = {
		...producto,
		unidades: 0,
		subUnidades: 0,
		total: 0,
		tipoPago: clienteActual.tipoPagoActual,
		catalogoMotivo: '',
		estado: 'activo',
		preciosBase: {
			unidad: producto.precioConImpuestoUnidad,
			subUnidad: producto.precioConImpuestoSubunidad,
		},
		preciosNeto: {
			unidad: producto.precioConImpuestoUnidad,
			subUnidad: producto.precioConImpuestoSubunidad,
		},
	};

	const [infoDescuento, setInfoDescuento] = React.useState<TInfoDescuentos>({
		tipo: productoAMandar.descuento?.tipo,
		porcentajeDescuento: null,
		inputPolarizado: productoAMandar.descuento?.inputPolarizado ?? 0,
	});

	React.useEffect(() => {
		if (
			focusId === producto.codigoProducto &&
			producto.unidades === 0 &&
			producto.subUnidades === 0
		) {
			return setProductoAgregado(false);
		} else {
			return setProductoAgregado(true);
		}
	}, [focusId]);

	const obtenerCalculoDescuentoProducto =
		useObtenerCalculoDescuentoProducto(producto);

	const creditoDisponible = useObtenerCreditoDisponible().creditoDisponible;
	const obtenerTotalPedidosVisitaActual = useObtenerTotalPedidosVisitaActual();

	React.useEffect(() => {
		if (productoEnVenta) {
			if (
				productoEnVenta.unidades > configuracionPedido.cantidadMaximaUnidades
			) {
				return setColorBorde(theme.palette.primary.main);
			}

			if (productoEnVenta?.unidades > 0 || productoEnVenta?.subUnidades > 0) {
				if (!productoAgregado) {
					mostrarAviso(
						'success',
						t('toast.productoAgregado'),
						undefined,
						undefined,
						'ProductoAgreado'
					);
					setProductoAgregado(true);
				}
				return setColorBorde(theme.palette.success.main);
			}

			if (
				productoEnVenta?.unidades === 0 &&
				productoEnVenta?.subUnidades === 0 &&
				visitaActual.seQuedaAEditar.bordeError
			) {
				setProductoAgregado(false);
				return setColorBorde(theme.palette.primary.main);
			}
		}

		setColorBorde('#D9D9D9');
		setProductoAgregado(false);
	}, [
		productoEnVenta?.unidades,
		productoEnVenta?.subUnidades,
		visitaActual.seQuedaAEditar.bordeError,
	]);

	const firstRender = React.useRef(true);

	React.useEffect(() => {
		if (firstRender.current) {
			firstRender.current = false;
			return;
		}

		if (
			(producto.unidades > 0 || producto.subUnidades > 0) &&
			producto.tipoPago === ETiposDePago.Credito &&
			datosCliente?.informacionCrediticia.condicion !== 'contado' &&
			creditoDisponible -
				(obtenerTotalPedidosVisitaActual().totalCredito.totalPrecio ?? 0) <
				0
		) {
			mostrarAviso(
				'warning',
				t('toast.limiteDeCreditoExcedidoTitulo'),
				t('toast.limiteDeCreditoExcedidoMensaje'),
				undefined,
				'sinLimiteCredito'
			);
		}
	}, [producto.unidades, producto.subUnidades, creditoDisponible]);

	return (
		<Box minWidth={'100%'} display={'flex'} justifyContent={'end'}>
			<Box
				border={`1px solid ${colorBorde}`}
				borderRadius={bordeRedondeado ? '8px' : '0'}
				overflow='hidden'
				maxWidth={'304px'}
			>
				<SwitchYCheck
					producto={productoEnVenta ?? productoAMandar}
					conSwitch={conSwitch}
				/>
				<Box display='flex'>
					<Informacion
						producto={productoEnVenta ?? productoAMandar}
						conSwitch={conSwitch}
						stateInfoDescuento={{infoDescuento, setInfoDescuento}}
						stateAviso={{setAlerta, setConfigAlerta}}
						obtenerCalculoDescuentoProducto={obtenerCalculoDescuentoProducto}
					/>
					<Controles
						producto={productoEnVenta ?? productoAMandar}
						stateInputFocus={stateInputFocus}
						stateFocusId={stateFocusId}
						stateInfoDescuento={{infoDescuento, setInfoDescuento}}
						obtenerCalculoDescuentoProducto={obtenerCalculoDescuentoProducto}
					/>
				</Box>

				<Descuentos
					stateInfoDescuento={{infoDescuento, setInfoDescuento}}
					obtenerCalculoDescuentoProducto={obtenerCalculoDescuentoProducto}
					producto={productoEnVenta ?? productoAMandar}
					stateInputFocus={stateInputFocus}
					stateFocusId={stateFocusId}
				/>
			</Box>
		</Box>
	);
};

export default TarjetaTomaPedido;
