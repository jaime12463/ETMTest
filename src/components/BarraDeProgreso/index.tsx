import {useState} from 'react';
import {useEstilos, BorderLinearProgress} from './useEstilos';
import {Typography, Box} from '@material-ui/core';

export type Props = {
	max: number;
	valor: number;
	colores?: string[];
	titulo: string;
};

const obtenerColor = (progreso: number, colores: string[]) => {
	let color: string;
	progreso <= 10
		? (color = colores[0])
		: progreso > 10 && progreso <= 60
		? (color = colores[1])
		: (color = colores[2]);

	return color;
};

const BarraDeProgeso = ({
	max,
	valor,
	titulo,
	colores = ['red', 'yellow', 'green'],
}: Props) => {
	const estilos = useEstilos();
	const [progreso, setProgreso] = useState((valor * 100) / max);
	const [color, setColor] = useState(obtenerColor(progreso, colores));

	return (
		<div className={estilos.container}>
			<Typography
				className={estilos.titulo}
				variant='caption'
			>{`${titulo}`}</Typography>
			<Typography
				className={estilos.label}
				variant='body2'
			>{`$${valor}/$${max}`}</Typography>
			<BorderLinearProgress
				variant='determinate'
				value={progreso === 0 ? setProgreso(5) : progreso}
				barcolor={color}
			/>
		</div>
	);
};

export default BarraDeProgeso;
