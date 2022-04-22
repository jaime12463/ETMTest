import {useTranslation} from 'react-i18next';
import {Estructura} from 'components/UI';
import {ListadoPedidosRealizados} from './components';

export const PedidosDelClienteActual: React.VFC = () => {
	const {t} = useTranslation();

	return (
		<Estructura
			titulo={t('titulos.pedidosDelClienteActual')}
			esConFechaHaciaAtras
		>
			<Estructura.Cuerpo>
				<ListadoPedidosRealizados />
			</Estructura.Cuerpo>
		</Estructura>
	);
};
