import {Box} from '@mui/material';
import {InfoClienteDelPedidoActual} from 'components/Negocio';
import {BotonBarraInferior, Estructura, Stepper} from 'components/UI';
import {useHistory} from 'react-router-dom';
import nombresRutas from 'routes/nombresRutas';

export const Planeacion: React.FC = () => {
	const history = useHistory();
	return (
		<Estructura>
			<Estructura.Encabezado esConFechaHaciaAtras={true}>
				<InfoClienteDelPedidoActual />
			</Estructura.Encabezado>
			<Estructura.Cuerpo>
				<Box my={3}>
					<Stepper pasoActivo={0} />
				</Box>
				PLANEACION
			</Estructura.Cuerpo>
			<Estructura.PieDePagina>
				<BotonBarraInferior
					descripcion='Continuar a Toma de pedido'
					numeroItems={130}
					total='1000.00$'
					onClick={() => history.push(`${nombresRutas.ingresarPedido}`)}
				/>
			</Estructura.PieDePagina>
		</Estructura>
	);
};
