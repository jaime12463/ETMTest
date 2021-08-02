import React from 'react';
import {useTranslation} from 'react-i18next';
import {Estructura} from 'components/UI';
import {ListadoEnvasesRetornables} from './components';

const EnvasesRetornables: React.FC = () => {
	const {t} = useTranslation();

	return (
		<Estructura titulo={t('titulos.envases')} esConFechaHaciaAtras={true}>
			<Estructura.Cuerpo>
				<ListadoEnvasesRetornables />
			</Estructura.Cuerpo>
		</Estructura>
	);
};

export default EnvasesRetornables;
