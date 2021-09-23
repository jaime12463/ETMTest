import {useEffect, useState} from 'react';
//TODO: EL CAMBIO A MUI AFECTO ESTO
import {useEstilos, BorderLinearProgress} from './useEstilos';
import {Typography, Box, LinearProgress} from '@mui/material';
import {Numero} from 'components/UI';
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

const BarraDeProgeso = ({
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
		<div
			className={estilos.container}
			style={disable === true ? {display: 'none'} : {display: 'block'}}
		>
			<Typography
				className={estilos.titulo}
				variant='caption'
			>{`${titulo}`}</Typography>
			<Typography className={estilos.label} variant='body2' data-cy={dataCY}>
				{condicion !== 'contado'
					? formatearNumero(valor, t)
					: `${formatearNumero(valor, t)} / ${formatearNumero(max, t)}`}
			</Typography>
			<LinearProgress
				variant='determinate'
				//TODO: EL CAMBIO A MUI AFECTO ESTO
				// value={progreso <= 0 ? setProgreso(5) : progreso}
				// barcolor={colorActual}
			/>
		</div>
	);
};

export default BarraDeProgeso;
