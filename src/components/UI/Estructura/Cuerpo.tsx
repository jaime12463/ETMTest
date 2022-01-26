import React from 'react';
import {Box, Container} from '@mui/material';
import useEstilos from './useEstilos';

const Cuerpo: React.FC = ({children}) => {
	const estilos = useEstilos();
	return (
		<Box
			display='flex'
			justifyContent='center'
			className={estilos.main}
			style={{overflow: 'auto'}}
		>
			<Container
				maxWidth='xs'
				component='main'
				disableGutters
				className={estilos.main}
				classes={{maxWidthXs: estilos.maxWidthXs}}
			>
				{children}
			</Container>
		</Box>
	);
};

export default Cuerpo;
