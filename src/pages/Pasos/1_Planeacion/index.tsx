import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {TarjetaColapsable} from 'components/UI';
import Iniciativas from './Iniciativas';
import {useTranslation} from 'react-i18next';
import {useObtenerVisitaActual} from 'redux/hooks';

export const Planeacion: React.FC = () => {
	const [expandido, setExpandido] = React.useState<string | boolean>(false);
	const {t} = useTranslation();
	const {iniciativas} = useObtenerVisitaActual();

	const iniciativasEjecutadas = iniciativas.filter(
		(iniciativa) =>
			iniciativa.estado === 'ejecutada' ||
			(iniciativa.estado === 'cancelada' && iniciativa.motivo !== '')
	);

	return (
		<Stack spacing={2}>
			<TarjetaColapsable
				titulo={<Typography variant={'subtitle1'}>Pedidos en curso</Typography>}
				subTitulo={
					<Typography variant={'body3'}>
						Aquí se muestra un listado de pedidos que estan pendientes por
						entregar
					</Typography>
				}
				id='PedidosEnCurso'
				expandido={expandido}
				setExpandido={setExpandido}
			>
				<div> PEDIDOS EN CURSO</div>
			</TarjetaColapsable>
			<TarjetaColapsable
				titulo={<Typography variant={'subtitle1'}>Sugerido para ti</Typography>}
				subTitulo={
					<Typography variant={'body3'}>
						Aquí se muestra un listado de pedidos que estan pendientes por
						entregar
					</Typography>
				}
				id='Sugeridos'
				expandido={expandido}
				setExpandido={setExpandido}
			>
				<div>SUGERIDOS PARA TI PEDIDOS EN CURSO</div>
			</TarjetaColapsable>
			<TarjetaColapsable
				titulo={
					<Typography variant={'subtitle1'}>
						{t('titulos.iniciativas')}
					</Typography>
				}
				subTitulo={
					<Typography variant={'body3'}>
						{t('titulos.tarjetaIniciativas')}
					</Typography>
				}
				id='Iniciativas'
				expandido={expandido}
				setExpandido={setExpandido}
				cantidadItems={iniciativasEjecutadas.length}
				labelChip={`${iniciativasEjecutadas.length} de ${iniciativas.length} Iniciativas`}
			>
				<Iniciativas />
			</TarjetaColapsable>
		</Stack>
	);
};
