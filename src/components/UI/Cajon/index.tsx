import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import {useEstilos} from './useEstilos';

type Props = {
	children: React.ReactNode;
	toggleCajon: Function;
};

const Cajon = ({children, toggleCajon}: Props) => {
	const classes = useEstilos();

	const funcionprueba = () => children;

	return (
		<React.Fragment>
			<Drawer
				variant='temporary'
				anchor='bottom'
				open={true}
				onClose={toggleCajon('bottom', false)}
				classes={{paper: classes.drawerPaper}}
			>
				{funcionprueba()}
			</Drawer>
		</React.Fragment>
	);
};

export default Cajon;
