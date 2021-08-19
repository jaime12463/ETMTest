import {List} from 'components/UI';
import {Box} from '@material-ui/core';
import {THeader, TClienteActual, TCliente} from 'models';
import {useTranslation} from 'react-i18next';
import {ItemListadoDocumentos} from '..';
import {useObtenerDatosCliente} from 'hooks';
import {useObtenerClienteActual, useObtenerPedidosClientes} from 'redux/hooks';

const ListadoDocumentos = () => {
	const {t} = useTranslation();
	const {obtenerDatosCliente} = useObtenerDatosCliente();
	const clienteActual: TClienteActual = useObtenerClienteActual();
	const datosCliente: TCliente | undefined = obtenerDatosCliente(
		clienteActual.codigoCliente
	);
	const documentosClienteActual =
		datosCliente?.informacionCrediticia.documentos;

	const Header = ({title}: {title: string}) => (
		<Box textAlign='center'>{title}</Box>
	);

	const headers: THeader[] = [
		{
			component: <Header title={t('general.documento')} />,
			width: 4,
		},
		{
			component: <Header title={t('general.vencimiento')} />,
			width: 4,
		},
		{
			component: <Header title={t('general.saldo')} />,
			width: 4,
		},
	];

	return (
		<List
			headers={headers}
			items={
				documentosClienteActual !== undefined ? documentosClienteActual : []
			}
			ItemComponent={ItemListadoDocumentos}
		/>
	);
};

export default ListadoDocumentos;
