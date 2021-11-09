import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useEstilos from './useEstilos';
import {FlechaAbajoIcon} from 'assests/iconos';

interface Props {
	opcionSeleccionada: string;
	opciones: string[];
	setOpcion: React.Dispatch<React.SetStateAction<string>>;
	bloqueado: boolean;
	border?: boolean;
}

const CustomSelect: React.FC<Props> = ({
	opcionSeleccionada,
	opciones,
	setOpcion,
	bloqueado,
	border,
}) => {
	const [open, setOpen] = React.useState<boolean>(false);
	const selectRef = React.useRef<HTMLDivElement>(null);
	const opcionesAMostrar = opciones.filter(
		(opcion) =>
			opcion.toLocaleLowerCase() !== opcionSeleccionada.toLocaleLowerCase() &&
			opcion !== ''
	);
	const classes = useEstilos({
		open,
		bloqueado,
		border,
		opcion: opcionSeleccionada,
	});

	const cerrarOpciones = (e: any) => {
		if (selectRef.current && !selectRef.current.contains(e.target)) {
			setOpen(false);
		}
	};

	document.addEventListener('mousedown', cerrarOpciones);

	return (
		<Box
			className={classes.container}
			onClick={() => setOpen(!open)}
			ref={selectRef}
		>
			<Box>
				<Typography
					variant='caption'
					sx={{color: '#000', textTransform: 'capitalize'}}
					fontFamily='Open Sans'
				>
					{opcionSeleccionada}
				</Typography>
			</Box>
			<FlechaAbajoIcon className={classes.arrow} height='10px' width='10px' />
			{open && (
				<Box className={classes.dropdown}>
					{opcionesAMostrar?.map((opcion) => (
						<Box
							className={classes.options}
							key={opcion}
							onClick={() => {
								setOpcion(opcion.toLocaleLowerCase());
							}}
						>
							<Typography
								variant='caption'
								sx={{color: '#000', textTransform: 'capitalize'}}
								fontFamily='Open Sans'
							>
								{opcion}
							</Typography>
						</Box>
					))}
				</Box>
			)}
		</Box>
	);
};

export default CustomSelect;
