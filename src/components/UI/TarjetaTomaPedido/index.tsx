import React from 'react';
import {TInfoDescuentos, TProductoPedido, TStateInputFocus} from 'models';
import Box from '@mui/material/Box';
import theme from 'theme';
import Controles from './components/Controles';
import Informacion from './components/Informacion';
import Descuentos from './components/Descuentos';
import {useObtenerClienteActual, useObtenerVisitaActual} from 'redux/hooks';
import SwitchYCheck from './components/SwitchYCheck';
import {
	useObtenerCalculoDescuentoProducto,
	useObtenerDatosCliente,
	useMostrarAviso,
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
	const [productoAgregado, setProductoAgregado] =
		React.useState<boolean>(false);
	const visitaActual = useObtenerVisitaActual();
	const mostrarAviso = useMostrarAviso();
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

	const obtenerCalculoDescuentoProducto =
		useObtenerCalculoDescuentoProducto(producto);

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
						'Producto agregado correctamente',
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
	}, [productoEnVenta, visitaActual.seQuedaAEditar.bordeError]);

	return (
		<Box
			border={`1px solid ${colorBorde}`}
			borderRadius={bordeRedondeado ? '8px' : '0'}
			overflow='hidden'
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
	);
};

export default TarjetaTomaPedido;
