import useEstilos from './useEstilos';
import {useTranslation} from 'react-i18next';
import {Estructura} from 'components/UI';

const PedidosDelClienteActual: React.FC = () => {
	const {t} = useTranslation();
	const estilos = useEstilos();
	return (
		<Estructura
			titulo={t('titulos.PedidosDelClienteActual')}
			esConFechaHaciaAtras={true}
		>
			<Estructura.Cuerpo>Cuerpo</Estructura.Cuerpo>
			<Estructura.PieDePagina>PieDePagina</Estructura.PieDePagina>
		</Estructura>
	);
};

export default PedidosDelClienteActual;
