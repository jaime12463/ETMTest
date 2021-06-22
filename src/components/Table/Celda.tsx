import {TableCell, Typography} from '@material-ui/core';

type PropsCelda = {
	estilos: any; // TODO: Buscar como mejorar esto para recibir los estilos como propiedad
	texto: string;
	resumirTexto?: boolean;
};

export const Celda = ({estilos, texto, resumirTexto}: PropsCelda) => {
	return (
		<TableCell className={estilos.alignment}>
			<Typography className={resumirTexto ? estilos.text : null}>
				{texto}
			</Typography>
		</TableCell>
	);
};
