import React, {ReactNode} from 'react';
import ReactDOM from 'react-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
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
	alerta: boolean;
	contenidoMensaje?: Configuracion;
	setAlerta: React.Dispatch<React.SetStateAction<boolean>>;
	setPasoActual?: React.Dispatch<React.SetStateAction<number>>;
}

export const Modal: React.VFC<Props> = ({
	alerta,
	contenidoMensaje,
	setAlerta,
	setPasoActual,
}) => {
	const classes = useEstilos();

	const modalPortal = document.getElementById('modal');

	if (!modalPortal) return null;

	return ReactDOM.createPortal(
		<>
			{alerta && (
				<Box className={classes.container}>
					<Box className={classes.card}>
						{contenidoMensaje?.iconoMensaje && (
							<Box className={classes.icon}>
								{contenidoMensaje?.iconoMensaje}
							</Box>
						)}
						<Box className={classes.text} marginBottom='10px'>
							<Typography
								fontFamily='Open Sans'
								fontWeight='700'
								fontSize='14px'
								color='rgba(0, 0, 0, 0.70)'
							>
								{contenidoMensaje?.titulo}
							</Typography>
						</Box>
						<Box className={classes.text} marginBottom='20px'>
							<Typography
								variant='body3'
								fontFamily='Open Sans'
								color='#565657'
							>
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
									setPasoActual?.((pasoActual) =>
										pasoActual === 3 ? pasoActual : pasoActual + 1
									);
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
		</>,
		modalPortal
	);
};
