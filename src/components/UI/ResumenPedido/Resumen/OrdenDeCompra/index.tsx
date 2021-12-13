import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export interface OrdenDeCompraProps {
	ordenDeCompra: string;
}

export const OrdenDeCompra: React.FC<OrdenDeCompraProps> = ({
	ordenDeCompra,
}) => {
	return (
		<Box display='flex'>
			<Box flex='2' padding='8px 12px'>
				<Typography variant='caption' fontFamily='Open Sans' color='#000'>
					Número de orden de compra:
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
