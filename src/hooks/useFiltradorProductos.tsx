import {TPrecioProducto} from 'models';
import {useObtenerDatosTipoPedido} from './useObtenerDatosTipoPedido';
import {useObtenerPresupuestosTipoPedidoActual} from './useObtenerPresupuestosTipoPedidoActual';
import {useFiltrarPreciosProductosDelClienteActual} from './useFiltrarPreciosProductosDelClienteActual';

interface IDFiltros {
	envases: number[];
	familias: number[];
	sabores: number[];
	marcas: number[];
	medidas: number[];
}

interface AgregarProductoAResultados {
	envases: boolean;
	familias: boolean;
	sabores: boolean;
	marcas: boolean;
	medidas: boolean;
	busqueda: boolean;
}

export const useFiltradorProductos = (
	busqueda: string,
	{envases, medidas, familias, marcas, sabores}: IDFiltros
): TPrecioProducto[] => {
	let resultadosBusqueda: TPrecioProducto[] = [];

	const preciosProductosDelClienteActual =
		useFiltrarPreciosProductosDelClienteActual();
	const obtenerDatosTipoPedido = useObtenerDatosTipoPedido();
	const obtenerPresupuestosTipoPedidoActual =
		useObtenerPresupuestosTipoPedidoActual();

	const datosTipoPedidoActual = obtenerDatosTipoPedido();
	const presupuestoTipoPedido = obtenerPresupuestosTipoPedidoActual();

	// Si el cliente no tiene productos se retorna un array vacio
	if (!preciosProductosDelClienteActual) return [];

	const preciosProductosHabilitados = preciosProductosDelClienteActual
		.filter((producto) => {
			// Si el producto no cumple con estas condiciones se descarta
			if (
				!(
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
						)) ||
					producto.promoPush
				)
			) {
				return producto;
			}
		})
		.sort((a, b) => (a.codigoProducto > b.codigoProducto ? 1 : -1));

	// Si no hay busqueda ni filtros aplicados se devuelve un array vacio
	if (
		busqueda.length < 3 &&
		!sabores.length &&
		!familias.length &&
		!marcas.length &&
		!envases.length &&
		!medidas.length
	) {
		return preciosProductosHabilitados;
	}

	// Recorremos los productos habilitados que posee el cliente
	for (const producto of preciosProductosHabilitados) {
		// agregarProductoAResultados se encarga de ir validando si el producto cumple con las condiciones de busqueda y/o filtrado
		let agregarProductoAResultados: AgregarProductoAResultados = {
			envases: false,
			familias: false,
			sabores: false,
			marcas: false,
			medidas: false,
			busqueda: false,
		};

		agregarProductoAResultados.busqueda =
			producto.nombreProducto
				.toLowerCase()
				.includes(busqueda.toString().toLowerCase()) ||
			producto.codigoProducto.toString().includes(busqueda.toString());

		if (sabores.length) {
			// Si hay filtros de sabores aplicados verificamos si el producto posee atributos
			if (producto.atributos) {
				// En el caso de que tenga atributos se comprueba que alguno de los filtros aplicados coincida con su atributo
				agregarProductoAResultados.sabores = sabores.includes(
					producto.atributos.sabor
				);
			} else {
				// Si no hay coincidencias de los filtros con los atributos del producto se descarta
				agregarProductoAResultados.sabores = false;
			}
		} else {
			// Si no hay filtros aplicados de este tipo se pasa a la siguiente validación
			agregarProductoAResultados.sabores = true;
		}

		if (medidas.length) {
			if (producto.atributos) {
				agregarProductoAResultados.medidas = medidas.includes(
					producto.atributos.medida
				);
			} else {
				agregarProductoAResultados.medidas = false;
			}
		} else {
			agregarProductoAResultados.medidas = true;
		}

		if (marcas.length) {
			if (producto.atributos) {
				agregarProductoAResultados.marcas = marcas.includes(
					producto.atributos.marca
				);
			} else {
				agregarProductoAResultados.marcas = false;
			}
		} else {
			agregarProductoAResultados.marcas = true;
		}

		if (envases.length) {
			if (producto.atributos) {
				agregarProductoAResultados.envases = envases.includes(
					producto.atributos.envase
				);
			} else {
				agregarProductoAResultados.envases = false;
			}
		} else {
			agregarProductoAResultados.envases = true;
		}

		if (familias.length) {
			if (producto.atributos) {
				agregarProductoAResultados.familias = familias.includes(
					producto.atributos.familia
				);
			} else {
				agregarProductoAResultados.familias = false;
			}
		} else {
			agregarProductoAResultados.familias = true;
		}

		// Se verifica que agregarProductoAResultados tenga todas sus propiedades en true
		const validoAgregar = Object.values(agregarProductoAResultados).every(
			(valor) => valor === true
		);

		// Si el producto es valido se agrega al resultado
		if (validoAgregar) {
			resultadosBusqueda.push(producto);
		}
	}

	// Se retorna los resultados de búsqueda ordenados por codigoProducto
	return resultadosBusqueda.sort((a, b) =>
		a.codigoProducto > b.codigoProducto ? 1 : -1
	);
};
