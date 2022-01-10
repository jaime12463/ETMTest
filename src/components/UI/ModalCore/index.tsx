import React from 'react';
import Box from '@mui/material/Box';
import useEstilos from './useEstilos';

interface Props {
	open: boolean;
	borderRadius?: boolean;
}

const ModalCore: React.FC<Props> = ({open, borderRadius = false, children}) => {
	const classes = useEstilos({open, borderRadius});
	return (
		<>
			{open && (
				<Box className={classes.container}>
					<Box className={classes.card}>{children}</Box>
				</Box>
			)}
		</>
	);
};

export default ModalCore;
