import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useEstilos from './useEstilos';
import {FlechaAbajoIcon} from 'assests/iconos';
import {List, ListItem} from '@mui/material';

interface Props {
	opcionSeleccionada: string;
	opciones: string[];
	setOpcion: React.Dispatch<React.SetStateAction<string>>;
	bloqueado?: boolean;
	border?: boolean;
	dataCy: string;
	sinFlecha?: boolean;
	placeholder?: string;
}

const CustomSelect: React.FC<Props> = ({
	opcionSeleccionada,
	opciones,
	setOpcion,
	bloqueado = false,
	border,
	dataCy,
	sinFlecha = false,
	placeholder = '',
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
		sinFlecha,
		placeholder,
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
			<Box
				alignItems='center'
				display='flex'
				justifyContent='space-between'
				width='100%'
			>
				<Typography
					variant='caption'
					sx={{
						color: opcionSeleccionada !== '' ? '#000' : 'greys.main',
						textTransform: 'capitalize',
					}}
					fontFamily='Open Sans'
				>
					{opcionSeleccionada !== '' ? opcionSeleccionada : placeholder}
				</Typography>
				<FlechaAbajoIcon className={classes.arrow} height='10px' width='10px' />
			</Box>
			{open && (
				<Box
					className={classes.dropdown}
					data-cy={dataCy}
					sx={{zIndex: 9999, position: 'absolute'}}
				>
					{opcionesAMostrar?.map((opcion) => (
						<Box
							className={classes.options}
							key={opcion}
							onClick={() => {
								setOpcion(opcion.toLowerCase());
							}}
							data-cy={`${dataCy}-opciones`}
						>
							<Typography
								variant='caption'
								sx={{color: '#000'}}
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
