import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import theme from 'theme';
import ResumenPedido from '../ResumenPedido';

interface Props {}

const BotonResumenPedido: React.FC<Props> = () => {
	const [open, setOpen] = React.useState<boolean>(false);

	return (
		<>
			{open && <ResumenPedido open={open} setOpen={setOpen} />}
			<Box
				alignItems='center'
				borderRadius='50px'
				display='flex'
				justifyContent='center'
				marginBottom='12px'
				padding='4px 0'
				sx={{background: theme.palette.secondary.main, cursor: 'pointer'}}
				onClick={() => setOpen(!open)}
			>
				<Typography variant='caption' fontFamily='Open Sans' color='#fff'>
					Ver resumen del pedido
				</Typography>
			</Box>
		</>
	);
};

export default BotonResumenPedido;
