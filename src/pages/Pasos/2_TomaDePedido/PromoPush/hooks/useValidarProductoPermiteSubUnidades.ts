import {TConfiguracion,TTipoPedido} from 'models';
import {useCallback} from 'react';
import {useObtenerConfiguracion} from 'redux/hooks';
import {useObtenerDatosTipoPedido}from 'hooks';

export const useValidarProductoPermiteSubUnidades = () => {
	const configuracion: TConfiguracion = useObtenerConfiguracion();
	const obtenerDatosTipoPedido = useObtenerDatosTipoPedido();
	const tipoPedido:TTipoPedido | undefined = obtenerDatosTipoPedido(); 
	const productoPermiteSubUnidades = useCallback(
		(esVentaSubunidades: boolean): boolean => {
			
			if( tipoPedido?.habilitaSubunidades=='nunca'){
				 return false;
			}else if( tipoPedido?.habilitaSubunidades=='siempre'){
			 	return true;
			} else {
				return esVentaSubunidades;
			}
			
		},
		[tipoPedido]
	);
	return productoPermiteSubUnidades;
};
