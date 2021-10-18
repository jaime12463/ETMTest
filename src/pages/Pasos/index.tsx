import {FunctionComponent, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {IndicadoresDelPedidoActual} from './components';
import {controlador, TControlador} from './controlador';
import {Estructura, BotonBarraInferior, Stepper} from 'components/UI';
import {Box} from '@mui/material';
import {InfoClienteDelPedidoActual} from 'components/Negocio';
import {
	useObtenerPedidosValorizados,
	useObtenerTotalPedidosVisitaActual,
} from 'hooks';

import {
	useObtenerClienteActual,
	useObtenerCompromisoDeCobroActual,
} from 'redux/hooks';
import {TClienteActual} from 'models';
import {useTranslation} from 'react-i18next';

const formatearItems = (items: number) => {
	const cerosCharacters = 3;

	let ceros = cerosCharacters - items.toString().length;
	return '0'.repeat(ceros) + items.toString();
};

const Pasos: React.FC = () => {
	const {t} = useTranslation();
	const [pasoActual, setPasoActual] = useState(0);
	const history = useHistory();
	const {razonSocial}: TClienteActual = useObtenerClienteActual();

	const ObtenerPedidosValorizados = useObtenerPedidosValorizados();
	const itemsValorizados = ObtenerPedidosValorizados();
	const compromisoDeCobroActual = useObtenerCompromisoDeCobroActual();
	const obtenerTotalPedidosVisitaActual = useObtenerTotalPedidosVisitaActual();

	const totalVisitaActual =
		obtenerTotalPedidosVisitaActual().totalPrecio +
		compromisoDeCobroActual.monto;

	const manejadorPasoAtras = () => {
		if (pasoActual == 0) {
			history.goBack();
		} else {
			setPasoActual(pasoActual - 1);
		}
	};
	const manejadorPasoAdelante = () => {
		if (pasoActual < controlador.length - 1) setPasoActual(pasoActual + 1);
	};

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
						pasos={controlador.map(
							(paso: TControlador, index) => `${index + 1}. ${t(paso.titulo)}`
						)}
						pasoActivo={pasoActual}
					/>
				</Box>

				<Contenedor pasoActivo={pasoActual} />
			</Estructura.Cuerpo>
			<Estructura.PieDePagina>
				<BotonBarraInferior
					descripcion='Continuar a Toma de pedido'
					numeroItems={formatearItems(itemsValorizados.length)}
					total={totalVisitaActual}
					onClick={() => manejadorPasoAdelante()}
				/>
			</Estructura.PieDePagina>
		</Estructura>
	);
};

type Props = {
	pasoActivo: number;
};

const Contenedor: FunctionComponent<Props> = ({pasoActivo}) => {
	return controlador[pasoActivo].componente;
};

export default Pasos;
