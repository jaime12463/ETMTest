import React from 'react';
import Box from '@mui/material/Box';

export const Container: React.FC = ({children}) => {
	return (
		<Box borderRadius='4px 4px 0 0' overflow='hidden'>
			{children}
		</Box>
	);
};
