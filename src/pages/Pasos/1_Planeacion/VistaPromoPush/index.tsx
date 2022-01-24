import React from 'react';
import {useObtenerPromoPushDelCliente} from 'hooks';
import {TarjetaVistaPromoPush} from './TarjetaVistaPromoPush';
import {Card, Box, Typography, Stack, IconButton} from '@mui/material';
import {CerrarIcon} from 'assests/iconos';
import theme from 'theme';

interface Props {
	setOpenVistaPromoPush: React.Dispatch<React.SetStateAction<boolean>>;
}

export const VistaPromoPush: React.FC<Props> = ({setOpenVistaPromoPush}) => {
	const [expandidoPromoPush, setExpandidoexpandidoPromoPush] = React.useState<
		string | boolean
	>(false);
	const promociones = useObtenerPromoPushDelCliente();
	const handleCloseVistaPromoPush = () => setOpenVistaPromoPush(false);

	return (
		<Box display='flex' width='100%' justifyContent='center'>
			<Card sx={{borderRadius: '8px', width: '100%'}}>
				<Box
					display='flex'
					justifyContent='flex-end'
					width='100%'
					padding='18px 18px 26px 18px'
				>
					<IconButton
						sx={{padding: 0, margin: 0}}
						onClick={handleCloseVistaPromoPush}
					>
						<CerrarIcon />
					</IconButton>
				</Box>
				<Box
					width='100%'
					height='47px'
					display='flex'
					justifyContent='center'
					alignItems='center'
					sx={{
						background: theme.palette.primary.main,
						borderRadius: ' 4px 4px 0px 0px',
					}}
				>
					<Typography color='white' fontFamily='Poppins' variant='subtitle3'>
						Promo Push
					</Typography>
				</Box>
				<Stack spacing='10px' padding='14px'>
					{promociones.length > 0 &&
						promociones.map((promocion: any) => {
							return (
								<TarjetaVistaPromoPush
									key={promocion.codigoProducto}
									item={promocion}
									id={promocion.nombreProducto}
									expandidoPromoPush={expandidoPromoPush}
									setExpandidoexpandidoPromoPush={
										setExpandidoexpandidoPromoPush
									}
								/>
							);
						})}
				</Stack>
			</Card>
		</Box>
	);
};
