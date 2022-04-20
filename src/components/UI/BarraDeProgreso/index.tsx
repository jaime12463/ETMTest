import {useEffect, useState} from 'react';
import {BorderLinearProgress} from './useEstilos';
import {Typography, Box} from '@mui/material';
import {useTranslation} from 'react-i18next';
import {formatearNumero} from 'utils/methods';

export type Props = {
	color: string;
	condicion?: string;
	dataCY: string;
	disable?: boolean;
	max?: number;
	pedidoMinimoCumplido: boolean;
	titulo: string;
	valor: number;
};

export const BarraDeProgreso: React.VFC<Props> = ({
	color,
	condicion = 'contado',
	dataCY,
	max = 0,
	pedidoMinimoCumplido,
	titulo,
	valor,
}) => {
	const {t} = useTranslation();

	const progesoActual = (valor * 100) / max;
	const calcularProgreso = progesoActual > 100 ? 100 : progesoActual;
	const [progreso, setProgreso] = useState(calcularProgreso);
	const [colorActual, setColorActual] = useState(color);

	useEffect(() => {
		if (titulo === t('general.pedidoMinimo') && pedidoMinimoCumplido) {
			setProgreso(100);
			return;
		}

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
						: (titulo === t('general.pedidoMinimo') && pedidoMinimoCumplido) ||
						  progreso === 100
						? `${formatearNumero(max, t)}`
						: `${formatearNumero(valor, t)} / ${formatearNumero(max, t)}`}
				</Typography>
			</Box>
			<BorderLinearProgress
				variant='determinate'
				value={progreso}
				color={colorActual === 'success' ? 'success' : 'primary'}
			/>
		</Box>
	);
};
