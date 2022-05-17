import React from 'react';
import Box from '@mui/material/Box';
import theme from 'theme';
import Controles from './components/Controles';
import Check from './components/Check';
import {TPrecioProducto, TProductoPedido, TStateInputFocus} from 'models';
import {useObtenerClienteActual, useObtenerVisitaActual} from 'redux/hooks';
import {InformacionProducto} from '..';

interface StateFocusID {
	focusId: number;
	setFocusId: React.Dispatch<React.SetStateAction<number>>;
}
interface Props {
	producto: TPrecioProducto;
	resetCoberturas: boolean;
	setResetCoberturas: React.Dispatch<React.SetStateAction<boolean>>;
	stateFocusId: StateFocusID;
	stateInputFocus: TStateInputFocus;
}

export const TarjetaCoberturas: React.VFC<Props> = ({
	producto,
	resetCoberturas,
	setResetCoberturas,
	stateFocusId,
	stateInputFocus,
}) => {
	const clienteActual = useObtenerClienteActual();
	const visitaActual = useObtenerVisitaActual();

	const coberturaEjecutada = visitaActual.coberturasEjecutadas.find(
		(cobertura) => cobertura.codigoProducto === producto.codigoProducto
	);

	const productoAMandar: TProductoPedido = {
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
		preciosPromo: {
			unidad: 0,
			subUnidad: 0,
		},
		...producto,
		...coberturaEjecutada,
	};

	return (
		<Box
			border={
				coberturaEjecutada &&
				(coberturaEjecutada.unidades > 0 || coberturaEjecutada.subUnidades > 0)
					? `1px solid ${theme.palette.success.main}`
					: '1px solid #D9D9D9'
			}
			overflow='hidden'
			sx={{
				background:
					'linear-gradient(90deg, transparent 0%, transparent 177px, #F5F0EF 177px, #F5F0EF 100%)',
			}}
		>
			<Check producto={productoAMandar} />
			<Box display='flex'>
				<InformacionProducto producto={productoAMandar} />
				<Controles
					producto={productoAMandar}
					stateInputFocus={stateInputFocus}
					stateFocusId={stateFocusId}
					resetCoberturas={resetCoberturas}
					setResetCoberturas={setResetCoberturas}
				/>
			</Box>
		</Box>
	);
};
