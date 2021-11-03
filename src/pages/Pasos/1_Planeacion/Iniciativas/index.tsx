import React from 'react';
import TarjetaIniciativas from './TarjetaIniciativas';
import {useObtenerDatos} from 'redux/hooks';
import Stack from '@mui/material/Stack';
import type {TIniciativas} from 'models';
import {formatearFecha} from 'utils/methods';
import {useTranslation} from 'react-i18next';

const Iniciativas: React.FC = () => {
	const [expandido, setExpandido] = React.useState<string | boolean>(false);
	const {iniciativas} = useObtenerDatos();
	const {t} = useTranslation();

	console.log(iniciativas);

	return (
		<Stack marginTop='18px' spacing='10px'>
			{iniciativas.length &&
				iniciativas.map((iniciativa: TIniciativas) => (
					<TarjetaIniciativas
						key={iniciativa.codigoIniciativa}
						id={iniciativa.codigoIniciativa.toString()}
						expandido={expandido}
						setExpandido={setExpandido}
						nombreIniciativa={iniciativa.nombreActividad}
						planActividad={iniciativa.planActividad}
						descripcion={iniciativa.descripcion}
						fechaVencimiento={formatearFecha(iniciativa.vencimiento, t).replace(
							/-/g,
							'/'
						)}
						unidades={iniciativa.unidades}
						subUnidades={iniciativa.subUnidades}
						codigo={iniciativa.codigoProducto}
					/>
				))}
		</Stack>
	);
};

export default Iniciativas;
