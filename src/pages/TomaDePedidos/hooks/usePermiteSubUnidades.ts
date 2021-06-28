import {TPortafolio} from 'models';
import {useCallback} from 'react';
import {useAppSelector} from 'redux/hooks';
import {selectConfiguracion} from 'redux/features/configuracion/configuracionSlice';
import {selectDatos} from 'redux/features/datos/datosSlice';
import {validarVentaSubUnidades} from 'utils/validaciones';

export const usePermiteSubUnidades = () => {
	const {datos} = useAppSelector(selectDatos);
	const {
		datos: {configuraciones},
	} = useAppSelector(selectConfiguracion);
	const permiteSubUnidades = useCallback(
		(codigoCliente: string, codigoProducto: number) => {
			const portafolioProducto: TPortafolio | undefined = datos.clientes[
				codigoCliente
			].portafolio.find(
				(productoPortafolio) =>
					productoPortafolio.codigoProducto === codigoProducto
			);
			const esPermitidoSubUnidades = validarVentaSubUnidades(
				configuraciones[0].esVentaSubunidadesRuta,
				portafolioProducto?.esVentaSubunidades ?? false
			);
			return esPermitidoSubUnidades;
		},
		[configuraciones, datos]
	);
	return permiteSubUnidades;
};
