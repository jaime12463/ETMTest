import {Box, Typography} from '@mui/material';
import {
	CheckRedondoIcon,
	WarningTrianguloIcon,
	CerrarRedondoIcon,
} from 'assests/iconos';
import useEstilos from './useEstilos';
import theme from 'theme';
import React from 'react';

type TAviso = {
	tipo: 'default' | 'error' | 'success' | 'warning' | 'info';
	titulo: string;
	mensaje?: string;
	dataCy?: string;
};

type TAvisoTemplate = Omit<TAviso, 'tipo'>;

type TAvisoAcciones = {
	acciones: React.ReactNode;
};

export const AvisoPlantilla = ({tipo, titulo, mensaje, dataCy}: TAviso) => {
	let icono: any = null;
	const classes = useEstilos({tipo});
	switch (tipo) {
		case 'error':
			icono = (
				<CerrarRedondoIcon
					height='21px'
					fill={`${theme.palette.primary.main}`}
					width='21px'
				/>
			);
			break;
		case 'success':
			icono = (
				<CheckRedondoIcon
					height='21px'
					fill={`${theme.palette.success.main}`}
					width='21px'
				/>
			);
			break;
		case 'warning':
			icono = (
				<WarningTrianguloIcon
					height='19px' //{textoBotones ? '31px' : '19px'}
					width='21px' //{textoBotones ? '34px' : '21px'}
				/>
			);
			break;
		case 'default':
			icono = (
				<WarningTrianguloIcon
					height='19px' //{textoBotones ? '31px' : '19px'}
					width='21px' //{textoBotones ? '34px' : '21px'}
					fill={`${theme.palette.common.white}`}
				/>
			);
			break;
	}

	return (
		<Box width='350px' className={classes.container}>
			<Box className={classes.content}>
				{icono}
				<Box className={classes.text}>
					<Typography
						variant='subtitle3'
						sx={{
							marginTop: '4px',
							textAlign: 'left', // textoBotones ? 'center' : 'left',
						}}
					>
						{titulo}
					</Typography>
					<Typography
						variant='caption'
						fontFamily='Open Sans'
						sx={{
							marginTop: '6px',
							textAlign: 'left', //textoBotones ? 'center' : 'left',
						}}
					>
						{mensaje}
					</Typography>
				</Box>
			</Box>
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
	const classes = useEstilos({tipo: 'default', conBotones: false});
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
			<Box className={classes.containerDeshacer}>
				<Typography variant='caption' fontFamily='Open Sans' color='#fff'>
					{titulo}
				</Typography>
				{acciones}
			</Box>
		</Box>
	);
};
