import {List} from 'components/UI';
import {FunctionComponent} from 'react';
import {THeader} from 'models';
import {Box, Switch} from '@material-ui/core';
import {selectPedidoActual} from 'redux/features/pedidoActual/pedidoActualSlice';
import { TConsolidadoImplicitos } from 'models';
import { useObtenerConsolidacionImplicitos } from './../../hooks';
import {useAppSelector} from 'redux/hooks';
import { ItemListadoEnvasesRetornables } from '..';

type Props = {};

const ListadoEnvasesRetornables: FunctionComponent<Props> = (
	props
) => {
    const {productosPedido} = useAppSelector(selectPedidoActual);
    const obtenerConsolidacionImplicitos = useObtenerConsolidacionImplicitos();
	const consolidacionImplicitos: TConsolidadoImplicitos[] = obtenerConsolidacionImplicitos(productosPedido);

	const Header = ({title}: {title: string}) => (
		<Box textAlign='center'>{title}</Box>
	);

	const headers: THeader[] = [
		{
			component: <Header title='Envase' />,
			width: 4,
		},
		{
			component: <Header title='Unidades' />,
			width: 4,
		},
		{
			component: <Header title='Subunidades' />,
			width: 4,
		},
	];

	return (
		<List
			headers={headers}
			items={consolidacionImplicitos}
			ItemComponent={ItemListadoEnvasesRetornables}
		/>
	);
};

export default ListadoEnvasesRetornables;
