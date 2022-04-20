import {useCallback, useState} from 'react';
import {PropsDialogo} from 'components/UI';

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
			manejadorClick?: (oprimioBotonAceptar: boolean, data?: any) => void,
			textosBotonesDefault?: {aceptar: string; cancelar: string},
			textoInput?: string,
			titulo?: string
		) => {
			setParametrosDialogo({
				mensaje: mensaje,
				manejadorClick: manejadorClick
					? (oprimioBotonAceptar, data) => {
							manejadorClick(oprimioBotonAceptar, data);
							setMostarDialogo(false);
					  }
					: () => setMostarDialogo(false),
				conBotonCancelar: manejadorClick ? true : false,
				dataCy: dataCy,
				textosBotonesDefault: textosBotonesDefault,
				textoInput: textoInput,
				titulo: titulo,
			});
			setMostarDialogo(true);
		},
		[]
	);
	return {
		mostrarAdvertenciaEnDialogo,
		mostarDialogo,
		parametrosDialogo,
		setMostarDialogo,
	};
};
