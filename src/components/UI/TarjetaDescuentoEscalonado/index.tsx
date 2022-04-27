import React from 'react';
import {Box} from '@mui/material';
import {
	useObtenerDatosCliente,
	useObtenerCalculoDescuentoProducto,
	useCalularProductoEnPromoOnGoing,
} from 'hooks';
import {
	TProductoPedido,
	TStateInputFocus,
	TInfoDescuentos,
	ETiposDePago,
} from 'models';
import {useObtenerClienteActual, useObtenerVisitaActual} from 'redux/hooks';
import theme from 'theme';
import {StateFocusID} from '../TarjetaTomaPedido';
import {
	Control,
	DesplegableEscalonados,
	Informacion,
	SwitchYCheck,
} from './components';
import {BotonDescuentoEscalonado} from './components/BotonDescuentoEscalonado';

interface Props {
	bordeRedondeado?: boolean;
	conSwitch?: boolean;
	producto: TProductoPedido;
	stateAviso: any;
	stateFocusId: StateFocusID;
	stateInputFocus: TStateInputFocus;
}

export const TarjetaDescuentoEscalonado: React.VFC<Props> = ({
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

	const calculosPromoOngoing = useCalularProductoEnPromoOnGoing();

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

	const [abrirCollapse, setAbrirCollapse] = React.useState<boolean>(false);

	return (
		<Box minWidth='100%' display='flex' justifyContent='flex-end'>
			<Box
				border={`1px solid ${colorBorde}`}
				borderRadius={bordeRedondeado ? '8px' : '0'}
				display='grid'
				gridTemplateAreas={
					abrirCollapse
						? `"Switch Check"
              "Informacion1 Informacion1"
              "Informacion2 Control2"
              "DescuentoEscalonado DescuentoEscalonado"
              "Descuento Descuento"
              "BotonDescuento BotonDescuento"`
						: `"Switch Check"
              "Informacion1 Control1"
              "Informacion2 Control2"
              "DescuentoEscalonado DescuentoEscalonado"
              "Descuento Descuento"
              "BotonDescuento BotonDescuento"`
				}
				gridTemplateColumns='179px 125px'
				overflow='hidden'
				paddingBottom='12px'
				maxWidth='304px'
				width='100%'
				sx={{
					background: abrirCollapse
						? '#fff'
						: 'linear-gradient(90deg, transparent 0%, transparent 179px, #F5F0EF 179px, #F5F0EF 100%)',
					transition: 'all .3s ease-in-out',
				}}
			>
				<SwitchYCheck
					abrirCollapse={abrirCollapse}
					conSwitch={conSwitch}
					unidades={producto.unidades}
				/>
				<Informacion
					abrirCollapse={abrirCollapse}
					producto={productoEnVenta ?? productoAMandar}
				/>
				<Control
					abrirCollapse={abrirCollapse}
					producto={productoEnVenta ?? productoAMandar}
					stateInfoDescuento={{infoDescuento, setInfoDescuento}}
					stateFocusId={stateFocusId}
					obtenerCalculoDescuentoProducto={obtenerCalculoDescuentoProducto}
					stateInputFocus={stateInputFocus}
				/>
				<BotonDescuentoEscalonado
					producto={productoEnVenta ?? productoAMandar}
					stateAviso={stateAviso}
					stateInfoDescuento={{infoDescuento, setInfoDescuento}}
				/>
				<DesplegableEscalonados
					abrirCollapse={abrirCollapse}
					descuentosEscalonados={producto.descuentoEscalonado!}
					setAbrirCollapse={setAbrirCollapse}
				/>
			</Box>
		</Box>
	);
};
