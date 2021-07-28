import {Dispatch, SetStateAction, useCallback} from 'react';
import {UseFormSetValue} from 'react-hook-form';
import {TInputsFormularioAgregarProducto, TPrecioSinVigencia} from 'models';

export const useResetLineaActual = (
	setValue: UseFormSetValue<TInputsFormularioAgregarProducto>,
	setProductoActual: Dispatch<SetStateAction<TPrecioSinVigencia>>
) => {
	const resetLineaActual = useCallback(() => {
		setProductoActual({
			codigoProductoConNombre: '',
			precioConImpuestoUnidad: 0,
			precioConImpuestoSubunidad: 0,
			codigoImplicito1: 0,
			nombreImplicito1: '',
			codigoImplicito2: 0,
			nombreImplicito2: '',
		});
		setValue('codigoProductoConNombre', '');
		setValue('unidades', '');
		setValue('subUnidades', '');
	}, []);
	return resetLineaActual;
};
