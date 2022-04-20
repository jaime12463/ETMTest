import React from 'react';
import ReactDOM from 'react-dom';
import Box from '@mui/material/Box';
import useEstilos from './useEstilos';

interface Props {
	open: boolean;
}

export const ModalCore: React.FC<Props> = ({open, children}) => {
	const classes = useEstilos();

	const modalPortal = document.getElementById('modal');

	if (!modalPortal) return null;

	return ReactDOM.createPortal(
		<>
			{open && (
				<Box className={classes.container}>
					<Box className={classes.card}>
						{children}
						<Box
							sx={{
								background: 'transparent',
								width: '340px',
								height: '8px',
							}}
						/>
					</Box>
				</Box>
			)}
		</>,
		modalPortal
	);
};
