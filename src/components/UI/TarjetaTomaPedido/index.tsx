import React from 'react';
import {
	TInfoDescuentos,
	TPrecioProducto,
	TProductoPedido,
	TStateInputFocus,
} from 'models';
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
import {useObtenerCalculoDescuentoProducto} from 'hooks';
import Modal from '../Modal';

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
	const visitaActual = useObtenerVisitaActual();
	const {setAlerta, setConfigAlerta} = stateAviso;
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
			if (productoEnVenta?.unidades > 0 || productoEnVenta?.subUnidades > 0) {
				return setColorBorde(theme.palette.success.main);
			}

			if (
				productoEnVenta?.unidades === 0 &&
				productoEnVenta?.subUnidades === 0 &&
				visitaActual.seQuedaAEditar.bordeError
			) {
				return setColorBorde(theme.palette.primary.main);
			}
		}

		setColorBorde('#D9D9D9');
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
				stateAviso={{setAlerta, setConfigAlerta}}
			/>
		</Box>
	);
};

export default TarjetaTomaPedido;
