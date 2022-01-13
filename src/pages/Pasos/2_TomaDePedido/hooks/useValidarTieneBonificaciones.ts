import {TTipoPedido} from 'models';
import {useCallback} from 'react';
import {useObtenerVisitaActual} from 'redux/hooks';
import {useObtenerDatosTipoPedido}from 'hooks';

export const useValidarTieneBonificaciones = () => {
	const visitaActual = useObtenerVisitaActual();
	
	const validarTieneBonificaciones = useCallback(
		(): boolean => {
			let tieneBonificaciones = false;

			visitaActual.bonificaciones.map((bonificacion) => {
				if(bonificacion.detalle.length > 0)
					tieneBonificaciones = true;
			})

			return tieneBonificaciones;
		},
		[visitaActual.bonificaciones]
	);
	return validarTieneBonificaciones;
};
