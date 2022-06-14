import {useCallback} from 'react';
import {TDataSecundaria, TPrecioProducto} from 'models';
import {useFiltrarPreciosProductosDelClienteActual} from './useFiltrarPreciosProductosDelClienteActual';
import {useObtenerDatos} from 'redux/hooks';
import {useObtenerDatosTipoPedido} from './useObtenerDatosTipoPedido';
import {useObtenerPresupuestosTipoPedidoActual} from './useObtenerPresupuestosTipoPedidoActual';

export interface ItemsBusqueda extends TDataSecundaria {
	checked: boolean;
}

export interface FiltrosBusqueda {
	envases: ItemsBusqueda[];
	familias: ItemsBusqueda[];
	sabores: ItemsBusqueda[];
	marcas: ItemsBusqueda[];
	medidas: ItemsBusqueda[];
}

interface IDAtributosCliente {
	[key: string]: number[];
}

interface AtributosCliente {
	[key: number]: ItemsBusqueda;
}

export const useObtenerFiltrosDelCliente = () => {
	// Se obtienen los datos de los atributos
	const {envases, familias, sabores, marcas, medidas} = useObtenerDatos();

	const preciosProductosDelClienteActual =
		useFiltrarPreciosProductosDelClienteActual();

	const obtenerDatosTipoPedido = useObtenerDatosTipoPedido();
	const obtenerPresupuestosTipoPedidoActual =
		useObtenerPresupuestosTipoPedidoActual();

	const datosTipoPedidoActual = obtenerDatosTipoPedido();
	const presupuestoTipoPedido = obtenerPresupuestosTipoPedidoActual();

	const obtenerFiltrosCliente = useCallback(
		(resultadosBusqueda?: TPrecioProducto[]): FiltrosBusqueda => {
			let idAtributosCliente: IDAtributosCliente = {
				envases: [],
				familias: [],
				sabores: [],
				marcas: [],
				medidas: [],
			};

			// Si el cliente no tiene productos se hace un early return
			if (!preciosProductosDelClienteActual) {
				return {
					envases: [],
					familias: [],
					sabores: [],
					marcas: [],
					medidas: [],
				};
			}

			for (const producto of resultadosBusqueda ??
				preciosProductosDelClienteActual) {
				//Si el producto no tiene atributos se descarta
				if (!producto.atributos) continue;

				// Si el producto no cumple con estas condiciones se descarta
				if (
					(!datosTipoPedidoActual?.validaPresupuesto &&
						!datosTipoPedidoActual?.tipoProductosHabilitados.includes(
							producto.tipoProducto
						)) ||
					(datosTipoPedidoActual?.validaPresupuesto &&
						!presupuestoTipoPedido?.tieneProductosHabilitados &&
						!datosTipoPedidoActual?.tipoProductosHabilitados.includes(
							producto.tipoProducto
						)) ||
					(datosTipoPedidoActual?.validaPresupuesto &&
						presupuestoTipoPedido?.tieneProductosHabilitados &&
						!presupuestoTipoPedido.productosHabilitados.includes(
							producto.codigoProducto
						))
				) {
					continue;
				}

				// Se verifica que el codigo del producto no este en el arreglo
				!idAtributosCliente.sabores.includes(producto.atributos.sabor) &&
					idAtributosCliente.sabores.push(producto.atributos.sabor);
				!idAtributosCliente.familias.includes(producto.atributos.familia) &&
					idAtributosCliente.familias.push(producto.atributos.familia);
				!idAtributosCliente.medidas.includes(producto.atributos.medida) &&
					idAtributosCliente.medidas.push(producto.atributos.medida);
				!idAtributosCliente.marcas.includes(producto.atributos.marca) &&
					idAtributosCliente.marcas.push(producto.atributos.marca);
				!idAtributosCliente.envases.includes(producto.atributos.envase) &&
					idAtributosCliente.envases.push(producto.atributos.envase);
			}

			let envasesDelCliente: AtributosCliente = {};
			let familiasDelCliente: AtributosCliente = {};
			let saboresDelCliente: AtributosCliente = {};
			let marcasDelCliente: AtributosCliente = {};
			let medidasDelCliente: AtributosCliente = {};

			// Se recupera los datos de los atributos del cliente
			idAtributosCliente.envases.forEach(
				(id) => (envasesDelCliente[id] = {...envases[id], checked: false})
			);
			idAtributosCliente.familias.forEach(
				(id) => (familiasDelCliente[id] = {...familias[id], checked: false})
			);
			idAtributosCliente.sabores.forEach(
				(id) => (saboresDelCliente[id] = {...sabores[id], checked: false})
			);
			idAtributosCliente.marcas.forEach(
				(id) => (marcasDelCliente[id] = {...marcas[id], checked: false})
			);
			idAtributosCliente.medidas.forEach(
				(id) => (medidasDelCliente[id] = {...medidas[id], checked: false})
			);

			// Se retorna los datos de los atributos del cliente ordenados
			return {
				envases: Object.values(envasesDelCliente).sort((a, b) =>
					a.descripcion.localeCompare(b.descripcion)
				),
				familias: Object.values(familiasDelCliente).sort((a, b) =>
					a.descripcion.localeCompare(b.descripcion)
				),
				sabores: Object.values(saboresDelCliente).sort((a, b) =>
					a.descripcion.localeCompare(b.descripcion)
				),
				marcas: Object.values(marcasDelCliente).sort((a, b) =>
					a.descripcion.localeCompare(b.descripcion)
				),
				medidas: Object.values(medidasDelCliente).sort((a, b) => {
					const medidasA = a.descripcion.split(' ');
					const medidasB = b.descripcion.split(' ');

					if (medidasA[1] === medidasB[1]) {
						return a.descripcion.localeCompare(b.descripcion);
					}

					return b.descripcion.localeCompare(a.descripcion);
				}),
			};
		},
		[]
	);

	return {obtenerFiltrosCliente};
};
