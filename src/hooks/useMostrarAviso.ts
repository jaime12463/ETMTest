import {useSnackbar} from 'notistack';

interface BotonesProps {
	izquierda: string;
	derecha: string;
}

export const useMostrarAviso = () => {
	const {enqueueSnackbar} = useSnackbar();

	const mostrarAviso = (
		tipo: 'default' | 'error' | 'success' | 'warning' | 'info',
		titulo: string,
		mensaje?: string,
		textoBotones?: BotonesProps,
		dataCy?: string
	) => {
		console.log('mensaje', mensaje);

		return enqueueSnackbar(
			JSON.stringify({titulo, mensaje, tipo, textoBotones, dataCy}),
			{
				variant: tipo,
			}
		);
	};
	return mostrarAviso;
};
