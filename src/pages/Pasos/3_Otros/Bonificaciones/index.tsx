import React from 'react';
import {Stack, Box, Typography} from '@mui/material';
import DesplegableBonificaciones from './DesplegableBonificaciones';
import {BotonSmall, Modal} from 'components/UI';
import {useObtenerBonificacionesHabilitadas} from 'hooks';
import {AvisoIcon, ReiniciarIcon} from 'assests/iconos';
import {useDispatch} from 'react-redux';
import {restablecerBonificaciones} from 'redux/features/visitaActual/visitaActualSlice';
import {useTranslation} from 'react-i18next';
import theme from 'theme';

interface Props {
	bonificacionValida: boolean;
}

const Bonificaciones: React.VFC<Props> = ({bonificacionValida}) => {
	const [expandido, setExpandido] = React.useState<boolean | string>(false);
	const [alerta, setAlerta] = React.useState<boolean>(false);
	const {t} = useTranslation();
	const [resetBonificaciones, setResetBonificaciones] =
		React.useState<boolean>(false);
	const bonificaciones = useObtenerBonificacionesHabilitadas();
	const bonificacionesHabilitadas = bonificaciones();
	const dispatch = useDispatch();

	const restablecerCantidades = () => {
		setResetBonificaciones((state) => !state);

		setTimeout(() => {
			setResetBonificaciones((state) => !state);
		}, 0);
		dispatch(restablecerBonificaciones());
	};

	return (
		<>
			<Modal
				alerta={alerta}
				setAlerta={setAlerta}
				contenidoMensaje={{
					titulo: t('modal.restablecerBonificacionesTitulo'),
					mensaje: t('modal.restablecerBonificacionesMensaje'),
					callbackAceptar: () => restablecerCantidades(),
					tituloBotonAceptar: t('general.aceptar'),
					tituloBotonCancelar: t('general.cancelar'),
					iconoMensaje: <AvisoIcon />,
				}}
			/>
			<Stack marginTop='18px' spacing='10px'>
				{bonificacionValida && (
					<Box display='flex' justifyContent='flex-end'>
						<BotonSmall
							onClick={() => setAlerta(true)}
							padding='4px 10px 4px 5px'
						>
							<ReiniciarIcon height={10} width={10} />
							<Typography
								variant='caption'
								fontFamily='Open Sans'
								color={theme.palette.secondary.main}
							>
								{t('general.restablecerCero')}
							</Typography>
						</BotonSmall>
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
