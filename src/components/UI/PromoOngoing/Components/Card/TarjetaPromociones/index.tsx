import React from 'react';
import {Controles} from './Controles';
import {Informacion} from './Informacion';
import {ETiposDePago, TProducto} from 'models';
import {Box} from '@mui/material';
import {useObtenerDatos} from 'redux/hooks';

interface Props {
	cantidadesPedido: {[codigo: number]: number};
	grupoYSecuenciaActual: {
		grupo: number;
		secuencia: number;
	};
	producto: {
		cantidad: number;
		codigoProducto: number;
		tope: number;
		tipoPago: ETiposDePago;
		unidadMedida: string;
		topeSecuencia: number;
	};
	promocionAplicada: boolean;
	promocionAutomatica: boolean;
	promocionSinDisponible: boolean;
	stateBeneficiosParaAgregar: any;
	statefocusId: any;
	setCantidadesPedido: React.Dispatch<
		React.SetStateAction<{[codigo: number]: number}>
	>;
}

export const TarjetaPromociones: React.VFC<Props> = ({
	cantidadesPedido,
	grupoYSecuenciaActual,
	producto,
	promocionAplicada,
	promocionAutomatica,
	promocionSinDisponible,
	setCantidadesPedido,
	stateBeneficiosParaAgregar,
	statefocusId,
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
						cantidadesPedido={cantidadesPedido}
						grupoYSecuenciaActual={grupoYSecuenciaActual}
						producto={producto}
						promocionAplicada={promocionAplicada}
						promocionAutomatica={promocionAutomatica}
						promocionSinDisponible={promocionSinDisponible}
						stateBeneficiosParaAgregar={stateBeneficiosParaAgregar}
						statefocusId={statefocusId}
						unidadMedida={producto.unidadMedida}
						setCantidadesPedido={setCantidadesPedido}
					/>
				</Box>
			)}
		</>
	);
};
