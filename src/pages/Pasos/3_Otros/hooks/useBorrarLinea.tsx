import {
	useAppDispatch,
	useObtenerVisitaActual,
} from 'redux/hooks';
import {useCallback} from 'react';
import {
	borrarProductoDelPedidoActual,
} from 'redux/features/visitaActual/visitaActualSlice';
import {
	useMostrarAviso,
} from 'hooks';
import {TProductoPedido} from 'models';
import {useTranslation} from 'react-i18next';

export const useBorrarLinea = (
) => {
	const dispatch = useAppDispatch();
	const {t} = useTranslation();
	const visitaActual = useObtenerVisitaActual();
	const mostrarAviso = useMostrarAviso();

	const borrarLinea = useCallback((productoaBorrar: TProductoPedido) => {
		dispatch(
			borrarProductoDelPedidoActual({
				codigoProducto: productoaBorrar.codigoProducto,
				codigoTipoPedidoActual: 'canje'
			})
		);
		mostrarAviso(
			'success',
			t('advertencias.productoUnicoEliminadoTitulo'),
			undefined,
			undefined,
			'productoEliminado'
		);
	}, [visitaActual.pedidos]);

	return borrarLinea;
};
