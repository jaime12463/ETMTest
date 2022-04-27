import React from 'react';
import {Box, BoxProps} from '@mui/material';
import theme from 'theme';

interface Props extends BoxProps {
	color?: 'primary' | 'default';
	fullWidth?: boolean;
	selected?: boolean;
}

export const BotonSmall: React.FC<Props> = ({
	color = 'default',
	children,
	fullWidth = false,
	selected = false,
	sx,
	...props
}) => {
	return (
		<Box
			alignItems='center'
			border={
				color === 'primary'
					? `1px solid ${theme.palette.primary.main}`
					: `1px solid ${theme.palette.secondary.main}`
			}
			borderRadius='50px'
			component='button'
			display='flex'
			gap='4px'
			height='18px'
			justifyContent='center'
			padding='4px 12px'
			sx={{
				background: selected ? theme.palette.secondary.main : '#fff',
				cursor: 'pointer',
				transition: 'box-shadow 0.2s ease-in-out',
				'&:focus-visible': {
					boxShadow:
						color === 'primary'
							? `0 0 0 1px ${theme.palette.primary.main}`
							: `0 0 0 1px ${theme.palette.secondary.main}`,
					outline: 'none',
				},
				...sx,
			}}
			width={fullWidth ? '100%' : 'fit-content'}
			{...props}
		>
			{children}
		</Box>
	);
};
