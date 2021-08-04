import {Button} from '@material-ui/core';
import { Dialogo } from 'components/UI';
import { useMostrarAdvertenciaEnDialogo } from 'hooks';
import {useTranslation} from 'react-i18next';
import { useAgregarPedidoActualAPedidosClientes } from './hooks';

type Props = {
};

export function BotonCerrarPedidoDelCliente(props: Props) {
	const {
		mostrarAdvertenciaEnDialogo,
		mostarDialogo,
		parametrosDialogo,
	} = useMostrarAdvertenciaEnDialogo();

	const agregarPedidoActualAPedidosClientes = useAgregarPedidoActualAPedidosClientes(
		mostrarAdvertenciaEnDialogo
	);

	const { t } = useTranslation();
	
	return (
		<>
			{mostarDialogo && <Dialogo {...parametrosDialogo} />}
		<Button
			variant='contained'
			color='primary'
			data-cy='boton-cerrarPedido'
			onClick={agregarPedidoActualAPedidosClientes}
			fullWidth
		>
			{t('general.cerrarPedido').toUpperCase()}
			</Button>
		</>
	);
}