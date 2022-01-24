import React, {Fragment} from 'react';
import useEstilos from './useEstilos';
import Encabezado from './Encabezado';
import Cuerpo from './Cuerpo';
import PieDePagina from './PieDePagina';
import {useRouteMatch} from 'react-router-dom';
import {CssBaseline, Typography} from '@mui/material';

export type Props = {
	children: React.ReactNode;
	titulo?: string;
	esConFechaHaciaAtras?: boolean;
};

const Estructura = ({esConFechaHaciaAtras = true, titulo, children}: Props) => {
	const estilos = useEstilos();

	return (
		<>
			{useRouteMatch().isExact && (
				<Fragment>
					<CssBaseline />
					{titulo !== undefined && (
						<Encabezado esConFechaHaciaAtras={esConFechaHaciaAtras}>
							{titulo}
						</Encabezado>
					)}
					<CssBaseline />
					{children}
				</Fragment>
			)}
		</>
	);
};

Estructura.Encabezado = Encabezado;
Estructura.Cuerpo = Cuerpo;
Estructura.PieDePagina = PieDePagina;

export default Estructura;
