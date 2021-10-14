import {FunctionComponent, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {
	IndicadoresDelPedidoActual,
} from './components';
import  { controlador, TControlador} from './controlador';
import {
	Dialogo,
	Estructura,
	BotonBarraInferior,
	Stepper,
} from 'components/UI';
import {Box} from '@mui/material';
import {
	
	InfoClienteDelPedidoActual,
} from 'components/Negocio';


import {useObtenerClienteActual} from 'redux/hooks';
import {InputsKeysFormTomaDePedido, TClienteActual, TFormTomaDePedido, TPrecioProducto, TProductoPedido, TTipoPedido} from 'models';


const Pasos: React.FC = () => {
	const [pasoActual, setPasoActual] = useState(0);
	const history = useHistory();
	const {razonSocial}: TClienteActual = useObtenerClienteActual();
	 
	const manejadorPasoAtras=() =>
	{
		if ( pasoActual==0)
		{
			history.goBack();
		}else{
			setPasoActual(pasoActual-1);
		}
	}
	const manejadorPasoAdelante= ()=>
	{
		if (pasoActual < controlador.length-1) 
			setPasoActual(pasoActual+1);
	}

	return (
		<Estructura>
			<Estructura.Encabezado
				esConFechaHaciaAtras={true}
				titulo={razonSocial}
				onClick={manejadorPasoAtras}
				// acciones={<BotonVerPedidosDelClienteActual />}
			>
				<InfoClienteDelPedidoActual />
			</Estructura.Encabezado>
			<Estructura.Cuerpo>
				<Box my={3}>
					<IndicadoresDelPedidoActual />
				</Box>
				<Box my={3}>
					<Stepper 
						pasos={controlador.map((paso:TControlador, index) => `${index+1}. ${paso.titulo}` )} 
						pasoActivo={pasoActual} 	
					/>
				</Box>

				<Contenedor pasoActivo={pasoActual} />

			</Estructura.Cuerpo>
			<Estructura.PieDePagina>
				<BotonBarraInferior
					descripcion='Continuar a Toma de pedido'
					numeroItems={130}
					total='1000.00$'
					onClick={() =>
						//history.push(`${path}${nombresRutas.envasesRetornables}`)
						manejadorPasoAdelante()
					}
				/>
			</Estructura.PieDePagina>
		</Estructura>
	);
};


type Props = {
	pasoActivo: number;
	
};

const Contenedor: FunctionComponent<Props> = ({pasoActivo}) =>{
	return(
		controlador[pasoActivo].componente
	)
}

export default Pasos;
