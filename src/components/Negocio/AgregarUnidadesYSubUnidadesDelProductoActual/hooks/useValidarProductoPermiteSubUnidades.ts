import {TClienteActual, TPortafolio, TConfiguracion} from 'models';
import {useCallback} from 'react';
import {validarVentaSubUnidades} from 'utils/validaciones';
import {useObtenerDatosCliente} from 'hooks';
import {useObtenerClienteActual, useObtenerConfiguracion} from 'redux/hooks';

export const useValidarProductoPermiteSubUnidades = () => {
	const configuracion: TConfiguracion = useObtenerConfiguracion();
	const clienteActual: TClienteActual = useObtenerClienteActual();
	const {datosCliente} = useObtenerDatosCliente(clienteActual.codigoCliente);
	const productoPermiteSubUnidades = useCallback(
		(codigoProducto: number): boolean => {
			if (datosCliente) {
				const portafolioProducto:
					| TPortafolio
					| undefined = datosCliente.portafolio.find(
					(productoPortafolio) =>
						productoPortafolio.codigoProducto === codigoProducto
				);
				const esPermitidoSubUnidades = validarVentaSubUnidades(
					configuracion.esVentaSubunidadesRuta,
					portafolioProducto?.esVentaSubunidades ?? false
				);
				return esPermitidoSubUnidades;
			}
			return false;
		},
		[configuracion, datosCliente]
	);
	return productoPermiteSubUnidades;
};
