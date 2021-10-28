import {forwardRef, useCallback} from 'react';
import {useSnackbar, SnackbarContent} from 'notistack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import useEstilos from './useEstilos';
import {
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

interface BotonesProps {
	izquierda: string;
	derecha: string;
}

interface Props {
	id: string | number;
	message: string;
}

type TData = {
	tipo: 'default' | 'error' | 'success' | 'warning' | 'info';
	titulo: string;
	mensaje: string;
	textoBotones?: BotonesProps;
	dataCy?: string;
};

const AvisoContenido = forwardRef<HTMLDivElement, Props>(
	({id, message}, ref) => {
		const {closeSnackbar} = useSnackbar();

		const {mensaje, tipo, titulo, textoBotones}: TData = JSON.parse(message);

		const classes = useEstilos({tipo, conBotones: textoBotones ? true : false});

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
				icono = (
					<WarningTrianguloIcon
						height={textoBotones ? '31px' : '19px'}
						width={textoBotones ? '34px' : '21px'}
					/>
				);
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
							<Typography
								variant='subtitle3'
								sx={{
									marginTop: '4px',
									textAlign: textoBotones ? 'center' : 'left',
								}}
							>
								{titulo}
							</Typography>
							<Typography
								variant='caption'
								fontFamily='Open Sans'
								sx={{
									marginTop: '6px',
									textAlign: textoBotones ? 'center' : 'left',
								}}
							>
								{mensaje}
							</Typography>
						</Box>
					</Box>
					{!textoBotones && (
						<IconButton
							aria-label='close'
							onClick={handleDismiss}
							sx={{padding: '2px 5px 0 0'}}
						>
							<CruzCerrar />
						</IconButton>
					)}
					{textoBotones && (
						<Box className={classes.btn}>
							<Button
								variant='text'
								color='secondary'
								sx={{fontSize: '12px', padding: 0}}
								onClick={handleDismiss}
							>
								{textoBotones.izquierda}
							</Button>
							<Button
								variant='text'
								color='secondary'
								sx={{fontSize: '12px', padding: 0}}
							>
								{textoBotones.derecha}
							</Button>
						</Box>
					)}
				</Box>
			</SnackbarContent>
		);
	}
);

export default AvisoContenido;
