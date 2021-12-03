import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import theme from 'theme';

interface Props {
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const BotonResumenPedido: React.FC<Props> = ({setOpen}) => {
	return (
		<Box
			alignItems='center'
			borderRadius='50px'
			display='flex'
			justifyContent='center'
			marginBottom='12px'
			padding='4px 0'
			sx={{background: theme.palette.secondary.main, cursor: 'pointer'}}
			onClick={() => setOpen((prevState) => !prevState)}
		>
			<Typography variant='caption' fontFamily='Open Sans' color='#fff'>
				Ver resumen del pedido
			</Typography>
		</Box>
	);
};

export default BotonResumenPedido;
