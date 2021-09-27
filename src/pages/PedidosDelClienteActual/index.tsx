import useEstilos from './useEstilos';
import {useTranslation} from 'react-i18next';
import {Estructura, TarjetaColapsable} from 'components/UI';
import {ListadoPedidosRealizados} from './components';
import {useState} from 'react';

const PedidosDelClienteActual: React.FC = () => {
	const {t} = useTranslation();
	const estilos = useEstilos();
	const [expandido, setExpandido] = useState<string | boolean>('');

	return (
		<Estructura
			titulo={t('titulos.PedidosDelClienteActual')}
			esConFechaHaciaAtras={true}
		>
			<Estructura.Cuerpo>
				<TarjetaColapsable
					setExpandido={setExpandido}
					expandido={expandido}
					id={'Canje'}
					titulo={'Canje'}
					subTitulo={'subtitulo'}
				>
					{
						'holaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
					}
				</TarjetaColapsable>
				<TarjetaColapsable
					setExpandido={setExpandido}
					expandido={expandido}
					titulo={'Envases'}
					subTitulo={'subtitulo'}
					id={'Envases'}
				>
					{'holaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'}
				</TarjetaColapsable>
			</Estructura.Cuerpo>
		</Estructura>
	);
};

export default PedidosDelClienteActual;
