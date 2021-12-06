import {AvisoIcon} from 'assests/iconos';
import {Configuracion} from 'components/UI/Modal';
import {useTranslation} from 'react-i18next';
import {
	borrarProductoDelPedidoActual,
	cambiarEstadoIniciativa,
	cambiarSeQuedaAEditar,
} from 'redux/features/visitaActual/visitaActualSlice';
import {useAppDispatch, useObtenerVisitaActual} from 'redux/hooks';

interface ValidarPasos {
	error: boolean;
	contenidoMensaje?: Configuracion;
}

export const useValidarPasos = (pasoActual: number): ValidarPasos => {
	const {t} = useTranslation();
	const visitaActual = useObtenerVisitaActual();
	const {venta} = visitaActual.pedidos;
	const dispatch = useAppDispatch();

	if (pasoActual === 0) {
		const iniciativasCanceladasSinMotivo = visitaActual.iniciativas.some(
			(iniciativa) =>
				iniciativa.estado === 'cancelada' && iniciativa.motivo === ''
		);

		if (iniciativasCanceladasSinMotivo) {
			return {
				error: iniciativasCanceladasSinMotivo,
				contenidoMensaje: {
					titulo: t('titulos.tituloIniciativasSinMotivo'),
					mensaje: t('advertencias.mensajeIniciativasSinMotivo'),
					tituloBotonAceptar: t('general.continuar'),
					tituloBotonCancelar: t('general.editar'),
					callbackAceptar: () => {
						visitaActual.iniciativas.map((iniciativa) => {
							if (
								iniciativa.estado === 'cancelada' &&
								iniciativa.motivo === ''
							) {
								dispatch(
									cambiarEstadoIniciativa({
										codigoIniciativa: iniciativa.idActividadIniciativa,
										estado: 'pendiente',
									})
								);
								dispatch(
									cambiarSeQuedaAEditar({seQueda: false, bordeError: false})
								);
							}
						});
					},
					callbackCancelar: () => {
						dispatch(cambiarSeQuedaAEditar({seQueda: true, bordeError: true}));
					},
					iconoMensaje: <AvisoIcon />,
				},
			};
		}
	}

	if (pasoActual === 1) {
		const productosSinModificar = venta.productos.some(
			(producto) => producto.unidades === 0 && producto.subUnidades === 0
		);

		if (productosSinModificar) {
			return {
				error: productosSinModificar,
				contenidoMensaje: {
					titulo: t('titulos.tituloProductosSinCargar'),
					mensaje: t('advertencias.mensajeProductosSinCargar'),
					tituloBotonAceptar: t('general.avanzar'),
					tituloBotonCancelar: t('general.editarCantidades'),
					callbackAceptar: () => {
						venta.productos.map((producto) => {
							if (producto.unidades === 0 && producto.subUnidades === 0) {
								dispatch(
									borrarProductoDelPedidoActual({
										codigoProducto: producto.codigoProducto,
									})
								);
							}
						});
						dispatch(
							cambiarSeQuedaAEditar({seQueda: false, bordeError: false})
						);
					},
					callbackCancelar: () => {
						dispatch(cambiarSeQuedaAEditar({seQueda: true, bordeError: true}));
					},
					iconoMensaje: <AvisoIcon />,
				},
			};
		}
	}

	return {error: false};
};
