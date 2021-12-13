import {TCatalogoMotivo, TOpcionSelect, TTipoPedido} from 'models';
import {useObtenerDatosTipoPedido} from 'hooks';

export const useObtenerCatalogoMotivos = (
	codigoMotivo?: string,
	tipoPedido?: string
): TOpcionSelect[] /*| undefined*/ => {
	const obtenerDatosTipoPedido = useObtenerDatosTipoPedido();

	const datosTipoPedidoActual: TTipoPedido | undefined =
		obtenerDatosTipoPedido(tipoPedido);

	let todosCatalogosMotivos: TOpcionSelect[];

	if (!datosTipoPedidoActual) {
		let defaultValues: TOpcionSelect[] = [
			{
				value: '',
				label: '',
			},
		];
		return defaultValues;
	}

	todosCatalogosMotivos = datosTipoPedidoActual.catalogoMotivos.map(
		(catalogoMotivo: TCatalogoMotivo) => {
			return {
				value: catalogoMotivo.codigo.toString(),
				label: catalogoMotivo.descripcion,
			};
		}
	);

	if (codigoMotivo) {
		let unicoMotivo: TOpcionSelect | undefined = todosCatalogosMotivos.find(
			(motivo) => motivo.value === codigoMotivo
		);
		let motivoAux: TOpcionSelect[] = [];
		if (unicoMotivo) motivoAux.push(unicoMotivo);

		return motivoAux;
	}

	return todosCatalogosMotivos;
};
