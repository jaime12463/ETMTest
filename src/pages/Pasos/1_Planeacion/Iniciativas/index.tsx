import React from 'react';
import TarjetaIniciativas from './TarjetaIniciativas';
import {useObtenerVisitaActual} from 'redux/hooks';
import Stack from '@mui/material/Stack';
import {TIniciativasCliente} from 'models';

const Iniciativas: React.FC = () => {
	const [expandido, setExpandido] = React.useState<string | boolean>(false);
	const {iniciativas} = useObtenerVisitaActual();

	return (
		<Stack marginTop='18px' spacing='10px'>
			{iniciativas?.map((iniciativa: TIniciativasCliente) => (
				<TarjetaIniciativas
					key={iniciativa.idActividadIniciativa}
					{...iniciativa}
					expandido={expandido}
					setExpandido={setExpandido}
				/>
			))}
		</Stack>
	);
};

export default Iniciativas;
