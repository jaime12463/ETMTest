import {Snackbar, Button} from '@mui/material';
import React, {useState} from 'react';

type Props = {
	stateOpen: any;
};

export const NotificacionBorrado = (props: Props) => {
	const {stateOpen} = props;
	const {openNotificacion, setOpenNotificacion} = stateOpen;

	const handleClick = () => {
		setOpenNotificacion(true);
	};

	const handleClose = (
		event: React.SyntheticEvent | React.MouseEvent,
		reason?: string
	) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpenNotificacion(false);
	};

	const action = (
		<>
			<Button color='secondary' size='small' onClick={handleClose}>
				Deshacer
			</Button>
		</>
	);

	return (
		<>
			<Snackbar
				open={openNotificacion}
				autoHideDuration={6000}
				onClose={handleClose}
				message='Tarjeta Eliminada'
				action={action}
			/>
		</>
	);
};
