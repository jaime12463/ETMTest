import {Box} from '@mui/material';
import {InfoClienteDelPedidoActual} from 'components/Negocio';
import {BotonBarraInferior, Estructura, Stepper} from 'components/UI';
import {useHistory} from 'react-router-dom';
import {Button} from '@mui/material';
import {Dialogo} from 'components/UI';
import {
	useMostrarAdvertenciaEnDialogo,
	useObtenerTotalPedidosVisitaActual,
} from 'hooks';
import {useTranslation} from 'react-i18next';
import {useAgregarPedidoActualAPedidosClientes} from 'pages/Pasos/2_TomaDePedido/components/BotonCerrarPedidoDelCliente/hooks';
import {useObtenerProductosMandatoriosVisitaActual} from 'hooks';

import {useObtenerCompromisoDeCobroActual} from 'redux/hooks';
import {validarHabilitarBotonCerrarPedido} from 'utils/validaciones/index';
import {useObtenerClienteActual} from '../../../redux/hooks';
import {TClienteActual} from 'models';

export const FinalizarPedido: React.FC = () => {
	const {t} = useTranslation();

	const {mostrarAdvertenciaEnDialogo, mostarDialogo, parametrosDialogo} =
		useMostrarAdvertenciaEnDialogo();
	const productosMandatoriosVisitaActual =
		useObtenerProductosMandatoriosVisitaActual();

	const compromisoDeCobroActual = useObtenerCompromisoDeCobroActual();
	const calcularTotalPedidosVisitaActual = useObtenerTotalPedidosVisitaActual();
	const totalPedidosVisitaActual = calcularTotalPedidosVisitaActual();

	const habilitarBotonCerrarPedido = validarHabilitarBotonCerrarPedido(
		totalPedidosVisitaActual.totalPrecio,
		compromisoDeCobroActual.monto,
		productosMandatoriosVisitaActual
	);

	const agregarPedidoActualAPedidosClientes =
		useAgregarPedidoActualAPedidosClientes(mostrarAdvertenciaEnDialogo);

	const history = useHistory();
	const {razonSocial}: TClienteActual = useObtenerClienteActual();
	return (
		<>
			<>{mostarDialogo && <Dialogo {...parametrosDialogo} />}</>
		</>
	);
};
