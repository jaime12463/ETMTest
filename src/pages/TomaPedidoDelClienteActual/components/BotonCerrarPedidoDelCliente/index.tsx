import {Button} from '@material-ui/core';
import {Dialogo} from 'components/UI';
import {
	useMostrarAdvertenciaEnDialogo,
	useObtenerTotalPedidosVisitaActual,
} from 'hooks';
import {useTranslation} from 'react-i18next';
import {useAgregarPedidoActualAPedidosClientes} from './hooks';
import {
	useObtenerPedidosClienteMismaFechaEntrega,
	useObtenerProductosMandatoriosVisitaActual,
} from 'hooks';
import {TClienteActual} from 'models';
import {
	useObtenerCompromisoDeCobroActual,
	useObtenerConfiguracion,
	useObtenerVisitaActual,
} from 'redux/hooks';
import {validarHabilitarBotonCerrarPedido} from 'utils/validaciones/index';

type Props = {};

export function BotonCerrarPedidoDelCliente(props: Props) {
	const {t} = useTranslation();
	const visitaActual = useObtenerVisitaActual();
	const configuracion = useObtenerConfiguracion();
	const {
		mostrarAdvertenciaEnDialogo,
		mostarDialogo,
		parametrosDialogo,
	} = useMostrarAdvertenciaEnDialogo();
	const productosMandatoriosVisitaActual = useObtenerProductosMandatoriosVisitaActual();

	const compromisoDeCobroActual = useObtenerCompromisoDeCobroActual();
	const calcularTotalPedidosVisitaActual = useObtenerTotalPedidosVisitaActual();
	const totalPedidosVisitaActual = calcularTotalPedidosVisitaActual();

	const desabilitarCerrarPedido =
		totalPedidosVisitaActual.totalPrecio <= 0
			? compromisoDeCobroActual.monto <= 0
				? true
				: false
			: false;

	const habilitarBotonCerrarPedido = validarHabilitarBotonCerrarPedido(
		totalPedidosVisitaActual.totalPrecio,
		compromisoDeCobroActual.monto,
		productosMandatoriosVisitaActual
	);

	const agregarPedidoActualAPedidosClientes = useAgregarPedidoActualAPedidosClientes(
		mostrarAdvertenciaEnDialogo
	);

	return (
		<>
			{mostarDialogo && <Dialogo {...parametrosDialogo} />}
			<Button
				variant='contained'
				color='primary'
				data-cy='boton-cerrarPedido'
				onClick={agregarPedidoActualAPedidosClientes}
				fullWidth
				disabled={!habilitarBotonCerrarPedido}
			>
				{t('general.cerrarPedido').toUpperCase()}
			</Button>
		</>
	);
}
