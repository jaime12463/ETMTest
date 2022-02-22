import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {PromocionesIcon} from 'assests/iconos';
import {useTranslation} from 'react-i18next';
import theme from 'theme';
import {TPromoOngoingAplicadas} from 'models';

export interface PromoOngoingProps {
	promocion: TPromoOngoingAplicadas;
}

export const PromoOngoing: React.FC<PromoOngoingProps> = ({promocion}) => {
	const {t} = useTranslation();
	const {promocionID, aplicacion, productos, descripcion} = promocion;

	return (
		<Box border={`1px solid ${theme.palette.secondary.light}`}>
			<Box
				alignItems='center'
				display='flex'
				sx={{background: theme.palette.secondary.light}}
			>
				<Box
					flex='1'
					display='flex'
					flexDirection='column'
					gap='2px'
					padding='10px 8px 10px 14px'
				>
					<Typography variant='subtitle3' fontFamily='Open Sans' color='#fff'>
						{promocionID}
					</Typography>
					<Typography variant='subtitle3' color='#fff'>
						{descripcion}
					</Typography>
				</Box>
				<Box
					alignItems='center'
					display='flex'
					justifyContent='end'
					flexBasis='143px'
					padding='10px 16px 10px 8px'
				>
					<Box
						borderRadius='50px'
						display='flex'
						padding='2px 12px'
						sx={{background: theme.palette.info.main}}
					>
						<Typography variant='caption' fontFamily='Open Sans' color='#fff'>
							{t('general.productoGratis')}
						</Typography>
					</Box>
				</Box>
			</Box>
			{productos.map((producto) => (
				<Box display='flex' key={producto.codigoProducto}>
					<Box
						display='flex'
						flexDirection='column'
						gap='4px'
						flex='1'
						padding='16px 6px 16px 14px'
					>
						<Box display='flex' flexDirection='column'>
							<Typography variant='subtitle3' fontFamily='Open Sans'>
								{producto.codigoProducto}
							</Typography>
							<Typography variant='subtitle3'>
								{producto.descripcion}
							</Typography>
						</Box>
						<Box alignItems='center' display='flex' gap='4px'>
							<PromocionesIcon height='14px' width='14px' />
							<Typography variant='subtitle3' fontFamily='Open Sans'>
								{producto.cantidad}
							</Typography>
						</Box>
					</Box>
					<Box
						display='flex'
						flexBasis='143px'
						flexDirection='column'
						gap='4px'
						justifyContent='center'
						minHeight='100%'
						padding='8px 14px 8px 8px'
						sx={{background: '#F5F0EF'}}
					>
						<Typography variant='caption' color='#000'>
							{`${t('general.tipo')}:`}
						</Typography>
						<Typography variant='subtitle3'>{t('general.obsequio')}</Typography>
					</Box>
				</Box>
			))}
		</Box>
	);
};
