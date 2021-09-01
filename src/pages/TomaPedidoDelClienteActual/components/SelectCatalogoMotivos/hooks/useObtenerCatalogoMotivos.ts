import {TCatalogoMotivo, TOpcionSelect, TTipoPedido} from 'models';
import {useObtenerDatosTipoPedido} from 'hooks';

export const useObtenerCatalogoMotivos = (): TOpcionSelect[] => {

	const obtenerDatosTipoPedido = useObtenerDatosTipoPedido();

	const datosTipoPedidoActual:
	| TTipoPedido
	| undefined = obtenerDatosTipoPedido();

	let opcionesTiposDePedidos: TOpcionSelect[];

	if (!datosTipoPedidoActual) 
	{
		let defaultValues: TOpcionSelect[] = [{
			value: '',
			label: '',
		}]
		return defaultValues;
	}
		opcionesTiposDePedidos = datosTipoPedidoActual.catalogoMotivos.map(
			(catalogoMotivo: TCatalogoMotivo) => {
				return {
					value: catalogoMotivo.codigo.toString(),
					label: catalogoMotivo.descripcion,
				};
			}
		);

	return opcionesTiposDePedidos;
};
