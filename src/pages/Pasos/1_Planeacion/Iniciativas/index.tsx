import React from 'react';
import TarjetaIniciativas from './TarjetaIniciativas';
import {useObtenerVisitaActual} from 'redux/hooks';
import Box from '@mui/material/Box';
import {TIniciativasCliente} from 'models';

export const Iniciativas: React.VFC = () => {
	const [expandido, setExpandido] = React.useState<string | boolean>(false);
	const [iniciativaIncompleta, setIniciativaIncompleta] =
		React.useState<boolean>(false);
	const [idIniciativaIncompleta, setIdIniciativaIncompleta] = React.useState<
		number | null
	>(null);
	const [avanza, setAvanza] = React.useState<boolean>(false);

	const {iniciativas} = useObtenerVisitaActual();

	return (
		<Box display='flex' flexDirection='column' marginTop='18px' gap='10px'>
			{iniciativas?.map((iniciativa: TIniciativasCliente) => (
				<TarjetaIniciativas
					avanza={avanza}
					expandido={expandido}
					idIniciativaIncompleta={idIniciativaIncompleta}
					iniciativa={iniciativa}
					iniciativaIncompleta={iniciativaIncompleta}
					key={iniciativa.idActividadIniciativa}
					setAvanza={setAvanza}
					setExpandido={setExpandido}
					setIdIniciativaIncompleta={setIdIniciativaIncompleta}
					setIniciativaIncompleta={setIniciativaIncompleta}
				/>
			))}
		</Box>
	);
};
