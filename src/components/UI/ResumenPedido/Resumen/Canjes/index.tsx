import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {TProductoPedido} from 'models';
import {BotellaIcon, CajaIcon} from 'assests/iconos';
import {useObtenerCatalogoMotivos} from 'pages/Pasos/2_TomaDePedido/hooks';

export interface CanjesProps {
	producto: TProductoPedido;
}

export const Canjes: React.FC<CanjesProps> = ({producto}) => {
	const {
		codigoProducto,
		nombreProducto,
		unidades,
		subUnidades,
		esVentaSubunidades,
		catalogoMotivo,
	} = producto;

	const itemCatalogoMotivos = useObtenerCatalogoMotivos(undefined, 'canje');

	return (
		<Box display='flex'>
			<Box
				display='flex'
				flexDirection='column'
				flex='2'
				padding='8px 8px 8px 14px'
			>
				<Typography variant='subtitle3' fontFamily='Open Sans'>
					{codigoProducto}
				</Typography>
				<Typography variant='subtitle3'>{nombreProducto}</Typography>
				<Box alignItems='center' display='flex' gap='8px'>
					<Box alignItems='center' display='flex' gap='4px' marginTop='8px'>
						<CajaIcon height='14px' width='14px' />
						<Typography variant='subtitle3' fontFamily='Open Sans'>
							{unidades}
						</Typography>
					</Box>
					{esVentaSubunidades && (
						<Box alignItems='center' display='flex' gap='4px' marginTop='8px'>
							<BotellaIcon height='12px' width='12px' />
							<Typography variant='subtitle3' fontFamily='Open Sans'>
								{subUnidades}
							</Typography>
						</Box>
					)}
				</Box>
			</Box>
			<Box
				alignItems='center'
				display='flex'
				flex='1.5'
				padding='8px 14px 8px 8px'
				sx={{background: '#F5F0EF'}}
			>
				<Box display='flex' flexDirection='column' gap='4px'>
					<Typography variant='caption' fontFamily='Open Sans' color='#000'>
						Tipo
					</Typography>
					<Typography variant='subtitle3'>
						{itemCatalogoMotivos[Number(catalogoMotivo) - 1]?.label}
					</Typography>
				</Box>
			</Box>
		</Box>
	);
};
