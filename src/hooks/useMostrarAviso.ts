import { debug } from 'console';
import {OptionsObject, useSnackbar} from 'notistack';
import { useObtenerConfiguracion } from '../redux/hooks/useObtenerConfiguracion';

export const useMostrarAviso = () => {
	const {enqueueSnackbar} = useSnackbar();
	const {tiempoToastEnSegundos} = useObtenerConfiguracion();
debugger
	const mostrarAviso = (
		tipo: 'default' | 'error' | 'success' | 'warning' | 'info',
		titulo: string,
		mensaje?: string,
		opciones?: OptionsObject,
		dataCy?: string
	) => {
		const opcionesDefault: OptionsObject = {
			preventDuplicate: true,
			autoHideDuration: tiempoToastEnSegundos*1000,
			anchorOrigin: {
				vertical: 'top',
				horizontal: 'center',
			},
			variant: tipo,
		};

		const opcionesAviso = {
			...opcionesDefault,
			...opciones,
		};

		return enqueueSnackbar(
			JSON.stringify({titulo, mensaje, tipo, dataCy}),
			opcionesAviso
		);
	};

	return mostrarAviso;
};
