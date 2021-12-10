import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import theme from 'theme';
import {PromocionesRellenoIcon} from 'assests/iconos';
import {formatearNumero} from 'utils/methods';
import {useTranslation} from 'react-i18next';

export interface PromoPushProps {}

export const PromoPush: React.FC<PromoPushProps> = () => {
	const {t} = useTranslation();

	return (
		<Box>
			<Box
				alignItems='center'
				display='flex'
				gap='4px'
				justifyContent='center'
				padding='10px 0'
				sx={{background: theme.palette.primary.main}}
			>
				<PromocionesRellenoIcon fill='#fff' height='17px' width='17px' />
				<Typography variant='subtitle3' color='#fff'>
					Promo push
				</Typography>
			</Box>
			<Box
				alignItems='center'
				display='flex'
				padding='12px 14px 8px 14px'
				sx={{background: theme.palette.secondary.light}}
			>
				<Box display='flex' flexDirection='column' flex='2'>
					<Typography variant='subtitle3' fontFamily='Open Sans' color='#fff'>
						230496
					</Typography>
					<Typography variant='subtitle3' color='#fff'>
						1001-MC CC1.75+CC600=7%
					</Typography>
				</Box>
				<Box display='flex' flexDirection='column' gap='8px' flex='1.5'>
					<Box
						alignItems='center'
						display='flex'
						justifyContent='space-between'
						paddingLeft='8px'
					>
						<Typography variant='caption' fontFamily='Open Sans' color='#fff'>
							P. Unitario
						</Typography>
						<Typography variant='caption' fontFamily='Open Sans' color='#fff'>
							{formatearNumero(30, t)}
						</Typography>
					</Box>
					<Box display='flex' justifyContent='end'>
						<Typography
							variant='caption'
							sx={{background: theme.palette.primary.main}}
							color='#fff'
							padding='2px 12px'
							borderRadius={9999}
						>{`Ahorras ${formatearNumero(20, t)}`}</Typography>
					</Box>
					<Box
						alignItems='center'
						display='flex'
						justifyContent='space-between'
					>
						<Typography variant='subtitle3' color='#fff'>
							Subtotal
						</Typography>
						<Typography variant='subtitle3' color='#fff'>
							{formatearNumero(100, t)}
						</Typography>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};
