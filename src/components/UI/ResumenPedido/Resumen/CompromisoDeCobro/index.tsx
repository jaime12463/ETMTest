import React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import {formatearNumero} from 'utils/methods';
import {useTranslation} from 'react-i18next';

export interface CompromisoDeCobroProps {}

export const CompromisoDeCobro: React.FC<CompromisoDeCobroProps> = () => {
	const {t} = useTranslation();
	return (
		<Box>
			<Box display='flex'>
				<Box
					display='flex'
					flex='2'
					flexDirection='column'
					gap='10px'
					padding='8px 8px 8px 14px'
				>
					<Typography variant='caption' fontFamily='Open Sans' color='#000'>
						Limite de crédito
					</Typography>
					<Typography variant='caption' fontFamily='Open Sans' color='#000'>
						Disponible
					</Typography>
					<Typography variant='caption' fontFamily='Open Sans' color='#000'>
						Fecha de alta
					</Typography>
				</Box>
				<Box
					display='flex'
					flex='1.5'
					flexDirection='column'
					gap='10px'
					padding='8px 14px 8px 8px'
					sx={{background: '#F5F0EF'}}
				>
					<Typography variant='caption' fontFamily='Open Sans' color='#000'>
						Limite de crédito
					</Typography>
					<Typography variant='caption' fontFamily='Open Sans' color='#000'>
						Disponible
					</Typography>
					<Typography variant='caption' fontFamily='Open Sans' color='#000'>
						Fecha de alta
					</Typography>
				</Box>
			</Box>
			<Divider />
			<Box
				alignItems='center'
				display='flex'
				gap='40px'
				justifyContent='end'
				padding='8px 12px'
			>
				<Typography variant='subtitle3' color='#000'>
					Compromiso de cobro:
				</Typography>
				<Typography variant='subtitle3' color='#000'>
					{formatearNumero(2000, t)}
				</Typography>
			</Box>
		</Box>
	);
};
