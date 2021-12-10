import React from 'react';
import Box from '@mui/material/Box';

export interface ContainerProps {}

export const Container: React.FC<ContainerProps> = ({children}) => {
	return (
		<Box
			border='1px solid #D9D9D9'
			borderRadius='4px 4px 0 0'
			overflow='hidden'
		>
			{children}
		</Box>
	);
};
