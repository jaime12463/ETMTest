import useEstilos from './useEstilos';
import {useTranslation} from 'react-i18next';
import {Estructura, TarjetaColapsable, TarjetaDoble} from 'components/UI';
import {ListadoPedidosRealizados} from './components';
import {useState} from 'react';
import {Box, Card, Grid} from '@mui/material';
import {textAlign} from '@mui/system';

const PedidosDelClienteActual: React.FC = () => {
	const {t} = useTranslation();
	const estilos = useEstilos();
	//const [expandido, setExpandido] = useState<string | boolean>('');

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
