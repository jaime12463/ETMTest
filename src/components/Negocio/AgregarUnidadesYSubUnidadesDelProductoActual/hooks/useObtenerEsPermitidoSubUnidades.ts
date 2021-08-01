import {useEffect, useState} from 'react';
import {useValidarProductoPermiteSubUnidades} from '.';
import {TPrecioProducto} from 'models';

const useObtenerEsPermitidoSubUnidades = (
	productoActual: TPrecioProducto | null
) => {
	const [esPermitidoSubUnidades, setEsPermitidoSubUnidades] = useState<boolean>(
		false
	);
	const validarProductoPermiteSubUnidades = useValidarProductoPermiteSubUnidades();

	useEffect(() => {
		const esValidoPermiteSubUnidades: boolean = validarProductoPermiteSubUnidades(
			productoActual?.esVentaSubunidades ?? false
		);
		setEsPermitidoSubUnidades(esValidoPermiteSubUnidades);
	}, [productoActual]);

	return esPermitidoSubUnidades;
};

export default useObtenerEsPermitidoSubUnidades;
