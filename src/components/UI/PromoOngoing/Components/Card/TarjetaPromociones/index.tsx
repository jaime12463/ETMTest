import {Controles} from './Controles';
import {Informacion} from './Informacion';
import {TProducto, TProductos, TProductosPromoOngoingAplicadas} from 'models';
import {Box} from '@mui/material';
import {useObtenerDatos} from 'redux/hooks';
import React from 'react';

interface Props {
	producto: TProductosPromoOngoingAplicadas;
	statefocusId: any;
}

export const TarjetaPromociones: React.FC<Props> = ({
	producto,
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
						statefocusId={statefocusId}
						producto={productoActual}
						unidadMedida={producto.unidadMedida}
					/>
				</Box>
			)}
		</>
	);
};

/* 	<Informacion producto={producto} unidadMedida={unidadMedida} />
				<Controles
					producto={producto}
					contador={contador}
					estadoInicial={estadoInicial}
					incrementar={incrementar}
					decrementar={decrementar}
					reiniciar={reiniciar}
					idBonificacion={idBonificacion}
					unidadMedida={unidadMedida}
					idGrupo={idGrupo}
					resetBonificaciones={resetBonificaciones}
					actualizarContador={actualizarContador}
					errorAplicacionTotal={errorAplicacionTotal}
					statefocusId={statefocusId}
					statePrimerProductoAgregado={statePrimerProductoAgregado}
				/> */
