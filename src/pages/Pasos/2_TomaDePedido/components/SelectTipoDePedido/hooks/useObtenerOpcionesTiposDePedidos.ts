import {useObtenerClienteActual, useObtenerConfiguracion} from 'redux/hooks';
import {TClienteActual, TOpcionSelect} from 'models';
import {useObtenerDatosCliente} from 'hooks';

export const useObtenerOpcionesTiposDePedidos = (): TOpcionSelect[] => {
	const configuracion = useObtenerConfiguracion();
	const clienteActual: TClienteActual = useObtenerClienteActual();
	const {datosCliente} = useObtenerDatosCliente(clienteActual.codigoCliente);

	const tiposPedidos = configuracion.tipoPedidos
		.map((x) => x)
		.sort((a, b) => a.secuencia - b.secuencia);

	let opcionesTiposDePedidos: TOpcionSelect[] = [];

	tiposPedidos.forEach((tipoPedido) => {
		{
			opcionesTiposDePedidos.push({
				value: tipoPedido.codigo.toString(),
				label: tipoPedido.descripcion,
			});
		}
	});

	return opcionesTiposDePedidos;
};
