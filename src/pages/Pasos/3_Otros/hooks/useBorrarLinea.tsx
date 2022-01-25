import {useAppDispatch, useObtenerVisitaActual} from 'redux/hooks';
import {useCallback} from 'react';
import {borrarProductoDelPedidoActual} from 'redux/features/visitaActual/visitaActualSlice';
import {useMostrarAviso} from 'hooks';
import {TProductoPedido} from 'models';
import {useTranslation} from 'react-i18next';
import {AvisoIcon} from 'assests/iconos';

export const useBorrarLinea = (stateAlerta: any) => {
	const dispatch = useAppDispatch();
	const {t} = useTranslation();
	const visitaActual = useObtenerVisitaActual();
	const mostrarAviso = useMostrarAviso();
	const {setAlerta, setConfigAlerta} = stateAlerta;

	const borrarLinea = useCallback(
		(productoaBorrar: TProductoPedido) => {
			setConfigAlerta({
				titulo: t('advertencias.borrarLineaPedidosTitulo'),
				mensaje: t('advertencias.borrarLineaPedidosMensajeUnicoCanje'),
				tituloBotonAceptar: 'Aceptar',
				tituloBotonCancelar: 'Cancelar',
				callbackAceptar: () => {
					dispatch(
						borrarProductoDelPedidoActual({
							codigoProducto: productoaBorrar.codigoProducto,
							codigoTipoPedidoActual: 'canje',
						})
					);
					mostrarAviso(
						'success',
						t('advertencias.productoUnicoEliminadoTitulo'),
						undefined,
						undefined,
						'productoEliminado'
					);
				},
				callbackCancelar: () => {},
				iconoMensaje: <AvisoIcon />,
			});
			setAlerta(true);
		},
		[visitaActual.pedidos]
	);

	return borrarLinea;
};
