import {List} from 'components/UI';
import {Box} from '@material-ui/core';
import {THeader, TPedidoClienteParaEnviar, TClienteActual} from 'models';
import {useTranslation} from 'react-i18next';
import {ItemListadoPedidosRealizados} from '..';
import {useObtenerClienteActual, useObtenerPedidosClientes} from 'redux/hooks';

const ListadoPedidosRealizados = () => {
	const {t} = useTranslation();
	const clienteActual: TClienteActual = useObtenerClienteActual();
	const pedidosClientes = useObtenerPedidosClientes();
	const pedidosClienteActual = pedidosClientes[clienteActual.codigoCliente];

	const Header = ({title}: {title: string}) => (
		<Box textAlign='center'>{title}</Box>
	);

	const headers: THeader[] = [
		{
			component: <Header title={t('general.tipoPedido')} />,
			width: 4,
		},
		{
			component: <Header title={t('general.fechaEntrega')} />,
			width: 4,
		},
		{
			component: <Header title={t('general.monto')} />,
			width: 4,
		},
	];

	return (
		<List
			headers={headers}
			items={pedidosClienteActual}
			ItemComponent={ItemListadoPedidosRealizados}
		/>
	);
};

export default ListadoPedidosRealizados;
