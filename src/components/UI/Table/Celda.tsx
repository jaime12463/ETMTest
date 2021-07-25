import {Box, TableCell, Typography} from '@material-ui/core';

type PropsCelda = {
	estilos: any; // TODO: Buscar como mejorar esto para recibir los estilos como propiedad
	children?: React.ReactNode;
	dataCy?: string;
	width: string;
	align: 'left' | 'center' | 'right' | 'justify' | 'inherit' | undefined;
	resumirTexto?: boolean;
};

export const Celda = ({
	estilos,
	children,
	resumirTexto,
	width,
	align,
	dataCy,
}: PropsCelda) => {
	return (
		<TableCell
			align={align}
			padding='none'
			width={width + '%'}
			data-cy={dataCy}
		>
			<Box my={1} mx={1}>
				<Typography
					variant='body2'
					className={resumirTexto ? estilos.text : null}
				>
					{children}
				</Typography>
			</Box>
		</TableCell>
	);
};
