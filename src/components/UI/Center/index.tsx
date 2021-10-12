import React, {FunctionComponent} from 'react';
import {Box} from '@mui/material';

type Props = {};

const Center: FunctionComponent<Props> = (props) => {
	return (
		<Box
			display='flex'
			justifyContent='center'
			alignItems='center'
			minHeight='100%'
		>
			{props.children}
		</Box>
	);
};

export default Center;
