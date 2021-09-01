import {List} from 'components/UI';
import {FunctionComponent} from 'react';
import {THeader} from 'models';
import {Box} from '@material-ui/core';
import {TConsolidadoImplicitos} from 'models';
import {useObtenerConsolidacionImplicitos} from './hooks';
import {useObtenerPedidoActual} from 'redux/hooks';
import {ItemListadoEnvasesRetornables} from '..';
import {useTranslation} from 'react-i18next';

type Props = {};

const ListadoEnvasesRetornables: FunctionComponent<Props> = (props) => {
	const {productos} = useObtenerPedidoActual();
	//TODO: Los envases se calculan respecto a que tipo de pedido?

	const obtenerConsolidacionImplicitos = useObtenerConsolidacionImplicitos();
	//	TODO: La ejecución de obtenerConsolidacionImplicitos tiene que estar dentro de un useEffect
	//  si lo que se quiere es que se realice solo en el primer render (Como esta se hace cada render)
	const consolidacionImplicitos: TConsolidadoImplicitos[] = obtenerConsolidacionImplicitos(
		productos
	);

	const Header = ({title}: {title: string}) => (
		<Box textAlign='center'>{title}</Box>
	);

	const {t} = useTranslation();

	const headers: THeader[] = [
		{
			component: <Header title={t('general.envase')} />,
			width: 6,
		},
		{
			component: <Header title={t('general.unidades')} />,
			width: 3,
		},
		{
			component: <Header title={t('general.subunidades')} />,
			width: 3,
		},
	];

	return (
		<List
			headers={headers}
			items={consolidacionImplicitos.sort(function (a, b) {
				return a.codigoImplicito - b.codigoImplicito;
			})}
			ItemComponent={ItemListadoEnvasesRetornables}
		/>
	);
};

export default ListadoEnvasesRetornables;
