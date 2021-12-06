import React from 'react';
import TarjetaIniciativas from './TarjetaIniciativas';
import {useObtenerVisitaActual} from 'redux/hooks';
import Stack from '@mui/material/Stack';
import {TIniciativasCliente} from 'models';
import {formatearFecha} from 'utils/methods';
import {useTranslation} from 'react-i18next';

const Iniciativas: React.FC = () => {
	const [expandido, setExpandido] = React.useState<string | boolean>(false);
	const {t} = useTranslation();
	const {iniciativas} = useObtenerVisitaActual();

	return (
		<Stack marginTop='18px' spacing='10px'>
			{iniciativas?.map((iniciativa: TIniciativasCliente) => (
				<TarjetaIniciativas
					key={iniciativa.idActividadIniciativa}
					id={iniciativa.idActividadIniciativa.toString()}
					expandido={expandido}
					setExpandido={setExpandido}
					nombreIniciativa={iniciativa.nombreIniciativa}
					planActividad={iniciativa.nombreActividadPlan}
					descripcion={iniciativa.descripcionIniciativa}
					fechaVencimiento={formatearFecha(
						iniciativa.finVigenciaIniciativa,
						t
					).replace(/-/g, '/')}
					unidades={iniciativa.unidadVentaIniciativa}
					unidadesEjecutadas={iniciativa.unidadesEjecutadas}
					subUnidades={iniciativa.subunidadVentaIniciativa}
					subUnidadesEjecutadas={iniciativa.subUnidadesEjecutadas}
					codigo={iniciativa.idMaterialIniciativa}
					estado={iniciativa.estado}
					motivo={iniciativa.motivo}
				/>
			))}
		</Stack>
	);
};

export default Iniciativas;
