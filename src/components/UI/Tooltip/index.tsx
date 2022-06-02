import React from 'react';
import {Box, BoxProps} from '@mui/material';
import useEstilos from './useEstilos';
import {useTranslation} from 'react-i18next';

interface Props extends BoxProps {
	direccionFlechaHorizontal: string;
	colorScheme: 'secondary' | 'warning';
	open: boolean;
}

export const Tooltip: React.FC<Props> = ({
	direccionFlechaHorizontal,
	children,
	colorScheme,
	open,
	...props
}) => {
	const {t} = useTranslation();
	const classes = useEstilos({direccionFlechaHorizontal, colorScheme});

	return (
		<>
			{open && (
				<Box className={classes.container} {...props}>
					{children}
				</Box>
			)}
		</>
	);
};
