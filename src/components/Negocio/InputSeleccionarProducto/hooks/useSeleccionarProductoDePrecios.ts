import {Dispatch, SetStateAction, useCallback} from 'react';
import {
	TPrecioSinVigencia,
	TProductoPedido,
	TPedidoActual,
	TInputsFormularioAgregarProducto,
	TPrecioProducto,
	TPrecio,
	InputsKeys,
	TFunctionMostarAvertenciaPorDialogo,
} from 'models';
import {useObtenerPedidoActual} from 'redux/hooks';
import {UseFormSetValue} from 'react-hook-form';
import {useObtenerPrecioVigenteDelProducto} from 'hooks';
import {useTranslation} from 'react-i18next';

export const useSeleccionarProductoDePrecios = (
	setProductoActual: Dispatch<SetStateAction<TPrecioSinVigencia>>,
	setValue: UseFormSetValue<TInputsFormularioAgregarProducto>,
	preciosProductos: TPrecioProducto[],
	setInputFocus: Dispatch<SetStateAction<InputsKeys>>,
	mostrarAdvertenciaEnDialogo: TFunctionMostarAvertenciaPorDialogo
) => {
	const pedidoActual: TPedidoActual = useObtenerPedidoActual();
	const obtenerPrecioVigenteDelProducto = useObtenerPrecioVigenteDelProducto();
	const {t} = useTranslation();
	const seleccionarProductoDePrecios = useCallback(
		({productoABuscar}: TInputsFormularioAgregarProducto) => {
			const preciosProducto:
				| TPrecioProducto
				| undefined = preciosProductos.find(
				(precioProducto: TPrecioProducto) =>
					precioProducto.codigoProducto === parseInt(productoABuscar)
			);

			if (!preciosProducto) {
				mostrarAdvertenciaEnDialogo(
					t('advertencias.noExisteCodigoProducto'),
					'no-existe-codigo-producto'
				);
				return;
			}

			//ENGHOY
			const {
				precios,
				codigoProducto,
				nombre,
				codigoImplicito1,
				nombreImplicito1,
				codigoImplicito2,
				nombreImplicito2,
			} = preciosProducto;

			const precioVigente:
				| TPrecio
				| undefined = obtenerPrecioVigenteDelProducto(
				precios,
				pedidoActual.fechaEntrega
			);

			if (!precioVigente) {
				mostrarAdvertenciaEnDialogo(
					t('advertencias.noPreciosVigentes'),
					'no-precios-vigentes'
				);
				return;
			}

			const {
				precioConImpuestoUnidad,
				precioConImpuestoSubunidad,
			} = precioVigente;

			const productoActualEncontrado:
				| TProductoPedido
				| undefined = pedidoActual.productosPedido.find(
				(productoPedido: TProductoPedido) =>
					productoPedido.codigoProducto === codigoProducto
			);

			const codigoProductoConNombre = codigoProducto + ' ' + nombre;

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
			setValue('codigoProductoConNombre', codigoProductoConNombre);

			setProductoActual({
				codigoProductoConNombre,
				precioConImpuestoUnidad,
				precioConImpuestoSubunidad,
				codigoImplicito1,
				nombreImplicito1,
				codigoImplicito2,
				nombreImplicito2,
			});

			setInputFocus('unidades');
		},
		[pedidoActual, preciosProductos]
	);
	return seleccionarProductoDePrecios;
};
