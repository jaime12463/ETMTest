import React from 'react';
import {Box, Container} from '@mui/material';
import useEstilos from './useEstilos';

const PieDePagina: React.FC = ({children}) => {
	const estilos = useEstilos();

	return (
		<Box display='flex' justifyContent='center'>
			<Container
				maxWidth='xs'
				component='footer'
				disableGutters={true}
				classes={{maxWidthXs: estilos.maxWidthXs}}
			>
				<Box p={1}>{children}</Box>
			</Container>
		</Box>
	);
};

export default PieDePagina;
