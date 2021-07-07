import React from 'react';
import {Box, Container} from '@material-ui/core';
import Footers from 'assests/images/hdpi_logo_soft_hasar.png';
import useEstilos from './useEstilos';
import Encabezado from './Encabezado';
import {useRouteMatch} from 'react-router-dom';
export type Props = {
	children: React.ReactNode;
	titulo: string;
	esConFechaHaciaAtras?: boolean;
	esConLogoInferior?: boolean;
};

const Estructura = ({
	esConFechaHaciaAtras = true,
	esConLogoInferior = false,
	titulo,
	children,
}: Props) => {


	const estilos = useEstilos();
	return (
		<>
			{useRouteMatch().isExact && (
				<div className={estilos.root}>
					<Encabezado
						titulo={titulo}
						esConFechaHaciaAtras={esConFechaHaciaAtras}
					/>
					<Container component='main' maxWidth='xs'>
						<div>{children}</div>
					</Container>
					{esConLogoInferior && (
						<Box display='flex' justifyContent='center'>
							<div
								style={{
									background: `url(${Footers}) no-repeat`,
									height: '75px',
									width: '300px',
									position: 'absolute',
									bottom: '0px',
								}}
							></div>
						</Box>
					)}
				</div>
			)}
		</>
	);
};

export default Estructura;
