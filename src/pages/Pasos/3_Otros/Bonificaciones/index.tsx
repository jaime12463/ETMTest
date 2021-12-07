import React from 'react';
import DesplegableBonificaciones from './DesplegableBonificaciones';
import Stack from '@mui/material/Stack';
import {useObtenerBonificacionesHabilitadas} from 'hooks';

const Bonificaciones: React.FC = () => {
	const [expandido, setExpandido] = React.useState<boolean | string>(false);
	const bonificaciones = useObtenerBonificacionesHabilitadas();
	const bonificacionesHabilitadas = bonificaciones();

	console.log(bonificacionesHabilitadas);

	return (
		<Stack marginTop='18px' spacing='18px'>
			{bonificacionesHabilitadas?.map((bonificacion) => (
				<DesplegableBonificaciones
					expandido={expandido}
					setExpandido={setExpandido}
					id={bonificacion.idBonificacion.toString()}
					key={bonificacion.idBonificacion}
					nombre={bonificacion.nombreBonificacion}
					grupos={bonificacion.gruposBonificacion}
					vigenciaInicioBonificacion={bonificacion.vigenciaInicioBonificacion}
					vigenciaFinBonificacion={bonificacion.vigenciaFinBonificacion}
					aplicacionBonificacion={bonificacion.aplicacionBonificacion}
				/>
			))}
		</Stack>
	);
};

export default Bonificaciones;
