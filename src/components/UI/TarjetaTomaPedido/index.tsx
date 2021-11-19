import React from 'react';
import {TPrecioProducto, TProductoPedido, TStateInputFocus} from 'models';
import Box from '@mui/material/Box';
import {CheckRedondoIcon} from 'assests/iconos';
import {useTranslation} from 'react-i18next';
import theme from 'theme';
import {SwitchCambiarTipoPago} from 'pages/Pasos/2_TomaDePedido/components';
import Controles from './components/Controles';
import Informacion from './components/Informacion';
import Descuentos from './components/Descuentos';
import {useObtenerClienteActual, useObtenerVisitaActual} from 'redux/hooks';
import SwitchYCheck from './components/SwitchYCheck';

export interface StateFocusID {
	focusId: number;
	setFocusId: React.Dispatch<React.SetStateAction<number>>;
}
interface Props {
	producto: TProductoPedido | TPrecioProducto;
	conSwitch?: boolean;
	bordeRedondeado?: boolean;
	descuento?: 'escalonado' | 'polarizado' | 'automatico';
	stateInputFocus: TStateInputFocus;
	stateFocusId: StateFocusID;
}

const TarjetaTomaPedido: React.FC<Props> = ({
	producto,
	conSwitch = false,
	bordeRedondeado = false,
	descuento,
	stateInputFocus,
	stateFocusId,
}) => {
	const clienteActual = useObtenerClienteActual();
	const visitaActual = useObtenerVisitaActual();
	const {venta} = visitaActual.pedidos;

	const productoEnVenta = venta.productos.find(
		(p) => producto.codigoProducto === p.codigoProducto
	);

	const prodcutoAMandar: TProductoPedido = {
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
		...producto,
	};

	return (
		<Box
			border={
				productoEnVenta &&
				(productoEnVenta.unidades > 0 || productoEnVenta.subUnidades > 0)
					? `1px solid ${theme.palette.success.main}`
					: '1px solid #D9D9D9'
			}
			borderRadius={bordeRedondeado ? '8px' : '0'}
			overflow='hidden'
		>
			<SwitchYCheck
				producto={productoEnVenta ?? prodcutoAMandar}
				conSwitch={conSwitch}
			/>
			<Box display='flex'>
				<Informacion
					codigoProducto={producto.codigoProducto}
					nombreProducto={producto.nombreProducto}
					presentacion={producto.presentacion}
					precioConImpuestoUnidad={producto.precioConImpuestoUnidad}
					precioConImpuestoSubunidad={producto.precioConImpuestoSubunidad}
					conSwitch={conSwitch}
				/>
				<Controles
					producto={productoEnVenta ?? prodcutoAMandar}
					stateInputFocus={stateInputFocus}
					stateFocusId={stateFocusId}
				/>
			</Box>
			{descuento && <Descuentos descuento={descuento} />}
		</Box>
	);
};

export default TarjetaTomaPedido;
