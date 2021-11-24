import React from 'react';
import Box from '@mui/material/Box';
import theme from 'theme';
import Controles from './components/Controles';
import Informacion from './components/Informacion';
import Check from './components/Check';
import {TPrecioProducto, TProductoPedido, TStateInputFocus} from 'models';
import {useObtenerClienteActual, useObtenerVisitaActual} from 'redux/hooks';

export interface StateFocusID {
	focusId: number;
	setFocusId: React.Dispatch<React.SetStateAction<number>>;
}
interface Props {
	producto: TPrecioProducto;
	stateInputFocus: TStateInputFocus;
	stateFocusId: StateFocusID;
	resetCoberturas: boolean;
	setResetCoberturas: React.Dispatch<React.SetStateAction<boolean>>;
}

const TarjetaCoberturas: React.FC<Props> = ({
	producto,
	stateFocusId,
	stateInputFocus,
	resetCoberturas,
	setResetCoberturas,
}) => {
	const clienteActual = useObtenerClienteActual();
	const visitaActual = useObtenerVisitaActual();
	const {venta} = visitaActual.pedidos;

	const productoEnPedido = venta.productos.find(
		(p) => p.codigoProducto === producto.codigoProducto
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
				productoEnPedido &&
				(productoEnPedido.unidades > 0 || productoEnPedido.subUnidades > 0)
					? `1px solid ${theme.palette.success.main}`
					: '1px solid #D9D9D9'
			}
			overflow='hidden'
		>
			<Check producto={prodcutoAMandar} />
			<Box display='flex'>
				<Informacion
					codigoProducto={producto.codigoProducto}
					nombreProducto={producto.nombreProducto}
					presentacion={producto.presentacion}
					precioConImpuestoUnidad={producto.precioConImpuestoUnidad}
					precioConImpuestoSubunidad={producto.precioConImpuestoSubunidad}
				/>
				<Controles
					producto={prodcutoAMandar}
					stateInputFocus={stateInputFocus}
					stateFocusId={stateFocusId}
					resetCoberturas={resetCoberturas}
					setResetCoberturas={setResetCoberturas}
				/>
			</Box>
		</Box>
	);
};

export default TarjetaCoberturas;
