import {Box, TableCell, Typography} from '@material-ui/core';

type PropsCelda = {
	estilos: any; // TODO: Buscar como mejorar esto para recibir los estilos como propiedad
	texto: string;
	width: string;
	align: 'left' | 'center' | 'right' | 'justify' | 'inherit' | undefined;
	resumirTexto?: boolean;
};

export const Celda = ({
	estilos,
	texto,
	resumirTexto,
	width,
	align,
}: PropsCelda) => {
	return (
		<TableCell align={align} padding='none' width={width + '%'}>
			<Box my={1} mx={1}>
				<Typography
					variant='body2'
					className={resumirTexto ? estilos.text : null}
				>
					{texto}
				</Typography>
			</Box>
		</TableCell>
	);
};
