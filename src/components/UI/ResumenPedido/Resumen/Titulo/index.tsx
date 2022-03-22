import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import theme from 'theme';
import {useTranslation} from 'react-i18next';

export interface TituloProps {
	background: string;
	label?: 'credito' | 'contado';
}

export const Titulo: React.FC<TituloProps> = ({
	children,
	background,
	label,
}) => {
	const {t} = useTranslation();

	return (
		<Box
			alignItems='center'
			display='flex'
			padding='14px 12px'
			sx={{background}}
			gap='40px'
		>
			<Typography variant='subtitle2' color='#fff'>
				{children}
			</Typography>
			{label && (
				<Typography
					borderRadius='50px'
					color='#fff'
					fontFamily='Open Sans'
					padding='4px 16px'
					sx={{
						background:
							label === 'credito'
								? theme.palette.success.dark
								: theme.palette.secondary.dark,
					}}
					variant='caption'
				>
					{label === 'credito' ? t('general.credito') : t('general.contado')}
				</Typography>
			)}
		</Box>
	);
};
