import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useEstilos from './useEstilos';
import {useTranslation} from 'react-i18next';

interface Props {
	open: boolean;
}

export const Tooltip: React.FC<Props> = ({open}) => {
	const {t} = useTranslation();
	const classes = useEstilos();

	return (
		<>
			{open && (
				<Box className={classes.container}>
					<Typography variant='caption' fontFamily='Open Sans' color='#000'>
						{t('tooltip.cambioPromocion')}
					</Typography>
				</Box>
			)}
		</>
	);
};
