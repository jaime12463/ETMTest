import {useObtenerConfiguracion} from 'redux/hooks';
import {TOpcionSelect} from 'models';

export const useObtenerOpcionesTiposDePedidos = (): TOpcionSelect[] => {
	const configuracion = useObtenerConfiguracion();
	const opcionesTiposDePedidos: TOpcionSelect[] = configuracion.tipoPedidos.map(
		(tipoPedido) => {
			return {
				value: tipoPedido.codigo.toString(),
				label: tipoPedido.descripcion,
			};
		}
	);

	return opcionesTiposDePedidos;
};
