import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {PromocionesIcon} from 'assests/iconos';
import {useTranslation} from 'react-i18next';
import theme from 'theme';

interface Props {}

export const PromoOngoing: React.FC<Props> = () => {
	const {t} = useTranslation();
	return (
		<Box border={`1px solid ${theme.palette.secondary.light}`}>
			<Box
				alignItems='center'
				display='flex'
				justifyContent='space-between'
				padding='10px 14px'
				sx={{background: theme.palette.secondary.light}}
			>
				<Box display='flex' flexDirection='column' gap='2px'>
					<Typography variant='subtitle3' fontFamily='Open Sans' color='#fff'>
						519714 {/* AGREGAR CODIGO */}
					</Typography>
					<Typography variant='subtitle3' color='#fff'>
						CIEL MINERAL 12 OZ VID {/* AGREGAR NOMBRE */}
					</Typography>
				</Box>
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
			<Box display='flex'>
				<Box
					display='flex'
					flexDirection='column'
					gap='4px'
					flex='1'
					padding='16px 6px 16px 14px'
				>
					<Box display='flex' flexDirection='column'>
						<Typography variant='subtitle3' fontFamily='Open Sans'>
							603653 {/* AGREGAR CODIGO */}
						</Typography>
						<Typography variant='subtitle3'>
							VASO NAVIDEÑO {/* AGREGAR NOMBRE */}
						</Typography>
					</Box>
					<Box alignItems='center' display='flex' gap='4px'>
						<PromocionesIcon height='14px' width='14px' />
						<Typography variant='subtitle3' fontFamily='Open Sans'>
							2 {/* AGREGAR CANTIDAD */}
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
		</Box>
	);
};
