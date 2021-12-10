import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import theme from 'theme';

export interface TituloProps {
	background: string;
	bonificacion?: boolean;
}

export const Titulo: React.FC<TituloProps> = ({
	children,
	background,
	bonificacion,
}) => {
	return (
		<Box
			alignItems='center'
			display='flex'
			justifyContent='space-between'
			padding='12px 14px'
			sx={{background}}
		>
			<Typography variant='subtitle2' color='#fff'>
				{children}
			</Typography>
			{bonificacion && (
				<Typography
					borderRadius='50px'
					color='#fff'
					fontFamily='Open Sans'
					marginRight='6px'
					padding='2px 12px'
					sx={{background: theme.palette.info.main}}
					variant='caption'
				>
					Producto gratis
				</Typography>
			)}
		</Box>
	);
};
