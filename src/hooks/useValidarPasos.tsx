import {AvisoIcon} from 'assests/iconos';
import {Configuracion} from 'components/UI/Modal';
import {useTranslation} from 'react-i18next';
import {
	borrarProductoDelPedidoActual,
	cambiarEstadoIniciativa,
	cambiarSeQuedaAEditar,
} from 'redux/features/visitaActual/visitaActualSlice';
import {useAppDispatch, useObtenerVisitaActual} from 'redux/hooks';
import {useMostrarAviso} from './useMostrarAviso';

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
	const mostrarAviso = useMostrarAviso();

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

	if (pasoActual === 2) {
		const CanjeSinMotivo = visitaActual.pedidos.canje.productos.some(
			(producto) => producto.catalogoMotivo === ''
		);
		//TODO IDIOMA

		if (CanjeSinMotivo) {
			return {
				error: CanjeSinMotivo,
				contenidoMensajeAviso: {
					tipo: 'error',
					titulo: 'Canje sin motivo',
					mensaje: 'Es necesario agregar el motivo del canje',
					opciones: undefined,
					dataCy: 'canjeSinMotivo',
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
						mostrarAviso(
							'success',
							'Cambios guardados con exitosamente',
							undefined,
							undefined,
							'successpaso2'
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
