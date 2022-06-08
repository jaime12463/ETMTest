import {Box, IconButton, SwipeableDrawer} from '@mui/material';
import useEstilos from './useEstilos';
import {CerrarIcon} from 'assests/iconos';

export interface DrawerConfig {
	height: string;
	puller: boolean;
}

interface Props {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	titulo: React.ReactNode | string;
	config?: DrawerConfig;
}

export const Drawer: React.FC<Props> = ({
	children,
	config: {height, puller} = {height: '100%', puller: true},
	open,
	setOpen,
	titulo,
}) => {
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
			PaperProps={{sx: {height, overflowY: 'unset'}}}
		>
			<Box
				className={classes.title}
				sx={{
					'&::before': {
						backgroundColor: '#E5E5E5',
						content: "''",
						borderRadius: 3,
						height: '4px',
						left: '50%',
						position: 'absolute',
						transform: 'translateX(-50%)',
						top: '8px',
						width: '153px',
						opacity: puller ? 1 : 0,
					},
				}}
			>
				{!puller && (
					<IconButton
						onClick={() => toggleDrawer(false)}
						sx={{
							alignSelf: 'flex-end',
							marginBottom: '2px',
							marginTop: '16px',
							padding: 0,
						}}
					>
						<CerrarIcon fill='#fff' />
					</IconButton>
				)}
				{titulo}
			</Box>
			<Box className={classes.content}>{children}</Box>
		</SwipeableDrawer>
	);
};
