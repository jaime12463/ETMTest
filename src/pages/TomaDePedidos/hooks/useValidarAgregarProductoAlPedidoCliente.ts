import {
	TCliente,
	TInputsFormularioAgregarProducto,
	TProductoPedidoConPrecios,
} from 'models';
import {Dispatch, SetStateAction, useCallback} from 'react';
import {UseFormGetValues, UseFormSetValue} from 'react-hook-form';
import {validarUnidadesMinimasProducto} from 'utils/validaciones';
import {
	useAgregarProductoAlPedidoCliente,
	useManejadorConfirmarAgregarPedido,
	useObtenerClienteActual,
} from '.';
import {Props as PropsDialogo} from 'components/Dialogo';
import {useTranslation} from 'react-i18next';

export const useValidarAgregarProductoAlPedidoCliente = (
	setMostarDialogo: Dispatch<SetStateAction<boolean>>,
	setParametrosDialogo: Dispatch<SetStateAction<PropsDialogo>>,
	productoActual: TProductoPedidoConPrecios,
	setProductoActual: Dispatch<SetStateAction<TProductoPedidoConPrecios>>,
	setValue: UseFormSetValue<TInputsFormularioAgregarProducto>,
	getValues: UseFormGetValues<TInputsFormularioAgregarProducto>
) => {
	const agregarProductoAlPedidoCliente = useAgregarProductoAlPedidoCliente(
		productoActual,
		setProductoActual,
		setValue
	);
	const manejadorConfirmarAgregarPedido = useManejadorConfirmarAgregarPedido(
		setMostarDialogo,
		productoActual,
		setProductoActual,
		setValue,
		getValues
	);
	const {t} = useTranslation();
	const obtenerClienteActual = useObtenerClienteActual();
	const validarAgregarProductoAlPedidoCliente = useCallback(
		({
			codigoCliente,
			unidades,
			subUnidades,
			codigoProductoConNombre,
			productoABuscar,
		}: TInputsFormularioAgregarProducto) => {
			const clienteEncontrado: TCliente | undefined = obtenerClienteActual(
				codigoCliente
			);
			const unidadesParseado: number = unidades !== '' ? parseInt(unidades) : 0;
			if (
				validarUnidadesMinimasProducto(
					unidadesParseado,
					clienteEncontrado.configuracionPedido
				)
			)
				agregarProductoAlPedidoCliente({
					codigoCliente,
					unidades,
					subUnidades,
					codigoProductoConNombre,
					productoABuscar,
				});
			else {
				setParametrosDialogo({
					mensaje: t('advertencias.cantidadEsMayor', {
						cantidad:
							clienteEncontrado.configuracionPedido.cantidadMaximaUnidades,
					}),
					manejadorClick: manejadorConfirmarAgregarPedido,
					conBotonCancelar: true,
					textosBotonesDefault: {
						aceptar: t('general.si'),
						cancelar: t('general.no')
					  }
				});
				setMostarDialogo(true);
			}
		},
		[
			obtenerClienteActual,
			agregarProductoAlPedidoCliente,
			manejadorConfirmarAgregarPedido,
			t,
		]
	);
	return validarAgregarProductoAlPedidoCliente;
};
