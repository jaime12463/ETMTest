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
			style={{maxHeight: '100%', overflow: 'auto'}}
		>
			<Container
				maxWidth='xs'
				component='main'
				disableGutters={true}
				className={estilos.main}
				classes={{maxWidthXs: estilos.maxWidthXs}}
				style={{
					paddingRight: '1rem',
					paddingLeft: '1rem',
				}}
			>
				{children}
			</Container>
		</Box>
	);
};

export default Cuerpo;
