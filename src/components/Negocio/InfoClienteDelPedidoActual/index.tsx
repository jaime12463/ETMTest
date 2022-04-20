import {TClienteActual} from 'models';
import {useObtenerClienteActual} from 'redux/hooks';

export const InfoClienteDelPedidoActual: React.VFC = () => {
	const clienteActual: TClienteActual = useObtenerClienteActual();
	const {razonSocial} = clienteActual;
	return <>{razonSocial}</>;
};
