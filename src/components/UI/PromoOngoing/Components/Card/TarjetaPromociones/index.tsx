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
		topeSecuencia: number;
	};
	statefocusId: any;
	promocionAplicada: boolean;
	stateBeneficiosParaAgregar: any;
	promocionAutomatica: boolean;
	promocionSinDisponible: boolean;
	grupoYSecuenciaActual: {
		grupo: number;
		secuencia: number;
	};
}

export const TarjetaPromociones: React.FC<Props> = ({
	producto,
	statefocusId,
	promocionAplicada,
	promocionSinDisponible,
	promocionAutomatica,
	stateBeneficiosParaAgregar,
	grupoYSecuenciaActual,
}) => {
	const datos = useObtenerDatos();
	const [productoActual, setProductoActual] = React.useState<TProducto>();
	React.useEffect(() => {
		if (datos) {
			setProductoActual(datos.productos[producto.codigoProducto]);
		}
	}, [producto]);

	//console.log(producto);

	return (
		<>
			{productoActual && (
				<Box display='flex'>
					<Informacion
						producto={productoActual}
						unidadMedida={producto.unidadMedida}
					/>
					<Controles
						grupoYSecuenciaActual={grupoYSecuenciaActual}
						promocionAutomatica={promocionAutomatica}
						promocionAplicada={promocionAplicada}
						statefocusId={statefocusId}
						producto={producto}
						unidadMedida={producto.unidadMedida}
						stateBeneficiosParaAgregar={stateBeneficiosParaAgregar}
						promocionSinDisponible={promocionSinDisponible}
					/>
				</Box>
			)}
		</>
	);
};
