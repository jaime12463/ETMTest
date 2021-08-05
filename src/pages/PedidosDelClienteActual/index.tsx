import useEstilos from './useEstilos';
import {useTranslation} from 'react-i18next';
import {Estructura} from 'components/UI';
import {ListadoPedidosRealizados} from './components';

const PedidosDelClienteActual: React.FC = () => {
	const {t} = useTranslation();
	const estilos = useEstilos();
	return (
		<Estructura
			titulo={t('titulos.PedidosDelClienteActual')}
			esConFechaHaciaAtras={true}
		>
			<Estructura.Cuerpo>
				<ListadoPedidosRealizados />
			</Estructura.Cuerpo>
		</Estructura>
	);
};

export default PedidosDelClienteActual;
