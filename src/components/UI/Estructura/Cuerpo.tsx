import React from 'react';
import {Box, Container} from '@mui/material';
import useEstilos from './useEstilos';

const Cuerpo: React.FC = ({children}) => {
	const estilos = useEstilos();

	return (
		<Container
			component='main'
			disableGutters
			className={estilos.main}
			classes={{maxWidthXs: estilos.maxWidthXs}}
			sx={{
				alignItems: 'center',
				display: 'flex',
				flexDirection: 'column',
				minHeight: '100%',
				minWidth: '100%',
				overflow: 'auto',
			}}
		>
			<Box maxWidth='360px' width='100%'>
				{children}
			</Box>
		</Container>
	);
};

export default Cuerpo;
