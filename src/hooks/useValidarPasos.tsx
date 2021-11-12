import React from 'react';
import {AvisoIcon} from 'assests/iconos';
import {Configuracion} from 'components/UI/Modal';
import {useTranslation} from 'react-i18next';
import {cambiarEstadoIniciativa} from 'redux/features/visitaActual/visitaActualSlice';
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

		return {
			error: iniciativasCanceladasSinMotivo,
			contenidoMensaje: {
				titulo: 'Iniciativas canceladas sin motivos',
				mensaje: 'Por favor, ingrese un motivo para cada iniciativa cancelada.',
				tituloBotonAceptar: 'Continuar',
				tituloBotonCancelar: 'Editar',
				callbackAceptar: () => {
					visitaActual.iniciativas.map((iniciativa) => {
						if (iniciativa.estado === 'cancelada' && iniciativa.motivo === '') {
							dispatch(
								cambiarEstadoIniciativa({
									codigoIniciativa: iniciativa.codigoIniciativa,
									estado: 'pendiente',
								})
							);
						}
					});
				},
				iconoMensaje: <AvisoIcon />,
			},
		};
	}

	return {error: false};
};
