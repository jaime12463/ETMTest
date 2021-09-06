import {Dispatch, SetStateAction} from 'react';
import {UseFormSetValue} from 'react-hook-form';
import {TFormTomaDePedido, TPrecioProducto} from 'models';

export const useResetLineaActual = (
	setValue: UseFormSetValue<TFormTomaDePedido>,
	setProductoActual: Dispatch<SetStateAction<TPrecioProducto | null>>
) => {
	const resetLineaActual = () => {
		setProductoActual(null);
		setValue('productoABuscar', '');
		setValue('unidades', '');
		setValue('subUnidades', '');
		setValue('catalogoMotivo', '');
	};
	return resetLineaActual;
};
