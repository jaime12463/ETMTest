import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {TProductoPedido} from 'models';
import {BotellaIcon, CajaIcon} from 'assests/iconos';
import {useObtenerCatalogoMotivos} from 'pages/Pasos/2_TomaDePedido/hooks';
import {useTranslation} from 'react-i18next';
import theme from 'theme';
import {useObtenerDatos} from 'redux/hooks';

export interface CanjesProps {
	producto: TProductoPedido;
}

export const Canjes: React.FC<CanjesProps> = ({
	producto: {
		codigoProducto,
		nombreProducto,
		unidades,
		subUnidades,
		catalogoMotivo,
		atributos,
		presentacion,
	},
}) => {
	const itemCatalogoMotivos = useObtenerCatalogoMotivos(undefined, 'canje');

	const {t} = useTranslation();

	const {envases, medidas} = useObtenerDatos();

	return (
		<Box display='flex'>
			<Box
				display='flex'
				flexDirection='column'
				flex='1'
				padding='8px 8px 8px 14px'
			>
				<Typography variant='subtitle3' fontFamily='Open Sans'>
					{codigoProducto}
				</Typography>
				<Typography variant='subtitle3' marginBottom={atributos ? 0 : '6px'}>
					{nombreProducto}
				</Typography>
				{atributos && (
					<Typography
						margin='4px 0 6px 0'
						variant='caption'
						fontFamily='Open Sans'
						color={theme.palette.secondary.main}
					>
						{`${medidas[atributos?.medida ?? 0].descripcion} | ${
							envases[atributos?.envase ?? 0].descripcion
						}`}
					</Typography>
				)}
				<Box alignItems='center' display='flex' gap='4px'>
					<CajaIcon height='14px' width='14px' />
					<Typography
						variant='caption'
						color='secondary'
						fontFamily='Open Sans'
					>
						{`x${presentacion}`}
					</Typography>
				</Box>
			</Box>
			<Box
				display='flex'
				flexDirection='column'
				justifyContent='space-between'
				flexBasis='143px'
				sx={{background: '#F5F0EF'}}
			>
				<Box
					display='flex'
					flexDirection='column'
					gap='8px'
					padding='8px 14px 8px 8px'
				>
					{unidades > 0 && (
						<Box alignItems='center' display='flex' gap='4px'>
							<Typography
								variant='caption'
								color='secondary'
								fontFamily='Open Sans'
							>
								{unidades}
							</Typography>
							<CajaIcon height='18px' width='18px' />
						</Box>
					)}
					{subUnidades > 0 && (
						<Box alignItems='center' display='flex' gap='4px'>
							<Typography
								variant='caption'
								color='secondary'
								fontFamily='Open Sans'
							>
								{subUnidades}
							</Typography>
							<BotellaIcon height='18px' width='18px' />
						</Box>
					)}
				</Box>
				<Typography
					variant='subtitle3'
					padding='8px 14px 8px 8px'
					sx={{background: '#F5F0EF', mixBlendMode: 'multiply'}}
				>
					{itemCatalogoMotivos[Number(catalogoMotivo) - 1]?.label}
				</Typography>
			</Box>
		</Box>
	);
};
