import {List} from 'components/UI';
import {Box} from '@mui/material';
import {THeader} from 'models';
import {useTranslation} from 'react-i18next';
import {ItemListadoDocumentos} from '..';
import {useObtenerDeudasDelClienteActual} from 'hooks';

const ListadoDocumentos = () => {
	const {t} = useTranslation();
	const documentosClienteActual = useObtenerDeudasDelClienteActual();

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
			dataCY='listado-documentos'
		/>
	);
};

export default ListadoDocumentos;
