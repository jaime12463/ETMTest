import {
	TCliente,
	TInputsFormularioAgregarProducto,
	TProducto,
	TFunctionMostarAvertenciaPorDialogo,
	TClienteActual,
	TDatosClientesProductos,
	InputsKeys,
} from 'models';
import {Dispatch, SetStateAction, useCallback} from 'react';
import {
	validarSubUnidadesConPresentacion,
	validarSubUnidadesEsMultiplo,
	validarUnidadesMinimasProducto,
} from 'utils/validaciones';
import {useObtenerDatosCliente} from 'hooks';
import {useObtenerClienteActual, useObtenerDatos} from 'redux/hooks';
import {useTranslation} from 'react-i18next';
import {useValidarProductoPermiteSubUnidades} from '.';

export const useValidarAgregarProductoAlPedidoCliente = (
	mostrarAdvertenciaEnDialogo: TFunctionMostarAvertenciaPorDialogo,
	inputFocus: InputsKeys,
	setInputFocus: Dispatch<SetStateAction<InputsKeys>>
) => {
	const {t} = useTranslation();

	const validarProductoPermiteSubUnidades = useValidarProductoPermiteSubUnidades();

	const clienteActual: TClienteActual = useObtenerClienteActual();

	const datos: TDatosClientesProductos = useObtenerDatos();

	const {datosCliente} = useObtenerDatosCliente(clienteActual.codigoCliente);

	const validarAgregarProductoAlPedidoCliente = useCallback(
		(inputs: TInputsFormularioAgregarProducto): boolean => {
			const {unidades, subUnidades, codigoProductoConNombre} = inputs;

			let esValidacionCorrecta: boolean = false;

			const unidadesParseado: number = unidades !== '' ? parseInt(unidades) : 0;

			const subUnidadesParseado: number =
				subUnidades !== '' ? parseInt(subUnidades) : 0;

			const codigoProducto: number = parseInt(
				codigoProductoConNombre.split(' ')[0]
			);

			const {presentacion, subunidadesVentaMinima}: TProducto = datos.productos[
				codigoProducto
			];

			const esPermitidoSubUnidades = validarProductoPermiteSubUnidades(
				codigoProducto
			);

			if (inputFocus === 'unidades' && esPermitidoSubUnidades) {
				setInputFocus('subUnidades');
				return esValidacionCorrecta;
			}

			if (!esPermitidoSubUnidades && subUnidadesParseado !== 0) {
				mostrarAdvertenciaEnDialogo(
					t('advertencias.subUnidadesNoPermitidas'),
					'sub-unidades-no-permitidas'
				);
				return esValidacionCorrecta;
			}

			const esSubUnidadesMenorAPresentacion = validarSubUnidadesConPresentacion(
				presentacion,
				subUnidadesParseado
			);

			if (!esSubUnidadesMenorAPresentacion) {
				mostrarAdvertenciaEnDialogo(
					t('advertencias.limiteSubUnidades'),
					'limite-sub-unidades'
				);
				return esValidacionCorrecta;
			}

			const esSubUnidadEsMultiplo = validarSubUnidadesEsMultiplo(
				subunidadesVentaMinima,
				subUnidadesParseado
			);

			if (!esSubUnidadEsMultiplo) {
				mostrarAdvertenciaEnDialogo(
					t('advertencias.subUnidadesNoMultiplo', {
						subunidadesVentaMinima,
					}),
					'sub-unidades-no-multiplo'
				);
				return esValidacionCorrecta;
			}

			if (!datosCliente) {
				mostrarAdvertenciaEnDialogo(
					t('No se encontro datos del cliente'),
					'no-datos-cliente'
				);
				return esValidacionCorrecta;
			}

			const {configuracionPedido}: TCliente = datosCliente;

			const esUnidadesMenorAlMaximoUnidades = validarUnidadesMinimasProducto(
				unidadesParseado,
				configuracionPedido
			);

			if (!esUnidadesMenorAlMaximoUnidades) {
				mostrarAdvertenciaEnDialogo(
					t('advertencias.cantidadEsMayor', {
						cantidad: configuracionPedido.cantidadMaximaUnidades,
					}),
					'cantidad-es-mayor',
					(oprimioBotonAceptar) => {
						return oprimioBotonAceptar;
					},
					{
						aceptar: t('general.si'),
						cancelar: t('general.no'),
					}
				);
				return esValidacionCorrecta;
			}

			esValidacionCorrecta = true;

			return esValidacionCorrecta;
		},
		[
			clienteActual,
			datos,
			datosCliente,
			mostrarAdvertenciaEnDialogo,
			t,
			inputFocus,
		]
	);
	return validarAgregarProductoAlPedidoCliente;
};
