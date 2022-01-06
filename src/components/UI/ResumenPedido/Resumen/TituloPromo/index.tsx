import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import theme from 'theme';

export const TituloPromo: React.FC = () => {
	return (
		<Box
			alignItems='center'
			display='flex'
			justifyContent='center'
			padding='12px 0'
			sx={{background: theme.palette.primary.main}}
		>
			<Typography variant='subtitle3' color='#fff'>
				Promo push
			</Typography>
		</Box>
	);
};
