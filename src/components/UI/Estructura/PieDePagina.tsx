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
				sx={{zIndex: 1}}
			>
				<Box p={1}>{children}</Box>
			</Container>
			<Box
				sx={{
					width: '100%',
					height: '100px',
					position: 'fixed',
					bottom: 0,
					left: 0,
					background: 'linear-gradient(0deg, #F5F0F0  70%, transparent 100%)',
					zIndex: 0,
				}}
			/>
		</Box>
	);
};

export default PieDePagina;
