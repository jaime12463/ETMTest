import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {CerrarIcon} from 'assests/iconos';
import useEstilos from './useEstilos';

interface Props {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ResumenPedido: React.FC<Props> = ({open, setOpen}) => {
	const classes = useEstilos({open});
	return (
		<>
			{open && (
				<Box className={classes.container}>
					<Box className={classes.card}>
						<Box
							display='flex'
							justifyContent='end'
							marginBottom='10px'
							onClick={() => setOpen((prevState) => !prevState)}
							sx={{cursor: 'pointer'}}
						>
							<CerrarIcon fill='#565657' />
						</Box>
						<Typography
							variant='subtitle2'
							fontFamily='Open Sans'
							color='#565657'
							textAlign='center'
							marginBottom='4px'
						>
							Resumen del pedido
						</Typography>
						<Box
							alignItems='center'
							display='flex'
							justifyContent='center'
							gap='2px'
						>
							<Typography
								variant='subtitle3'
								fontFamily='Open Sans'
								color='#565657'
							>
								Fecha de entrega:
							</Typography>
							<Typography
								variant='body3'
								fontFamily='Open Sans'
								color='#565657'
							>
								20 de Octubre de 2021
							</Typography>
						</Box>
					</Box>
				</Box>
			)}
		</>
	);
};

export default ResumenPedido;
