import {
	TCliente,
	TInputsFormularioAgregarProducto,
	TProducto,
	TFunctionMostarAvertenciaPorDialogo,
	TClienteActual,
	TDatosClientesProductos,
} from 'models';
import {useCallback} from 'react';
import {
	validarSubUnidadesConPresentacion,
	validarSubUnidadesEsMultiplo,
	validarUnidadesMinimasProducto,
} from 'utils/validaciones';
import {
	useObtenerClienteActual,
	useObtenerDatos,
	useObtenerDatosCliente,
} from 'hooks';
import {useTranslation} from 'react-i18next';
import {useValidarProductoPermiteSubUnidades} from '.';

export const useValidarAgregarProductoAlPedidoCliente = (
	mostrarAdvertenciaEnDialogo: TFunctionMostarAvertenciaPorDialogo,
	manejadorConfirmarAgregarPedido: (oprimioBotonAceptar: boolean) => void,
	agregarProductoAlPedidoCliente: (
		inputs: TInputsFormularioAgregarProducto
	) => void
) => {
	const {t} = useTranslation();
	const validarProductoPermiteSubUnidades = useValidarProductoPermiteSubUnidades();
	const clienteActual: TClienteActual = useObtenerClienteActual();
	const datos: TDatosClientesProductos = useObtenerDatos();
	const {datosCliente} = useObtenerDatosCliente(clienteActual.codigoCliente);

	const validarAgregarProductoAlPedidoCliente = useCallback(
		({
			unidades,
			subUnidades,
			codigoProductoConNombre,
			productoABuscar,
		}: TInputsFormularioAgregarProducto) => {
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

			if (!esPermitidoSubUnidades && subUnidadesParseado !== 0) {
				mostrarAdvertenciaEnDialogo(
					t('advertencias.subUnidadesNoPermitidas'),
					'sub-unidades-no-permitidas'
				);
				return;
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
				return;
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
				return;
			}

			if (!datosCliente) {
				mostrarAdvertenciaEnDialogo(
					t('No se encontro datos del cliente'),
					'no-datos-cliente'
				);
				return;
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
					manejadorConfirmarAgregarPedido,
					{
						aceptar: t('general.si'),
						cancelar: t('general.no'),
					}
				);
				return;
			}

			agregarProductoAlPedidoCliente({
				unidades,
				subUnidades,
				codigoProductoConNombre,
				productoABuscar,
			});
		},
		[
			clienteActual,
			datos,
			datosCliente,
			mostrarAdvertenciaEnDialogo,
			agregarProductoAlPedidoCliente,
			manejadorConfirmarAgregarPedido,
			mostrarAdvertenciaEnDialogo,
			t,
		]
	);
	return validarAgregarProductoAlPedidoCliente;
};
