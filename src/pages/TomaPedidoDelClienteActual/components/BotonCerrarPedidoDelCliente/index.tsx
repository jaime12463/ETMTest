import {Button} from '@material-ui/core';
import {Dialogo} from 'components/UI';
import {useMostrarAdvertenciaEnDialogo} from 'hooks';
import {useTranslation} from 'react-i18next';
import {useAgregarPedidoActualAPedidosClientes} from './hooks';
import {useCalcularTotalPedido} from 'hooks';
import {TTotalPedido} from 'models';
import {useObtenerCompromisoDeCobroActual} from 'redux/hooks';

type Props = {};

export function BotonCerrarPedidoDelCliente(props: Props) {
	const {t} = useTranslation();
	const totalPedidoActual: TTotalPedido = useCalcularTotalPedido();
	const {
		mostrarAdvertenciaEnDialogo,
		mostarDialogo,
		parametrosDialogo,
	} = useMostrarAdvertenciaEnDialogo();
	const compromisoDeCobroActual = useObtenerCompromisoDeCobroActual();
	const desabilitarCerrarPedido =
		totalPedidoActual.totalPrecio <= 0
			? compromisoDeCobroActual.monto <= 0
				? true
				: false
			: false;

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
				disabled={desabilitarCerrarPedido}
			>
				{t('general.cerrarPedido').toUpperCase()}
			</Button>
		</>
	);
}
