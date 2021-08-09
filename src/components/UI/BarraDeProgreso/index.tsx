import {useEffect, useState} from 'react';
import {useEstilos, BorderLinearProgress} from './useEstilos';
import {Typography, Box} from '@material-ui/core';
import {Numero} from 'components/UI';
import {useTranslation} from 'react-i18next';

export type Props = {
	max: number | undefined;
	valor: number;
	titulo: string;
	color: string;
	disable?: boolean;
	condicion?: string;
};

const BarraDeProgeso = ({
	max = 0,
	valor,
	titulo,
	disable = false,
	color,
	condicion = 'contado',
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
			<Typography className={estilos.label} variant='body2'>
				{condicion !== 'contado'
					? `${t('general.signoMoneda')}${valor.toFixed()}`
					: `${t('general.signoMoneda')}${valor.toFixed()}/${t(
							'general.signoMoneda'
					  )}${max}`}
			</Typography>
			<BorderLinearProgress
				variant='determinate'
				value={progreso <= 0 ? setProgreso(5) : progreso}
				barcolor={colorActual}
			/>
		</div>
	);
};

export default BarraDeProgeso;
