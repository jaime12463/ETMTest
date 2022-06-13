import {createRef, useEffect, useState} from 'react';
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
	StateFocusID,
} from 'models';
import {useObtenerClienteActual, useObtenerVisitaActual} from 'redux/hooks';
import theme from 'theme';
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
	const [productoAgregado, setProductoAgregado] = useState<boolean>(true);
	const {focusId} = stateFocusId;
	const visitaActual = useObtenerVisitaActual();
	const {datosCliente} = useObtenerDatosCliente(clienteActual.codigoCliente);
	const {configuracionPedido}: any = datosCliente;
	const {venta} = visitaActual.pedidos;
	const productoEnVenta = venta.productos.find(
		(p) => producto.codigoProducto === p.codigoProducto
	);
	const [colorBorde, setColorBorde] = useState<string>('');
	const [descElimiado, setDescEliminado] = useState<boolean>(false);
	const [abrirCollapse, setAbrirCollapse] = useState<boolean>(false);
	const [offsetPrecios, setOffsetPrecios] = useState<{
		unidad: number;
		subUnidad: number;
	}>({unidad: 0, subUnidad: 0});

	const divRef = createRef<HTMLDivElement>();

	useEffect(() => {
		if (divRef.current) {
			const precioUnidad = divRef.current.children[2] as HTMLSpanElement;
			const precioSubUnidad = divRef.current.children[4] as HTMLSpanElement;

			setOffsetPrecios({
				unidad: precioUnidad.offsetLeft,
				subUnidad: precioSubUnidad.offsetLeft,
			});
		}
	}, []);

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

	const [infoDescuento, setInfoDescuento] = useState<TInfoDescuentos>({
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

	useEffect(() => {
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

	useEffect(() => {
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

	useEffect(() => {
		if (descElimiado) {
			setAbrirCollapse(false);
		}
	}, [descElimiado]);

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
					producto={productoEnVenta ?? productoAMandar}
					unidades={producto.unidades}
				/>
				<Informacion
					abrirCollapse={abrirCollapse}
					ref={divRef}
					producto={productoEnVenta ?? productoAMandar}
				/>
				<Control
					abrirCollapse={abrirCollapse}
					infoBeneficio={infoBeneficio}
					obtenerCalculoDescuentoProducto={obtenerCalculoDescuentoProducto}
					producto={productoEnVenta ?? productoAMandar}
					puedeVerInfoPromoOngoin={puedeVerInfoPromoOngoin}
					stateFocusId={stateFocusId}
					stateInfoDescuento={{infoDescuento, setInfoDescuento}}
					stateInputFocus={stateInputFocus}
				/>
				<BotonDescuentoEscalonado
					offsetPrecioSubUnidad={offsetPrecios.subUnidad}
					offsetPrecioUnidad={offsetPrecios.unidad}
					producto={productoEnVenta ?? productoAMandar}
					setDescEliminado={setDescEliminado}
					stateAviso={stateAviso}
					stateInfoDescuento={{infoDescuento, setInfoDescuento}}
				/>
				<DesplegableEscalonados
					abrirCollapse={abrirCollapse}
					descuentosEscalonados={producto.descuentoEscalonado!}
					setAbrirCollapse={setAbrirCollapse}
					descEliminado={descElimiado}
				/>
			</Box>
		</Box>
	);
};
