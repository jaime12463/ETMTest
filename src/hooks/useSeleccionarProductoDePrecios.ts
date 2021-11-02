import {Dispatch, SetStateAction, useCallback} from 'react';
import {
	TProductoPedido,
	TPedido,
	TPrecioProducto,
	InputsKeysFormTomaDePedido,
	TFunctionMostarAvertenciaPorDialogo,
	TInputFiltrarPreciosProductos,
	TFormTomaDePedido,
} from 'models';
import {useObtenerPedidoActual} from 'redux/hooks';
import {UseFormSetValue} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {
	useMostrarAviso,
	useObtenerDatosTipoPedido,
	useObtenerPresupuestosTipoPedidoActual,
} from 'hooks';

export const useSeleccionarProductoDePrecios = (
	setProductoActual: Dispatch<SetStateAction<TPrecioProducto | null>>,
	setValue: UseFormSetValue<TFormTomaDePedido>,
	preciosProductos: TPrecioProducto[] | undefined,
	setInputFocus: Dispatch<SetStateAction<InputsKeysFormTomaDePedido>>,
	mostrarAdvertenciaEnDialogo: TFunctionMostarAvertenciaPorDialogo
) => {
	const pedidoActual: TPedido = useObtenerPedidoActual();
	const obtenerDatosTipoPedido = useObtenerDatosTipoPedido();
	const obtenerPresupuestosTipoPedidoActual =
		useObtenerPresupuestosTipoPedidoActual();
	const {t} = useTranslation();
	const mostrarAviso = useMostrarAviso();

	const seleccionarProductoDePrecios = useCallback(
		({productoABuscar}: TInputFiltrarPreciosProductos) => {
			if (!preciosProductos) return;

			const productoEncontrado: TPrecioProducto | undefined =
				preciosProductos.find(
					(precioProducto: TPrecioProducto) =>
						precioProducto.codigoProducto === parseInt(productoABuscar)
				);

			if (!productoEncontrado) {
				// mostrarAdvertenciaEnDialogo(
				// 	t('advertencias.ProductoNoEstaEnPortafolioCliente'),
				// 	'producto-no-esta-en-portafolio'
				// );
				mostrarAviso(
					'error',
					t('advertencias.ProductoNoEstaEnPortafolioCliente')
				);
				return;
			}

			const {codigoProducto} = productoEncontrado;
			const datosTipoPedidoActual = obtenerDatosTipoPedido();
			const presupuestoTipoPedido = obtenerPresupuestosTipoPedidoActual();

			if (
				!datosTipoPedidoActual?.validaPresupuesto &&
				!datosTipoPedidoActual?.tipoProductosHabilitados.includes(
					productoEncontrado.tipoProducto
				)
			) {
				// mostrarAdvertenciaEnDialogo(
				// 	t('advertencias.ProductoNoEstaHabilitado', {
				// 		descripcion: datosTipoPedidoActual?.descripcion,
				// 	}),
				// 	'producto-no-esta-habilitado'
				// );
				mostrarAviso(
					'error',
					t('advertencias.ProductoNoEstaHabilitado', {
						descripcion: datosTipoPedidoActual?.descripcion,
					})
				);
				return;
			}

			if (
				datosTipoPedidoActual?.validaPresupuesto &&
				!presupuestoTipoPedido?.tieneProductosHabilitados &&
				!datosTipoPedidoActual?.tipoProductosHabilitados.includes(
					productoEncontrado.tipoProducto
				)
			) {
				// mostrarAdvertenciaEnDialogo(
				// 	t('advertencias.ProductoNoEstaHabilitado', {
				// 		descripcion: datosTipoPedidoActual?.descripcion,
				// 	}),
				// 	'producto-no-esta-habilitado'
				// );
				mostrarAviso(
					'error',
					t('advertencias.ProductoNoEstaHabilitado', {
						descripcion: datosTipoPedidoActual?.descripcion,
					})
				);
				return;
			}

			if (
				datosTipoPedidoActual?.validaPresupuesto &&
				presupuestoTipoPedido?.tieneProductosHabilitados &&
				!presupuestoTipoPedido.productosHabilitados.includes(codigoProducto)
			) {
				// mostrarAdvertenciaEnDialogo(
				// 	t('advertencias.ProductoNoEstaHabilitado', {
				// 		descripcion: datosTipoPedidoActual?.descripcion,
				// 	}),
				// 	'producto-no-esta-habilitado'
				// );
				mostrarAviso(
					'error',
					t('advertencias.ProductoNoEstaHabilitado', {
						descripcion: datosTipoPedidoActual?.descripcion,
					})
				);
				return;
			}

			const productoActualEncontrado: TProductoPedido | undefined =
				pedidoActual.productos.find(
					(productoPedido: TProductoPedido) =>
						productoPedido.codigoProducto === codigoProducto
				);

			let unidadesParseado: string = '';

			let subUnidadesParseado: string = '';

			let catalogoMotivo: string = '';

			if (productoActualEncontrado) {
				unidadesParseado =
					productoActualEncontrado.unidades !== 0
						? productoActualEncontrado.unidades.toString()
						: '';
				subUnidadesParseado =
					productoActualEncontrado.subUnidades !== 0
						? productoActualEncontrado.subUnidades.toString()
						: '';
				catalogoMotivo = productoActualEncontrado.catalogoMotivo.toString();
			}
			setValue('unidades', unidadesParseado);
			setValue('subUnidades', subUnidadesParseado);
			setValue('productoABuscar', productoABuscar);
			setValue('catalogoMotivo', catalogoMotivo);

			setProductoActual(productoEncontrado);

			setInputFocus('unidades');
		},
		[pedidoActual, preciosProductos]
	);
	return seleccionarProductoDePrecios;
};
