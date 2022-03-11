import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {useTranslation} from 'react-i18next';
import theme from 'theme';

export interface OrdenDeCompraProps {
	ordenDeCompra: string;
}

export const OrdenDeCompra: React.FC<OrdenDeCompraProps> = ({
	ordenDeCompra,
}) => {
	const {t} = useTranslation();

	return (
		<Box display='flex' border={`1px solid ${theme.palette.secondary.main}`}>
			<Box flex='1' padding='8px 8px 8px 12px'>
				<Typography variant='caption' fontFamily='Open Sans' color='#000'>
					{`${t('general.numeroOrdenDeCompra')}:`}
				</Typography>
			</Box>
			<Box
				flexBasis='143px'
				padding='8px 12px 8px 6px'
				sx={{background: '#F5F0EF'}}
			>
				<Typography
					variant='caption'
					fontFamily='Open Sans'
					color='#000'
					sx={{lineBreak: 'anywhere'}}
				>
					{ordenDeCompra}
				</Typography>
			</Box>
		</Box>
	);
};
