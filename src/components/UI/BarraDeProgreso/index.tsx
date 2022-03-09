import {useEffect, useState} from 'react';
import {BorderLinearProgress} from './useEstilos';
import {Typography, Box} from '@mui/material';
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

const BarraDeProgreso = ({
	max = 0,
	valor,
	titulo,
	disable = false,
	color,
	condicion = 'contado',
	dataCY,
}: Props) => {
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
			<Box
				sx={{
					marginBottom: '9px',
					textAlign: 'center',
					lineHeight: 1,
				}}
			>
				<Typography component='p' variant='caption'>{`${titulo}`}</Typography>
				<Typography component='p' variant='caption' data-cy={dataCY}>
					{condicion !== 'contado'
						? formatearNumero(valor, t)
						: `${formatearNumero(valor, t)} / ${formatearNumero(max, t)}`}
				</Typography>
			</Box>
			<BorderLinearProgress
				variant='determinate'
				value={progreso ?? 0} //{ progreso <= 0 ? setProgreso(5) : progreso ?? 0}
				color={colorActual === 'success' ? 'success' : 'primary'}
			/>
		</Box>
	);
};

export default BarraDeProgreso;
