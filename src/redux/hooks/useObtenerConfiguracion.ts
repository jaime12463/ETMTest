import {TConfiguracion} from 'models';
import {useAppSelector} from 'redux/hooks';
import {selectConfiguracion} from 'redux/features/configuracion/configuracionSlice';

export const useObtenerConfiguracion = (): TConfiguracion => {
	const {
		datos: {configuraciones},
	} = useAppSelector(selectConfiguracion);

	const configuracion: TConfiguracion = configuraciones;

	const tipoPedidoEnvasesHabilitadosMiniscula =
		configuracion.tipoPedidoEnvasesHabilitados.map((el) => el.toLowerCase());

	const tipoPedidosMiniscula = configuracion.tipoPedidos.map((el) => ({
		...el,
		codigo: el.codigo.toLowerCase(),
		descripcion: el.descripcion.toLowerCase(),
		descripcionCorta: el.descripcionCorta.toLowerCase(),
	}));

	return {
		...configuracion,
		tipoPedidoEnvasesHabilitados: tipoPedidoEnvasesHabilitadosMiniscula,
		tipoPedidos: tipoPedidosMiniscula,
	};
};
