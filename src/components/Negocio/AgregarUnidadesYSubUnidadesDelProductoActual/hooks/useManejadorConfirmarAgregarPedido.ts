import {TInputsFormularioAgregarProducto, TPrecioSinVigencia} from 'models';
import {useCallback} from 'react';
import {UseFormGetValues} from 'react-hook-form';

export const useManejadorConfirmarAgregarPedido = () => {
	const manejadorConfirmarAgregarPedido = (
		oprimioBotonAceptar: boolean
	): boolean => {
		return oprimioBotonAceptar;
	};
	return manejadorConfirmarAgregarPedido;
};
