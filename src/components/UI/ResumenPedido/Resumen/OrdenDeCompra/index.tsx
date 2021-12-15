import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {useTranslation} from 'react-i18next';

export interface OrdenDeCompraProps {
	ordenDeCompra: string;
}

export const OrdenDeCompra: React.FC<OrdenDeCompraProps> = ({
	ordenDeCompra,
}) => {
	const {t} = useTranslation();

	return (
		<Box display='flex'>
			<Box flex='2' padding='8px 12px'>
				<Typography variant='caption' fontFamily='Open Sans' color='#000'>
					{t('general.numeroOrdenDeCompra')}
				</Typography>
			</Box>
			<Box flex='1.5' padding='8px 12px 8px 6px' sx={{background: '#F5F0EF'}}>
				<Typography variant='caption' fontFamily='Open Sans' color='#000'>
					{ordenDeCompra}
				</Typography>
			</Box>
		</Box>
	);
};
