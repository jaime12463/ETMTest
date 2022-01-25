import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
	CheckRedondoIcon,
	CerrarRedondoIcon,
	AvisoIcon,
	CerrarIcon,
} from 'assests/iconos';
import useEstilos from './useEstilos';
import {useSnackbar} from 'notistack';

type TAviso = {
	tipo: 'default' | 'error' | 'success' | 'warning' | 'info';
	titulo: string;
	mensaje?: string;
	dataCy?: string;
	id: string | number;
};

type TAvisoTemplate = Omit<TAviso, 'tipo'>;

type TAvisoAcciones = {
	acciones: React.ReactNode;
};

export const AvisoPlantilla = ({tipo, titulo, mensaje, id, dataCy}: TAviso) => {
	let icono: any = null;
	const classes = useEstilos({tipo});
	const {closeSnackbar} = useSnackbar();

	switch (tipo) {
		case 'error':
			icono = <CerrarRedondoIcon height='21px' width='21px' />;
			break;
		case 'success':
			icono = <CheckRedondoIcon height='21px' width='21px' />;
			break;
		case 'warning':
			icono = <AvisoIcon height='23px' width='23px' />;
			break;
		case 'default':
			icono = <AvisoIcon height='23px' width='23px' />;
			break;
	}

	return (
		<Box className={classes.container}>
			<Box className={classes.icon}>{icono}</Box>
			<Typography
				variant='subtitle3'
				fontFamily='Open Sans'
				className={classes.titulo}
			>
				{titulo}
			</Typography>
			<Typography
				variant='caption'
				fontFamily='Open Sans'
				color='#000'
				className={classes.mensaje}
			>
				{mensaje}
			</Typography>

			<CerrarIcon
				height={24}
				width={24}
				className={classes.cerrarIcon}
				onClick={() => closeSnackbar(id)}
			/>
		</Box>
	);
};

export const AvisoError = (props: TAvisoTemplate) => {
	return <AvisoPlantilla tipo='error' {...props} />;
};

export const AvisoDeshacer: React.FC<TAvisoTemplate & TAvisoAcciones> = ({
	titulo,
	mensaje,
	dataCy,
	acciones,
}) => {
	const classes = useEstilos({tipo: 'default'});
	return (
		<Box
			display='flex'
			justifyContent='center'
			width='340px'
			position='fixed'
			bottom='50px'
			left='calc(50% - 170px)'
			right='unset'
		>
			<Box>
				<Typography variant='caption' fontFamily='Open Sans' color='#fff'>
					{titulo}
				</Typography>
				{acciones}
			</Box>
		</Box>
	);
};
