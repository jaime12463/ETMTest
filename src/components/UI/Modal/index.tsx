import React, {ReactNode} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import useEstilos from './useEstilos';

export interface Configuracion {
	titulo: string;
	mensaje: string | ReactNode;
	tituloBotonCancelar?: string;
	tituloBotonAceptar: string;
	callbackCancelar?: () => void;
	callbackAceptar: () => void;
	iconoMensaje?: ReactNode;
}

interface Props {
	setPasoActual?: React.Dispatch<React.SetStateAction<number>>;
	alerta: boolean;
	setAlerta: React.Dispatch<React.SetStateAction<boolean>>;
	contenidoMensaje?: Configuracion;
}

const Modal: React.FC<Props> = ({
	setPasoActual,
	alerta,
	setAlerta,
	contenidoMensaje,
}) => {
	const classes = useEstilos({alerta});

	return (
		<>
			{alerta && (
				<Box className={classes.container}>
					<Box className={classes.card}>
						{contenidoMensaje?.iconoMensaje && (
							<Box className={classes.icon}>
								{contenidoMensaje?.iconoMensaje}
							</Box>
						)}
						<Box className={classes.text} marginBottom='12px'>
							<Typography
								fontFamily='Open Sans'
								fontWeight='700'
								fontSize='14px'
								sx={{opacity: 0.7}}
							>
								{contenidoMensaje?.titulo}
							</Typography>
						</Box>
						<Box className={classes.text} marginBottom='24px'>
							<Typography variant='body3'>
								{contenidoMensaje?.mensaje}
							</Typography>
						</Box>
						<Box className={classes.btnContainer}>
							{contenidoMensaje?.tituloBotonCancelar !== undefined && (
								<button
									className={`${classes.btnAceptar} ${classes.btnCancelar}`}
									onClick={() => {
										contenidoMensaje?.callbackCancelar &&
											contenidoMensaje?.callbackCancelar();
										setAlerta((prevAlerta) => !prevAlerta);
									}}
								>
									<Typography variant='subtitle3' fontFamily='Open Sans'>
										{contenidoMensaje?.tituloBotonCancelar}
									</Typography>
								</button>
							)}
							<button
								className={classes.btnAceptar}
								onClick={() => {
									contenidoMensaje?.callbackAceptar();
									setPasoActual?.((pasoActual) => pasoActual + 1);
									setAlerta((prevAlerta) => !prevAlerta);
								}}
							>
								<Typography variant='subtitle3' fontFamily='Open Sans'>
									{contenidoMensaje?.tituloBotonAceptar}
								</Typography>
							</button>
						</Box>
					</Box>
				</Box>
			)}
		</>
	);
};

export default Modal;
