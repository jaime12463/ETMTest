import {useCallback} from 'react';
import {useAppDispatch} from 'redux/hooks';
import {
	ETiposDePago,
	TFunctionMostarAvertenciaPorDialogo,
	TInputsCodigoCliente,
} from 'models';
import {useObtenerConfiguracion} from 'redux/hooks';
import {useHistory} from 'react-router-dom';
import nombresRutas from 'routes/nombresRutas';
import {inicializarClienteActual} from 'redux/features/clienteActual/clienteActualSlice';
import {
	useObtenerTipoPagoActual,
	useValidarInicializarClienteActual,
	useInicializarVisitaActual,
	useValidarInicializarPedidoActual,
} from '.';

export const useInicializarClienteActual = (
	mostrarAdvertenciaEnDialogo: TFunctionMostarAvertenciaPorDialogo
) => {
	const dispatch = useAppDispatch();

	const configuracion = useObtenerConfiguracion();

	const validarInicializarClienteActual = useValidarInicializarClienteActual(
		mostrarAdvertenciaEnDialogo
	);

	const inicializarVisitaActual = useInicializarVisitaActual();

	const validarInicializarPedidoActual = useValidarInicializarPedidoActual(
		mostrarAdvertenciaEnDialogo
	);

	const {condicionDePagoDefault}= configuracion;

	const history = useHistory();

	const {obtenerTipoPagoActual} = useObtenerTipoPagoActual();

	//TODO: Esta logica puede ser mas limpia.
	const asignarClienteActual = useCallback(
		({codigoCliente}: TInputsCodigoCliente) => {
			const {esValidoInicializarClienteActual, datosCliente} =
				validarInicializarClienteActual(codigoCliente);

			if (!esValidoInicializarClienteActual) return;

			if (!datosCliente) return;

			const {
				esValidoInicializarPedidoActual,
				fechaEntrega,
				fechaVisitaPlanificada,
			} = validarInicializarPedidoActual(datosCliente);

			if (!esValidoInicializarPedidoActual) return;

			const tipoPagoActual: ETiposDePago = obtenerTipoPagoActual(codigoCliente);
			const esCreditoInformal= datosCliente.informacionCrediticia.condicion==='creditoInformal'
			const tipoPagoParseado= condicionDePagoDefault==='credito'? ETiposDePago.Credito : ETiposDePago.Contado;

			dispatch(
				inicializarClienteActual({
					codigoCliente,
					razonSocial: datosCliente.detalles.nombreComercial,
					condicion: datosCliente.informacionCrediticia.condicion,
					tipoPagoActual: esCreditoInformal? tipoPagoParseado : tipoPagoActual ,
				})
			);

			inicializarVisitaActual(
				fechaEntrega,
				codigoCliente,
				fechaVisitaPlanificada
			);

			history.push(`${nombresRutas.pasos}`);
		},
		[
			mostrarAdvertenciaEnDialogo,
			dispatch,
			configuracion,
			inicializarVisitaActual,
		]
	);

	return asignarClienteActual;
};
