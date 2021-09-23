import {List} from 'components/UI';
import {FunctionComponent} from 'react';
import {THeader, TProductoPedido} from 'models';
import {Box} from '@mui/material';
import {TConsolidadoImplicitos} from 'models';
import {useObtenerConsolidacionImplicitos} from './hooks';
import {useObtenerVisitaActual, useObtenerConfiguracion} from 'redux/hooks';
import {ItemListadoEnvasesRetornables} from '..';
import {useTranslation} from 'react-i18next';

type Props = {};

const ListadoEnvasesRetornables: FunctionComponent<Props> = (props) => {
	const visitaActual = useObtenerVisitaActual();
	let pedidosArray: TProductoPedido[] = [];
	const {tipoPedidos} = useObtenerConfiguracion();

	const obtenerConsolidacionImplicitos = useObtenerConsolidacionImplicitos();
	//	TODO: La ejecución de obtenerConsolidacionImplicitos tiene que estar dentro de un useEffect
	//  si lo que se quiere es que se realice solo en el primer render (Como esta se hace cada render)

	Object.values(visitaActual.pedidos).forEach((pedido) => {
		let esGeneraEnvases = false;
		tipoPedidos.forEach((tipoPedido) => {
			if (tipoPedido.codigo === pedido.tipoPedido)
				esGeneraEnvases = tipoPedido.generaEnvases;
		});

		if (esGeneraEnvases) pedidosArray = pedidosArray.concat(pedido.productos);
	});

	const consolidacionImplicitos: TConsolidadoImplicitos[] = obtenerConsolidacionImplicitos(
		pedidosArray
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
			dataCY='listado-envases-retornables'
		/>
	);
};

export default ListadoEnvasesRetornables;
