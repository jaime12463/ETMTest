import {OptionsObject, useSnackbar} from 'notistack';

export const useMostrarAviso = () => {
	const {enqueueSnackbar} = useSnackbar();

	const mostrarAviso = (
		tipo: 'default' | 'error' | 'success' | 'warning' | 'info',
		titulo: string,
		mensaje?: string,
		opciones?: OptionsObject,
		dataCy?: string
	) => {
		const opcionesDefault: OptionsObject = {
			preventDuplicate: true,
			autoHideDuration: 3000,
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
