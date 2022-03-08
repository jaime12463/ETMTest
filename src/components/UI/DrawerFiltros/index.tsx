import React from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Box from '@mui/material/Box';
import useEstilos from './useEstilos';

interface Props {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DrawerFiltros: React.FC<Props> = ({open, setOpen, children}) => {
	const classes = useEstilos();

	const toggleDrawer = (newOpen: boolean) => {
		setOpen(newOpen);
	};

	return (
		<SwipeableDrawer
			open={open}
			onOpen={() => toggleDrawer(true)}
			onClose={() => toggleDrawer(false)}
			disableSwipeToOpen
			anchor='right'
			transitionDuration={{enter: 450, exit: 450}}
			PaperProps={{
				style: {
					width: '266px',
					top: '111px',
					display: 'block',
					height: 'calc(100% - 111px)',
				},
			}}
			sx={{
				'& .MuiBackdrop-root, .MuiModal-backdrop': {top: '111px !important'},
			}}
		>
			<Box className={classes.content}>{children}</Box>
		</SwipeableDrawer>
	);
};

export default DrawerFiltros;
