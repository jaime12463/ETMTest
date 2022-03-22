import {
	useMostrarAviso,
	useObtenerDatosCliente,
	useReiniciarClienteActual,
	useResetVisitaActual,
} from 'hooks';
import {useReiniciarCompromisoDeCobro} from 'hooks/useReiniciarCompromisoDeCobro';
import {TCliente, TClienteActual} from 'models';
import {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {useHistory} from 'react-router-dom';
import {activarClienteBloqueado} from 'redux/features/visitaActual/visitaActualSlice';
import {
	useAppDispatch,
	useObtenerClienteActual,
	useObtenerConfiguracion,
} from 'redux/hooks';
import {AvisoIcon} from 'assests/iconos';

export const useValidarClienteBloqueado = () => {
	const {codigoCliente}: TClienteActual = useObtenerClienteActual();
	const {obtenerDatosCliente} = useObtenerDatosCliente();
	const datosCliente: TCliente | undefined = obtenerDatosCliente(codigoCliente);
	const clienteActual: TClienteActual = useObtenerClienteActual();
	const configuracion = useObtenerConfiguracion();
	const mostrarAviso = useMostrarAviso();
	const {t} = useTranslation();
	const dispatch = useAppDispatch();
	const reiniciarVisita = useResetVisitaActual();
	const reiniciarCompromisoDeCobro = useReiniciarCompromisoDeCobro();
	const reiniciarClienteActual = useReiniciarClienteActual();
	const history = useHistory();

	const validacionClienteBloqueado = useCallback(
		(setConfigAlerta, setAlertaPasos): void => {
			const esCreditoBloqueado =
				datosCliente?.informacionCrediticia.esCreditoBloqueado;
			const esVentaBloqueado =
				datosCliente?.informacionCrediticia.esBloqueadoVenta;
			const esCondicionCreditoInformal =
				clienteActual.condicion === 'creditoInformal';
			const esCondicionCreditoFormal =
				clienteActual.condicion === 'creditoFormal';
			const {habilitaCompromisoDeCobro} = configuracion;

			if (
				(esCondicionCreditoFormal &&
					esCreditoBloqueado &&
					!habilitaCompromisoDeCobro) ||
				(esVentaBloqueado && !habilitaCompromisoDeCobro)
			) {
				console.log('CA4 y CA5');
				setConfigAlerta({
					titulo: t('toast.clienteBloqueadoTitulo'),
					mensaje: t('toast.clienteBloqueadoMensaje'),
					tituloBotonAceptar: t('general.finalizarVisita'),
					callbackAceptar: () => {
						reiniciarVisita();
						reiniciarCompromisoDeCobro();
						reiniciarClienteActual();
						history.push('/clientes');
					},
					iconoMensaje: <AvisoIcon />,
				});
				setAlertaPasos(true);
				dispatch(activarClienteBloqueado());
				return;
			}
			
			if (
				(esCondicionCreditoFormal &&
					esCreditoBloqueado &&
					habilitaCompromisoDeCobro) ||
				(esVentaBloqueado && habilitaCompromisoDeCobro)
			) {
				console.log('CA2 y CA3');
				mostrarAviso(
					'error',
					t('toast.ventaBloqueadaTitulo'),
					t('toast.ventaBloqueadaMensaje'),
					undefined,
					'cliente-bloqueado'
				);
				dispatch(activarClienteBloqueado());
				return;
			}

			if (esCondicionCreditoInformal && esCreditoBloqueado) {
				console.log('CA1');
				mostrarAviso(
					'warning',
					t('toast.clienteCreditoBloqueadoTitulo'),
					t('toast.clienteCreditoBloqueadoMensaje'),
					undefined,
					'cliente-bloqueado'
				);
				return;
			}
		},
		[]
	);

	return validacionClienteBloqueado;
};
