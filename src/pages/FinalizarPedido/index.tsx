import {Box} from '@mui/material';
import {InfoClienteDelPedidoActual} from 'components/Negocio';
import {BotonBarraInferior, Estructura, Stepper} from 'components/UI';
import {useHistory} from 'react-router-dom';
import nombresRutas from 'routes/nombresRutas';
import {BotonCerrarPedidoDelCliente} from './components';

export const FinalizarPedido: React.FC = () => {
	const history = useHistory();
	return (
		<Estructura>
			<Estructura.Encabezado esConFechaHaciaAtras={true}>
				<InfoClienteDelPedidoActual />
			</Estructura.Encabezado>
			<Estructura.Cuerpo>
				<Box my={3}>
					<Stepper pasoActivo={3} />
				</Box>
			</Estructura.Cuerpo>
			<Estructura.PieDePagina>
				<BotonBarraInferior
					descripcion='Finalizar Pedido'
					numeroItems={130}
					total='1000.00$'
					onClick={() => console.log('')}
				/>
			</Estructura.PieDePagina>
		</Estructura>
	);
};
