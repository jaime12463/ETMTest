import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	drawerPaper: {
		height: '90vh',
		borderRadius: '8px 8px 0px 0px',
		overflow: 'hidden',
	},
}));

const Cajon = ({children, toggleCajon}: any) => {
	const classes = useStyles();

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
