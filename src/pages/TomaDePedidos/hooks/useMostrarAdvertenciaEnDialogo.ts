import {Dispatch, SetStateAction, useCallback} from 'react';
import {Props as PropsDialogo} from 'components/Dialogo';

export const useMostrarAdvertenciaEnDialogo = (
	setMostarDialogo: Dispatch<SetStateAction<boolean>>,
	setParametrosDialogo: Dispatch<SetStateAction<PropsDialogo>>
) => {
	const mostrarAdvertenciaEnDialogo = useCallback(
		(
			mensaje: string,
			dataCy: string,
			manejadorClick?: (oprimioBotonAceptar: boolean) => void,
			textosBotonesDefault?: {aceptar: string; cancelar: string}
		) => {
			setParametrosDialogo({
				mensaje: mensaje,
				manejadorClick: manejadorClick
					? (oprimioBotonAceptar) => {
							manejadorClick(oprimioBotonAceptar);
							setMostarDialogo(false);
					  }
					: () => setMostarDialogo(false),
				conBotonCancelar: manejadorClick ? true : false,
				dataCy: dataCy,
				textosBotonesDefault: textosBotonesDefault,
			});
			setMostarDialogo(true);
		},
		[]
	);
	return mostrarAdvertenciaEnDialogo;
};
