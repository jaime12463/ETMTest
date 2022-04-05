import React from 'react';
import Center from '../Center';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import conejoCarga from 'assests/images/conejoCarga.gif';
import theme from 'theme';

export const Loading: React.FC = () => {
	return (
		<Box
			sx={{
				minWidth: '100vw',
				minHeight: '100vh',
				backgroundColor: theme.palette.secondary.main,
			}}
		>
			<Center>
				<Box>
					<img
						src={conejoCarga}
						alt='logo'
						data-cy='boton-splash'
						style={{width: '188px', height: '169px'}}
					/>
					<Typography fontFamily={'Poppins'} color='white'>
						Procesando información...
					</Typography>
				</Box>
			</Center>
		</Box>
	);
};
