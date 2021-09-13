import {useCallback, useState} from 'react';

export const useMostrarContenidoEnCajon = () => {
	const [mostrarCajon, setMostrarCajon] = useState({bottom: false});

	const [parametrosCajon, setParametrosCajon] = useState({});

	const toggleCajon = (anchor: string, open: boolean) => (event: any) => {
		if (
			event.type === 'keydown' &&
			(event.key === 'Tab' || event.key === 'Shift')
		) {
			return;
		}

		setMostrarCajon({...mostrarCajon, [anchor]: open});
	};

	const mostrarContenidoEnCajon = useCallback((children: any) => {
		{
			setParametrosCajon({children, toggleCajon});
		}
		setMostrarCajon({bottom: true});
	}, []);
	return {
		mostrarContenidoEnCajon,
		mostrarCajon,
		parametrosCajon,
		setMostrarCajon,
	};
};
