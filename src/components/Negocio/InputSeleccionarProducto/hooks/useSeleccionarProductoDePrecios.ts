import {Dispatch, SetStateAction, useCallback} from 'react';
import {
	TProductoPedido,
	TPedidoActual,
	TPrecioProducto,
	InputsKeysFormTomaDePedido,
	TFunctionMostarAvertenciaPorDialogo,
	TInputFiltrarPreciosProductos,
	TFormTomaDePedido,
} from 'models';
import {useObtenerPedidoActual} from 'redux/hooks';
import {UseFormSetValue} from 'react-hook-form';
import {useTranslation} from 'react-i18next';

export const useSeleccionarProductoDePrecios = (
	setProductoActual: Dispatch<SetStateAction<TPrecioProducto | null>>,
	setValue: UseFormSetValue<TFormTomaDePedido>,
	preciosProductos: TPrecioProducto[],
	setInputFocus: Dispatch<SetStateAction<InputsKeysFormTomaDePedido>>,
	mostrarAdvertenciaEnDialogo: TFunctionMostarAvertenciaPorDialogo
) => {
	const pedidoActual: TPedidoActual = useObtenerPedidoActual();
	const {t} = useTranslation();
	const seleccionarProductoDePrecios = useCallback(
		({productoABuscar}: TInputFiltrarPreciosProductos) => {
			const productoEncontrado:
				| TPrecioProducto
				| undefined = preciosProductos.find(
				(precioProducto: TPrecioProducto) =>
					precioProducto.codigoProducto === parseInt(productoABuscar)
			);

			if (!productoEncontrado) {
				mostrarAdvertenciaEnDialogo(
					t('advertencias.ProductoNoEstaEnPortafolioCliente'),
					'producto-no-esta-en-portafolio'
				);
				return;
			}

			const {codigoProducto} = productoEncontrado;

			//TODO: Donde debe ser la validacion y la advertencia si no hay precios vigentes

			const productoActualEncontrado:
				| TProductoPedido
				| undefined = pedidoActual.productosPedido.find(
				(productoPedido: TProductoPedido) =>
					productoPedido.codigoProducto === codigoProducto
			);

			let unidadesParseado: string = '';

			let subUnidadesParseado: string = '';

			if (productoActualEncontrado) {
				unidadesParseado =
					productoActualEncontrado.unidades !== 0
						? productoActualEncontrado.unidades.toString()
						: '';
				subUnidadesParseado =
					productoActualEncontrado.subUnidades !== 0
						? productoActualEncontrado.subUnidades.toString()
						: '';
			}
			setValue('unidades', unidadesParseado);
			setValue('subUnidades', subUnidadesParseado);

			setProductoActual(productoEncontrado);

			setInputFocus('unidades');
		},
		[pedidoActual, preciosProductos]
	);
	return seleccionarProductoDePrecios;
};
