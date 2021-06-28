import {
	TCliente,
	TInputsFormularioAgregarProducto,
	TProducto,
	TPrecioSinVigencia,
} from 'models';
import {Dispatch, SetStateAction, useCallback} from 'react';
import {UseFormGetValues, UseFormSetValue} from 'react-hook-form';
import {
	validarSubUnidadesConPresentacion,
	validarSubUnidadesEsMultiplo,
	validarUnidadesMinimasProducto,
} from 'utils/validaciones';
import {
	useAgregarProductoAlPedidoCliente,
	useManejadorConfirmarAgregarPedido,
	useObtenerClienteActual,
} from '.';
import {Props as PropsDialogo} from 'components/Dialogo';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from 'redux/hooks';
import {selectDatos} from 'redux/features/datos/datosSlice';
import {usePermiteSubUnidades} from '.';

export const useValidarAgregarProductoAlPedidoCliente = (
	setMostarDialogo: Dispatch<SetStateAction<boolean>>,
	setParametrosDialogo: Dispatch<SetStateAction<PropsDialogo>>,
	productoActual: TPrecioSinVigencia,
	setProductoActual: Dispatch<SetStateAction<TPrecioSinVigencia>>,
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
	const {datos} = useAppSelector(selectDatos);
	const permiteSubUnidades = usePermiteSubUnidades();
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
			const subUnidadesParseado: number =
				subUnidades !== '' ? parseInt(subUnidades) : 0;
			const codigoProducto: number = parseInt(
				codigoProductoConNombre.split(' ')[0]
			);
			const {presentacion, subunidadesVentaMinima}: TProducto = datos.productos[
				codigoProducto
			];
			const esPermitidoSubUnidades = permiteSubUnidades(
				codigoCliente,
				codigoProducto
			);

			const esSubUnidadesMenorAPresentacion = validarSubUnidadesConPresentacion(
				presentacion,
				subUnidadesParseado
			);

			if (!esPermitidoSubUnidades && subUnidadesParseado !== 0) {
				setParametrosDialogo({
					mensaje: t('advertencias.subUnidadesNoPermitidas'),
					manejadorClick: () => setMostarDialogo(false),
					conBotonCancelar: false,
					dataCy: 'sub-unidades-no-permitidas',
				});
				setMostarDialogo(true);
				return;
			}

			if (!esSubUnidadesMenorAPresentacion) {
				setParametrosDialogo({
					mensaje: t('advertencias.limiteSubUnidades'),
					manejadorClick: () => setMostarDialogo(false),
					conBotonCancelar: false,
					dataCy: 'limite-sub-unidades',
				});
				setMostarDialogo(true);
				return;
			}

			//TODO: subunidadesVentaMinima es opcional?
			const esSubUnidadEsMultiplo = validarSubUnidadesEsMultiplo(
				subunidadesVentaMinima,
				subUnidadesParseado
			);

			if (!esSubUnidadEsMultiplo) {
				setParametrosDialogo({
					mensaje: t('advertencias.subUnidadesNoMultiplo', {
						subunidadesVentaMinima,
					}),
					manejadorClick: () => setMostarDialogo(false),
					conBotonCancelar: false,
					dataCy: 'sub-unidades-no-permitida',
				});
				setMostarDialogo(true);
				return;
			}

			const esUnidadesMenorAlMaximoUnidades = validarUnidadesMinimasProducto(
				unidadesParseado,
				clienteEncontrado.configuracionPedido
			);

			if (!esUnidadesMenorAlMaximoUnidades) {
				setParametrosDialogo({
					mensaje: t('advertencias.cantidadEsMayor', {
						cantidad:
							clienteEncontrado.configuracionPedido.cantidadMaximaUnidades,
					}),
					manejadorClick: manejadorConfirmarAgregarPedido,
					conBotonCancelar: true,
					textosBotonesDefault: {
						aceptar: t('general.si'),
						cancelar: t('general.no'),
					},
					dataCy: 'cantidad-es-mayor',
				});
				setMostarDialogo(true);
				return;
			}

			agregarProductoAlPedidoCliente({
				codigoCliente,
				unidades,
				subUnidades,
				codigoProductoConNombre,
				productoABuscar,
			});
		},
		[
			obtenerClienteActual,
			agregarProductoAlPedidoCliente,
			manejadorConfirmarAgregarPedido,
			permiteSubUnidades,
			t,
		]
	);
	return validarAgregarProductoAlPedidoCliente;
};
