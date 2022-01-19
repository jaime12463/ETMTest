import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {TProductoPedido} from 'models';
import {BotellaIcon, CajaIcon} from 'assests/iconos';
import {useObtenerCatalogoMotivos} from 'pages/Pasos/2_TomaDePedido/hooks';
import {useTranslation} from 'react-i18next';
import theme from 'theme';

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

	const {t} = useTranslation();

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
				<Typography
					margin='4px 0 6px 0'
					variant='caption'
					color={theme.palette.secondary.main}
				>
					355 ml | Vidrio | Retornable {/* TODO REEMPLAZAR VALORES ACA */}
				</Typography>
				<Box alignItems='center' display='flex' gap='8px'>
					<Box alignItems='center' display='flex' gap='4px'>
						<CajaIcon height='14px' width='14px' />
						<Typography variant='subtitle3' fontFamily='Open Sans'>
							{unidades}
						</Typography>
					</Box>
					{esVentaSubunidades && (
						<Box alignItems='center' display='flex' gap='4px'>
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
						{t('general.motivo')}
					</Typography>
					<Typography variant='subtitle3'>
						{itemCatalogoMotivos[Number(catalogoMotivo) - 1]?.label}
					</Typography>
				</Box>
			</Box>
		</Box>
	);
};
