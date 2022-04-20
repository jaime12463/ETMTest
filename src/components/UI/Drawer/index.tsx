import React from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Box from '@mui/material/Box';
import useEstilos from './useEstilos';

interface Props {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	titulo: React.ReactNode | string;
}

export const Drawer: React.FC<Props> = ({open, setOpen, titulo, children}) => {
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
			anchor='bottom'
			transitionDuration={{enter: 450, exit: 450}}
			PaperProps={{style: {minHeight: '100%'}}}
		>
			<Box className={classes.title}>
				<Box className={classes.puller} />
				{titulo}
			</Box>
			<Box display='flex' justifyContent='center' width='100%'>
				<Box className={classes.content}>{children}</Box>
			</Box>
		</SwipeableDrawer>
	);
};
