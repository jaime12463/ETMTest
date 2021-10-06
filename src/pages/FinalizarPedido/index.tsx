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
import {useAgregarPedidoActualAPedidosClientes} from '../TomaPedidoDelClienteActual/components/BotonCerrarPedidoDelCliente/hooks';
import {useObtenerProductosMandatoriosVisitaActual} from 'hooks';

import {useObtenerCompromisoDeCobroActual} from 'redux/hooks';
import {validarHabilitarBotonCerrarPedido} from 'utils/validaciones/index';
import {useObtenerClienteActual} from '../../redux/hooks'
import { TClienteActual } from 'models';

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
	const {razonSocial}: TClienteActual = useObtenerClienteActual()
	return (
		<>
			<Estructura>
				<Estructura.Encabezado esConFechaHaciaAtras={true} titulo={razonSocial}>
					<InfoClienteDelPedidoActual />
				</Estructura.Encabezado>
				<Estructura.Cuerpo>
					<Box my={3}>
						<Stepper pasoActivo={3} />
					</Box>
				</Estructura.Cuerpo>
				<Estructura.PieDePagina>
					{mostarDialogo && <Dialogo {...parametrosDialogo} />}
					<BotonBarraInferior
						descripcion='Finalizar Pedido'
						numeroItems={130}
						total='1000.00$'
						onClick={() => agregarPedidoActualAPedidosClientes()}
					/>
				</Estructura.PieDePagina>
			</Estructura>
		</>
	);
};
