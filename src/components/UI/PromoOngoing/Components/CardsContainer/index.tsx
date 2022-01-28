import React from 'react';
import Box from '@mui/material/Box';

export const CardsContainer: React.FC = ({children}) => {
	return (
		<Box display='flex' flexDirection='column' gap='8px'>
			{children}
		</Box>
	);
};
