import {TCliente, TPortafolio} from 'models';
import {useCallback} from 'react';
import {validarVentaSubUnidades} from 'utils/validaciones';
import {useObtenerConfiguracionActual, useObtenerClienteActual} from 'hooks';

export const usePermiteSubUnidades = () => {
	const configuracionActual = useObtenerConfiguracionActual();
	const obtenerClienteActual = useObtenerClienteActual();
	const permiteSubUnidades = useCallback(
		(codigoCliente: string, codigoProducto: number): boolean => {
			const clienteActual: TCliente | undefined = obtenerClienteActual(
				codigoCliente
			);
			if (clienteActual) {
				const portafolioProducto:
					| TPortafolio
					| undefined = clienteActual.portafolio.find(
					(productoPortafolio) =>
						productoPortafolio.codigoProducto === codigoProducto
				);
				const esPermitidoSubUnidades = validarVentaSubUnidades(
					configuracionActual.esVentaSubunidadesRuta,
					portafolioProducto?.esVentaSubunidades ?? false
				);
				return esPermitidoSubUnidades;
			}
			return false;
		},
		[configuracionActual, obtenerClienteActual]
	);
	return permiteSubUnidades;
};
