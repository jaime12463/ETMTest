import useEstilos from './useEstilos';
import {useTranslation} from 'react-i18next';
import {Estructura} from 'components/UI';

const PreciosProductosDelClienteActual: React.FC = () => {
	const {t} = useTranslation();
	const estilos = useEstilos();
	return (
		<Estructura
			titulo={t('titulos.PreciosProductosDelClienteActual')}
			esConFechaHaciaAtras={true}
		>
			<Estructura.Cuerpo>Cuerpo</Estructura.Cuerpo>
			<Estructura.PieDePagina>PieDePagina</Estructura.PieDePagina>
		</Estructura>
	);
};

export default PreciosProductosDelClienteActual;
