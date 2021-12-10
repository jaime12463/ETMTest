import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {BotellaIcon, CajaIcon} from 'assests/iconos';
import {formatearNumero} from 'utils/methods';
import {useTranslation} from 'react-i18next';
import {TProductoPedido} from 'models';

export interface TarjetaProps {
	producto: TProductoPedido;
}

export const Tarjeta: React.FC<TarjetaProps> = ({producto}) => {
	const {t} = useTranslation();
	const {
		codigoProducto,
		nombreProducto,
		unidades,
		subUnidades,
		esVentaSubunidades,
		precioConImpuestoUnidad,
		precioConImpuestoSubunidad,
		total,
	} = producto;

	return (
		<Box display='flex' flexDirection='row'>
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
			<Box flex='1.5' padding='8px 14px 8px 8px' sx={{background: '#F5F0EF'}}>
				<Box display='flex' flexDirection='column'>
					<Box
						alignItems='center'
						display='flex'
						justifyContent='space-between'
						marginBottom='10px'
					>
						<Box alignItems='center' display='flex' gap='4px'>
							<Typography variant='caption' fontFamily='Open Sans' color='#000'>
								P. Unitario
							</Typography>
							<CajaIcon height='12px' width='12px' />
						</Box>
						<Typography variant='caption' fontFamily='Open Sans' color='#000'>
							{formatearNumero(precioConImpuestoUnidad, t)}
						</Typography>
					</Box>
					<Box
						alignItems='center'
						display='flex'
						justifyContent='space-between'
						marginBottom='10px'
					>
						<Box alignItems='center' display='flex' gap='4px'>
							<Typography variant='caption' fontFamily='Open Sans' color='#000'>
								P. Unitario
							</Typography>
							<BotellaIcon height='10px' width='10px' />
						</Box>
						<Typography variant='caption' fontFamily='Open Sans' color='#000'>
							{formatearNumero(precioConImpuestoSubunidad, t)}
						</Typography>
					</Box>
					<Box
						alignItems='center'
						display='flex'
						justifyContent='space-between'
					>
						<Typography variant='caption' fontFamily='Open Sans' color='#000'>
							Subtotal
						</Typography>
						<Typography variant='subtitle3' color='#000'>
							{formatearNumero(total, t)}
						</Typography>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};
