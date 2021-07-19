import React from 'react';
import useEstilos from './useEstilos';
import Encabezado from './Encabezado';
import Cuerpo from './Cuerpo';
import PieDePagina from './PieDePagina';
import {useRouteMatch} from 'react-router-dom';
import { Container, CssBaseline, Grid } from '@material-ui/core';

export type Props = {
	children: React.ReactNode;
	titulo: string;
	esConFechaHaciaAtras?: boolean;
};

const Estructura = ({
	esConFechaHaciaAtras = true,
	titulo,
	children,
}: Props) => {

	const estilos = useEstilos();
	return (
		<>
			{useRouteMatch().isExact && (
				<div className={estilos.root}>
					<CssBaseline />
						<Encabezado
							titulo={titulo}
							esConFechaHaciaAtras={esConFechaHaciaAtras}
						/>
						{children}
				</div>
			)}
		</>
	);
};


Estructura.Cuerpo = Cuerpo;
Estructura.PieDePagina = PieDePagina;


export default Estructura;
