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
	const esVentaSubunidades =
		productoActual?.esVentaSubunidades === 'true' ? true : false;

	useEffect(() => {
		const esValidoPermiteSubUnidades: boolean = validarProductoPermiteSubUnidades(
			esVentaSubunidades
		);
		setEsPermitidoSubUnidades(esValidoPermiteSubUnidades);
	}, [productoActual]);

	return esPermitidoSubUnidades;
};

export default useObtenerEsPermitidoSubUnidades;
