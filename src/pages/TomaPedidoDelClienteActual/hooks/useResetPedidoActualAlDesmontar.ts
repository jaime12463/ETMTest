import { useResetPedidoActual } from 'hooks';
import { useEffect } from 'react';

export const useResetPedidoActualAlDesmontar = () => {
    const resetPedidoActual = useResetPedidoActual();
	useEffect(() => {
		return () => {
			resetPedidoActual();
		}
	}, [])
}