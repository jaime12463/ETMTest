import React from 'react';
import Encabezado from './Encabezado';
import Cuerpo from './Cuerpo';
import PieDePagina from './PieDePagina';
import {useRouteMatch} from 'react-router-dom';
import {CssBaseline} from '@mui/material';
import Box from '@mui/material/Box';

export type Props = {
	children: React.ReactNode;
	titulo?: string;
	esConFechaHaciaAtras?: boolean;
};

const Estructura = ({esConFechaHaciaAtras = true, titulo, children}: Props) => {
	return (
		<>
			{useRouteMatch().isExact && (
				<Box display='grid' gridTemplateRows='auto 1fr auto' minHeight='100%'>
					<CssBaseline />
					{titulo !== undefined && (
						<Encabezado esConFechaHaciaAtras={esConFechaHaciaAtras}>
							{titulo}
						</Encabezado>
					)}
					{children}
				</Box>
			)}
		</>
	);
};

Estructura.Encabezado = Encabezado;
Estructura.Cuerpo = Cuerpo;
Estructura.PieDePagina = PieDePagina;

export default Estructura;
