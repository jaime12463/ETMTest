import React from 'react';
import {Drawer} from '@mui/material';
import {useEstilos} from './useEstilos';

interface Props {
	toggleCajon: Function;
}

export const Cajon: React.FC<Props> = ({children, toggleCajon}) => {
	const classes = useEstilos();

	const funcionprueba = () => children;

	return (
		<>
			<Drawer
				variant='temporary'
				anchor='bottom'
				open={true}
				onClose={toggleCajon('bottom', false)}
				classes={{paper: classes.drawerPaper}}
			>
				{funcionprueba()}
			</Drawer>
		</>
	);
};
