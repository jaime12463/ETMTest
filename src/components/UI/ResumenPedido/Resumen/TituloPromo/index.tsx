import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {PromocionesRellenoIcon} from 'assests/iconos';
import theme from 'theme';

export const TituloPromo: React.FC = () => {
	return (
		<Box
			alignItems='center'
			display='flex'
			gap='4px'
			justifyContent='center'
			padding='10px 0'
			sx={{background: theme.palette.primary.main}}
		>
			<PromocionesRellenoIcon height='17px' width='17px' />
			<Typography variant='subtitle3' color='#fff'>
				Promo push
			</Typography>
		</Box>
	);
};
