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
					unidadesEjecutadas={iniciativa.unidadesEjecutadas}
					subUnidades={iniciativa.subUnidades}
					subUnidadesEjecutadas={iniciativa.subUnidadesEjecutadas}
					codigo={iniciativa.codigoProducto}
					estado={iniciativa.estado}
					motivo={iniciativa.motivo}
				/>
			))}
		</Stack>
	);
};

export default Iniciativas;
