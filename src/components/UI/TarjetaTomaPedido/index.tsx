import React from 'react';
import {
	ETiposDePago,
	TInfoDescuentos,
	TProductoPedido,
	TStateInputFocus,
} from 'models';
import Box from '@mui/material/Box';
import theme from 'theme';
import {useObtenerClienteActual, useObtenerVisitaActual} from 'redux/hooks';
import {
	useObtenerCalculoDescuentoProducto,
	useObtenerDatosCliente,
	useCalularPruductoEnPromoOnGoing,
} from 'hooks';
import {SwitchYCheck, Informacion, Controles, PromoOngoing} from './components';

export interface StateFocusID {
	focusId: number;
	setFocusId: React.Dispatch<React.SetStateAction<number>>;
}
interface Props {
	bordeRedondeado?: boolean;
	conSwitch?: boolean;
	producto: TProductoPedido;
	stateAviso: any;
	stateFocusId: StateFocusID;
	stateInputFocus: TStateInputFocus;
}

export const TarjetaTomaPedido: React.VFC<Props> = ({
	producto,
	conSwitch = false,
	bordeRedondeado = false,
	stateInputFocus,
	stateFocusId,
	stateAviso,
}) => {
	const clienteActual = useObtenerClienteActual();
	const [productoAgregado, setProductoAgregado] = React.useState<boolean>(true);
	const {focusId} = stateFocusId;
	const visitaActual = useObtenerVisitaActual();
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
		porcentajeDescuento:
			productoAMandar.descuento &&
			productoAMandar.descuento?.porcentajeDescuento > 0
				? productoAMandar.descuento?.porcentajeDescuento
				: 0,
		inputPolarizado: productoAMandar.descuento?.inputPolarizado ?? 0,
	});

	const obtenerCalculoDescuentoProducto =
		useObtenerCalculoDescuentoProducto(producto);

	const calculosPromoOngoing = useCalularPruductoEnPromoOnGoing();

	const infoBeneficio = calculosPromoOngoing(producto.codigoProducto);

	const productoActual = productoEnVenta ?? productoAMandar;
	const puedeVerInfoPromoOngoin =
		productoActual.tipoPago === ETiposDePago.Credito
			? visitaActual.avisos.cambioElPedidoSinPromociones.credito === true
				? false
				: true
			: visitaActual.avisos.cambioElPedidoSinPromociones.contado === true
			? false
			: true;

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

	React.useEffect(() => {
		if (productoEnVenta) {
			if (
				productoEnVenta.unidades > configuracionPedido.cantidadMaximaUnidades
			) {
				return setColorBorde(theme.palette.primary.main);
			}

			if (productoEnVenta?.unidades > 0 || productoEnVenta?.subUnidades > 0) {
				if (!productoAgregado) {
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

	return (
		<Box minWidth='100%' display='flex' justifyContent='flex-end'>
			<Box
				border={`1px solid ${colorBorde}`}
				borderRadius={bordeRedondeado ? '8px' : '0'}
				overflow='hidden'
				maxWidth='304px'
				width='100%'
				sx={{
					background:
						'linear-gradient(90deg, transparent 0%, transparent 179px, #F5F0EF 179px, #F5F0EF 100%)',
				}}
			>
				<SwitchYCheck conSwitch={conSwitch} producto={productoActual} />
				<Box display='flex'>
					<Informacion
						conSwitch={conSwitch}
						infoBeneficio={infoBeneficio}
						obtenerCalculoDescuentoProducto={obtenerCalculoDescuentoProducto}
						producto={productoActual}
						stateInfoDescuento={{infoDescuento, setInfoDescuento}}
						stateInputFocus={stateInputFocus}
						stateFocusId={stateFocusId}
					/>
					<Controles
						infoBeneficio={infoBeneficio}
						obtenerCalculoDescuentoProducto={obtenerCalculoDescuentoProducto}
						producto={productoActual}
						stateFocusId={stateFocusId}
						stateInfoDescuento={{infoDescuento, setInfoDescuento}}
						stateInputFocus={stateInputFocus}
						puedeVerInfoPromoOngoin={puedeVerInfoPromoOngoin}
					/>
				</Box>
				{puedeVerInfoPromoOngoin && (
					<PromoOngoing
						producto={productoActual}
						infoDescuento={infoDescuento}
						infoBeneficio={infoBeneficio}
					/>
				)}
			</Box>
		</Box>
	);
};
