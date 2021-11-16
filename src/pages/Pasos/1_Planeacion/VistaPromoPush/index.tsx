import React from 'react';
import {useObtenerPromoPushDelCliente} from 'hooks';
import {TarjetaVistaPromoPush} from './TarjetaVistaPromoPush';
import {Modal, Card, Box, Typography, Stack, Button, IconButton} from '@mui/material';
import {CerrarIcon, PromocionesRellenoIcon} from 'assests/iconos';

export const VistaPromoPush = ({stateOpen}: any) => {
	const {openVistaPromoPush, setOpenVistaPromoPush} = stateOpen;
	const [expandidoPromoPush, setExpandidoexpandidoPromoPush] = React.useState<
		string | boolean
	>(false);
	const promociones = useObtenerPromoPushDelCliente();
	const handleCloseVistaPromoPush = () => setOpenVistaPromoPush(false);

	return (
		<Modal
			open={openVistaPromoPush}
			onClose={handleCloseVistaPromoPush}
			aria-labelledby='modal-modal-title'
			aria-describedby='modal-modal-description'
			sx={{overflow: 'auto'}}
		>
			<Box display='flex' width='100%' justifyContent='center'>
				<Card
					sx={{
						background: 'white',
						width: '332px',
						// p: 2,
						mt: '52px',
					}}
				>
					<Box display='flex' justifyContent='flex-end' width='100%' padding="18px 18px 26px 18px">
						<IconButton
							sx={{padding: 0, margin: 0}}
							onClick={handleCloseVistaPromoPush}
						>
							<CerrarIcon fill='black' />
						</IconButton>
					</Box>
					<Box
						width='100%'
						height='47px'
						display='flex'
						justifyContent='center'
						alignItems='center'
						sx={{
							background: '#FF0000',
							borderRadius: ' 4px 4px 0px 0px',
						}}
					>
						<PromocionesRellenoIcon
							style={{width: '11.69px', height: '11.69px', marginRight: '4px'}}
							fill={'white'}
						/>
						<Typography
							color='white'
							sx={{width: '74px'}}
							fontFamily='Poppins'
							variant='subtitle3'
						>
							Promo Push
						</Typography>
					</Box>
					<Stack spacing={1} padding="14px">
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
		</Modal>
	);
};
