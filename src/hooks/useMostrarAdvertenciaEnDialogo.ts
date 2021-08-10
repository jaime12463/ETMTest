import {useCallback, useState} from 'react';
import {Props as PropsDialogo} from 'components/UI/Dialogo';

export const useMostrarAdvertenciaEnDialogo = () => {
	const [mostarDialogo, setMostarDialogo] = useState<boolean>(false);

	const [parametrosDialogo, setParametrosDialogo] = useState<PropsDialogo>({
		mensaje: '',
		manejadorClick: () => {},
		conBotonCancelar: false,
		dataCy: '',
	});
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
	return {mostrarAdvertenciaEnDialogo, mostarDialogo, parametrosDialogo};
};
