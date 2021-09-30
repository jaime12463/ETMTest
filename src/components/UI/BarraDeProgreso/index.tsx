import {useEffect, useState} from 'react';
import { styled } from '@mui/styles';
//TODO: EL CAMBIO A MUI AFECTO ESTO
import {useEstilos, BorderLinearProgress} from './useEstilos';
import {Typography, Box, LinearProgress} from '@mui/material';

import {useTranslation} from 'react-i18next';
import {formatearNumero} from 'utils/methods';

export type Props = {
	max: number | undefined;
	valor: number;
	titulo: string;
	color: string;
	disable?: boolean;
	condicion?: string;
	dataCY: string;
};

const BarraDeLinea= styled(LinearProgress)({
	height: '18px',
	width: 100,
	textAlign: 'center',
	flex: '1 0 auto',
	//paddingTop: 4,
	//paddingBottom: 4,
	backgroundRepeat: 'no-repeat',
	borderRadius: '4px',
});

const BarraDeProgreso = ({
	max = 0,
	valor,
	titulo,
	disable = false,
	color,
	condicion = 'contado',
	dataCY,
}: Props) => {
	const estilos = useEstilos();
	const {t} = useTranslation();
	const progesoActual = (valor * 100) / max;
	const calcularProgreso = progesoActual > 100 ? 100 : progesoActual;
	const [progreso, setProgreso] = useState(calcularProgreso);
	const [colorActual, setColorActual] = useState(color);

	useEffect(() => {
		setProgreso(calcularProgreso);
		setColorActual(color);
	}, [valor, progreso, color]);

	return (
		<Box>
			<Box sx={{
				marginBottom:'9px',
				textAlign:'center',
				lineHeight:1
			}}>
				<Typography component="p"variant='caption'>{`${titulo}`}</Typography>
				<Typography component="p" variant='caption' data-cy={dataCY}>
					{condicion !== 'contado'
						? formatearNumero(valor, t)
						: `${formatearNumero(valor, t)} / ${formatearNumero(max, t)}`}
				</Typography>
			</Box>
			<LinearProgress
				variant='determinate'
				value={ progreso ?? 0} //{ progreso <= 0 ? setProgreso(5) : progreso ?? 0}
				sx={{
					height:18,
					color:colorActual,
					backgroundColor:'#B2B2B2',
					borderRadius:'4px',
				}}
			/>
		</Box>
	);
};

export default BarraDeProgreso;
