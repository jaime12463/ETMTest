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
					key={iniciativa.idActividadIniciativa}
					{...iniciativa}
					expandido={expandido}
					setExpandido={setExpandido}
					iniciativaIncompleta={iniciativaIncompleta}
					setIniciativaIncompleta={setIniciativaIncompleta}
					idIniciativaIncompleta={idIniciativaIncompleta}
					setIdIniciativaIncompleta={setIdIniciativaIncompleta}
					avanza={avanza}
					setAvanza={setAvanza}
				/>
			))}
		</Box>
	);
};
