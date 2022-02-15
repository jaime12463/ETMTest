import React from 'react';
import ReactDOM from 'react-dom';
import Box from '@mui/material/Box';
import useEstilos from './useEstilos';

interface Props {
	open: boolean;
	borderRadius?: boolean;
}

const ModalCore: React.FC<Props> = ({open, borderRadius = false, children}) => {
	const classes = useEstilos({borderRadius});

	const modalPortal = document.getElementById('modal');

	if (!modalPortal) return null;

	return ReactDOM.createPortal(
		<>
			{open && (
				<Box className={classes.container}>
					<Box className={classes.card}>{children}</Box>
				</Box>
			)}
		</>,
		modalPortal
	);
};

export default ModalCore;
