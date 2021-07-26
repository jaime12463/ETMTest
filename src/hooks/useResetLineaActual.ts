import {Dispatch, SetStateAction, useCallback} from 'react';
import {UseFormSetValue} from 'react-hook-form';
import {TInputsFormularioAgregarProducto, TPrecioSinVigencia} from 'models';

export const useResetLineaActual = (
	setValue: UseFormSetValue<TInputsFormularioAgregarProducto>,
	setProductoActual: Dispatch<SetStateAction<TPrecioSinVigencia>>
) => {
	const resetLineaActual = () => {
		setProductoActual({
			codigoProductoConNombre: '',
			precioConImpuestoUnidad: 0,
			precioConImpuestoSubunidad: 0,
		});
		setValue('codigoProductoConNombre', '');
		setValue('productoABuscar', '');
		setValue('unidades', '');
		setValue('subUnidades', '');
		console.log('final');
	};
	return resetLineaActual;
};
