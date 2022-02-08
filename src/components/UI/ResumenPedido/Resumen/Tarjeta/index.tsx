import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {BotellaIcon, CajaIcon} from 'assests/iconos';
import {formatearNumero} from 'utils/methods';
import {useTranslation} from 'react-i18next';
import {TProductoPedido} from 'models';
import theme from 'theme';
import {useObtenerDatos} from 'redux/hooks';

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
		atributos,
	} = producto;

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
						color={theme.palette.secondary.main}
					>
						{`${medidas[producto.atributos?.medida ?? 0].descripcion} | ${
							envases[producto.atributos?.envase ?? 0].descripcion
						}`}
					</Typography>
				)}
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
				flexBasis='143px'
				padding='8px 14px 16px 8px'
				sx={{background: '#F5F0EF'}}
			>
				<Box display='flex' flexDirection='column'>
					<Box
						alignItems='center'
						display='flex'
						justifyContent='space-between'
						marginBottom='10px'
					>
						<Box alignItems='center' display='flex' gap='4px'>
							<Typography variant='caption' fontFamily='Open Sans' color='#000'>
								{t('general.precioUnitario')}
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
								{t('general.precioUnitario')}
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
							{t('general.subTotal')}
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
