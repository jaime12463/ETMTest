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
	contenidoMensajeModal?: Configuracion;
	contenidoMensajeAviso?: {
		tipo: 'default' | 'error' | 'success' | 'warning' | 'info';
		titulo: string;
		mensaje?: string;
		opciones?: any;
		dataCy?: string;
	};
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
				contenidoMensajeAviso: {
					tipo: 'error',
					titulo: 'Iniciativa cancelada sin motivo',
					mensaje: 'ingrese un motivo para la iniciativa cancelada',
					opciones: undefined,
					dataCy: 'clienteNoPortafolio',
				},
			};
		}
	}

	if (pasoActual === 1) {
		const productosSinModificar = venta?.productos?.some(
			(producto) => producto.unidades === 0 && producto.subUnidades === 0
		);

		if (productosSinModificar) {
			return {
				error: productosSinModificar,
				contenidoMensajeModal: {
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
