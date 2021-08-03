import {useEffect, useState} from 'react';
import {useEstilos, BorderLinearProgress} from './useEstilos';
import {Typography, Box} from '@material-ui/core';
import {coloresBarra} from 'utils/constants';

export type Props = {
	max: number | undefined;
	valor: number;
	titulo: string;
	colores?: string[];
	disable?: boolean;
};

const obtenerColor = (
	progreso: number,
	gradients: {inicio: string; medio: string; final: string}
) => {
	let color: string;
	progreso < 40
		? (color = gradients.inicio)
		: progreso > 40 && progreso <= 60
		? (color = gradients.medio)
		: (color = gradients.final);

	return color;
};

const BarraDeProgeso = ({
	max = 0,
	valor,
	titulo,
	disable = false,
	colores = ['rojo', 'amarillo', 'verde'],
}: Props) => {
	const estilos = useEstilos();
	const calcularProgreso =
		(valor * 100) / max > 100 ? 100 : (valor * 100) / max;
	const [progreso, setProgreso] = useState(calcularProgreso);
	const [color, setColor] = useState('');

	const gradients = {
		inicio: `${coloresBarra[colores[0]]} 0%, ${coloresBarra[colores[0]]} 100%`,
		medio: `${coloresBarra[colores[0]]} 0%, ${coloresBarra[colores[0]]} 45%, ${
			coloresBarra[colores[1]]
		} 100%`,
		final: `${coloresBarra[colores[0]]} 0%, ${coloresBarra[colores[1]]} 45%, ${
			coloresBarra[colores[1]]
		} 60%, ${coloresBarra[colores[2]]} 100%`,
	};

	useEffect(() => {
		setProgreso(calcularProgreso);
		setColor(` linear-gradient(90deg, ${obtenerColor(progreso, gradients)}`);
	}, [valor, progreso]);

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
				{`$${valor}/$${max}`}
			</Typography>
			<BorderLinearProgress
				variant='determinate'
				value={progreso === 0 ? setProgreso(5) : progreso}
				barcolor={color}
			/>
		</div>
	);
};

export default BarraDeProgeso;
