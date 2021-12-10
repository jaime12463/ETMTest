import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import DesplegableBonificaciones from './DesplegableBonificaciones';
import Stack from '@mui/material/Stack';
import Modal from 'components/UI/Modal';
import useEstilos from './useEstilos';
import {useObtenerBonificacionesHabilitadas} from 'hooks';
import {AvisoIcon, ReiniciarIcon} from 'assests/iconos';
import {useDispatch} from 'react-redux';
import {restablecerBonificaciones} from 'redux/features/visitaActual/visitaActualSlice';
interface Props {
	bonificacionValida: boolean;
}

const Bonificaciones: React.FC<Props> = ({bonificacionValida}) => {
	const [expandido, setExpandido] = React.useState<boolean | string>(false);
	const [alerta, setAlerta] = React.useState<boolean>(false);
	const [resetBonificaciones, setResetBonificaciones] =
		React.useState<boolean>(false);
	const bonificaciones = useObtenerBonificacionesHabilitadas();
	const bonificacionesHabilitadas = bonificaciones();
	const classes = useEstilos();
	const dispatch = useDispatch();

	const restablecerCantidades = () => {
		setResetBonificaciones((prev) => !prev);

		setTimeout(() => {
			setResetBonificaciones((prev) => !prev);
		}, 500);
		dispatch(restablecerBonificaciones());
	};

	return (
		<>
			<Modal
				alerta={alerta}
				setAlerta={setAlerta}
				contenidoMensaje={{
					titulo: '¿Restablecer cantidades a cero?',
					mensaje: '¿Está seguro que desea restablecer las cantidades a cero?',
					callbackAceptar: () => restablecerCantidades(),
					tituloBotonAceptar: 'Restablecer',
					tituloBotonCancelar: 'Cancelar',
					iconoMensaje: <AvisoIcon />,
				}}
			/>
			<Stack marginTop='18px' spacing='10px'>
				{bonificacionValida && (
					<Box display='flex' justifyContent='end'>
						<Chip
							className={classes.chip}
							size='small'
							icon={<ReiniciarIcon width='10px' height='10px' />}
							label={
								<Typography variant='caption' fontFamily='Open Sans'>
									Restablecer cantidades a cero
								</Typography>
							}
							onClick={() => setAlerta(true)}
						/>
					</Box>
				)}
				{bonificacionesHabilitadas?.map((bonificacion) => (
					<DesplegableBonificaciones
						expandido={expandido}
						setExpandido={setExpandido}
						id={bonificacion.idBonificacion.toString()}
						key={bonificacion.idBonificacion}
						nombre={bonificacion.nombreBonificacion}
						grupos={bonificacion.gruposBonificacion}
						vigenciaInicioBonificacion={bonificacion.vigenciaInicioBonificacion}
						vigenciaFinBonificacion={bonificacion.vigenciaFinBonificacion}
						aplicacionBonificacion={bonificacion.aplicacionBonificacion}
						resetBonificaciones={resetBonificaciones}
					/>
				))}
			</Stack>
		</>
	);
};

export default Bonificaciones;
