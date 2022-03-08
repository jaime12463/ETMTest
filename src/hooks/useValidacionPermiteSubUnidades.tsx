import {TProductoPedido, TTipoPedido} from 'models';
import {validarSubUnidades} from 'utils/validaciones';
import {useObtenerDatosTipoPedido} from './useObtenerDatosTipoPedido';

export const useValidacionPermiteSubUnidades = (
	producto: TProductoPedido
): boolean => {
	const obtenerDatosTipoPedido = useObtenerDatosTipoPedido();
	const datosTipoPedidoActual: TTipoPedido | undefined =
		obtenerDatosTipoPedido();

	return validarSubUnidades(
		producto.esVentaSubunidades,
		datosTipoPedidoActual?.habilitaSubunidades
	);
};
