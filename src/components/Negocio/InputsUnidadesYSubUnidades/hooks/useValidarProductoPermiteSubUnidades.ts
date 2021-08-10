import {TConfiguracion} from 'models';
import {useCallback} from 'react';
import {useObtenerConfiguracion} from 'redux/hooks';

export const useValidarProductoPermiteSubUnidades = () => {
	const configuracion: TConfiguracion = useObtenerConfiguracion();
	const productoPermiteSubUnidades = useCallback(
		(esVentaSubunidades: any): boolean => {
			const esPermitidoSubUnidades =
				configuracion?.esVentaSubunidadesRuta && esVentaSubunidades;
			return esPermitidoSubUnidades;
		},
		[configuracion]
	);
	return productoPermiteSubUnidades;
};
