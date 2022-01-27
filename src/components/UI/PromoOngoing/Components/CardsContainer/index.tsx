import React from 'react';
import Box from '@mui/material/Box';

const CardsContainer: React.FC = ({children}) => {
	return (
		<Box display='flex' flexDirection='column' gap='8px'>
			{children}
		</Box>
	);
};

export default CardsContainer;
