import {Controles} from './Controles';
import {Informacion} from './Informacion';
import {
	ETiposDePago,
	TProducto,
	TProductos,
	TProductosPromoOngoingAplicadas,
} from 'models';
import {Box} from '@mui/material';
import {useObtenerDatos} from 'redux/hooks';
import React from 'react';

interface Props {
	producto: {
		cantidad: number;
		codigoProducto: number;
		tope: number;
		tipoPago: ETiposDePago;
		unidadMedida: string;
	};
	statefocusId: any;
	promocionAplicada: boolean;
	stateBeneficiosParaAgregar: any;
	promocionAutomatica: boolean;
}

export const TarjetaPromociones: React.FC<Props> = ({
	producto,
	statefocusId,
	promocionAplicada,
	promocionAutomatica,
	stateBeneficiosParaAgregar,
}) => {
	const datos = useObtenerDatos();
	const [productoActual, setProductoActual] = React.useState<TProducto>();
	React.useEffect(() => {
		if (datos) {
			setProductoActual(datos.productos[producto.codigoProducto]);
		}
	}, [producto]);

	return (
		<>
			{productoActual && (
				<Box display='flex'>
					<Informacion
						producto={productoActual}
						unidadMedida={producto.unidadMedida}
					/>
					<Controles
						promocionAutomatica={promocionAutomatica}
						promocionAplicada={promocionAplicada}
						statefocusId={statefocusId}
						producto={producto}
						unidadMedida={producto.unidadMedida}
						stateBeneficiosParaAgregar={stateBeneficiosParaAgregar}
					/>
				</Box>
			)}
		</>
	);
};
