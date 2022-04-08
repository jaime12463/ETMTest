import React from 'react';
import Center from '../Center';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import conejoCarga from 'assests/images/conejoCarga.gif';
import theme from 'theme';
import {useTranslation} from 'react-i18next';

export const Loading: React.FC = () => {
	const {t} = useTranslation();

	return (
		<Box
			sx={{
				minWidth: '100vw',
				minHeight: '100vh',
				backgroundColor: theme.palette.secondary.main,
			}}
		>
			<Center>
				<Box>
					<img
						src={conejoCarga}
						alt='logo'
						data-cy='boton-splash'
						style={{width: '188px', height: '169px'}}
					/>
					<Typography fontFamily={'Poppins'} color='white'>
						{t('general.procesandoInformacion')}
					</Typography>
				</Box>
			</Center>
		</Box>
	);
};
