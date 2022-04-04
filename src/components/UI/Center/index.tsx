import React from 'react';
import {Box} from '@mui/material';

const Center: React.FC = ({children}) => {
	return (
		<Box
			display='flex'
			justifyContent='center'
			alignItems='center'
			minHeight='100%'
		>
			{children}
		</Box>
	);
};

export default Center;
