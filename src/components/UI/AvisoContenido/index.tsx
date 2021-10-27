import {forwardRef, useCallback} from 'react';
import {useSnackbar, SnackbarContent} from 'notistack';
import {
	Card,
	CardHeader,
	CardActions,
	Typography,
	IconButton,
	Box,
} from '@mui/material';
import useEstilos from './useEstilos';
import {
	AvisoIcon,
	CheckRedondoIcon,
	CruzCerrar,
	WarningTrianguloIcon,
} from 'assests/iconos';
import theme from 'theme';

const colorbg: any = {
	succes: 'success.light',
	error: 'primary.light',
	warning: 'warning.light',
	info: 'info.light',
	default: 'greys.light',
};

interface Props {
	id: string | number;
	message: string;
}

type TData = {
	tipo: 'default' | 'error' | 'success' | 'warning' | 'info';
	titulo: string;
	mensaje: string;
};
const AvisoContenido = forwardRef<HTMLDivElement, Props>(
	({id, message}, ref) => {
		const {closeSnackbar} = useSnackbar();

		const {mensaje, tipo, titulo}: TData = JSON.parse(message);

		const classes = useEstilos({tipo});

		const handleDismiss = useCallback(() => {
			closeSnackbar(id);
		}, [id, closeSnackbar]);

		let icono: any = null;

		switch (tipo) {
			case 'error':
				icono = (
					<CheckRedondoIcon
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
				icono = <WarningTrianguloIcon />;
				break;
			default:
				throw new Error('Tipo de aviso no soportado');
		}

		return (
			<SnackbarContent ref={ref}>
				<Box width='350px' className={classes.container}>
					<Box className={classes.content}>
						{icono}
						<Box className={classes.text}>
							<Typography variant='subtitle3'>{titulo}</Typography>
							<Typography variant='caption' fontFamily='Open Sans'>
								{mensaje}
							</Typography>
						</Box>
					</Box>
					<IconButton aria-label='close' onClick={handleDismiss}>
						<CruzCerrar />
					</IconButton>
				</Box>
			</SnackbarContent>
		);
	}
);

export default AvisoContenido;
