import {List} from 'components/UI';
import {FunctionComponent} from 'react';
import {THeader} from 'models';
import {Box} from '@material-ui/core';
import {selectPedidoActual} from 'redux/features/pedidoActual/pedidoActualSlice';
import {TConsolidadoImplicitos} from 'models';
import {useObtenerConsolidacionImplicitos} from './hooks';
import {useAppSelector} from 'redux/hooks';
import {ItemListadoEnvasesRetornables} from '..';

type Props = {};

const ListadoEnvasesRetornables: FunctionComponent<Props> = (props) => {
	const {productosPedido} = useAppSelector(selectPedidoActual);
	const obtenerConsolidacionImplicitos = useObtenerConsolidacionImplicitos();
	//	TODO: La ejecución de obtenerConsolidacionImplicitos tiene que estar dentro de un useEffect
	//  si lo que se quiere es que se realice solo en el primer render (Como esta se hace cada render)
	const consolidacionImplicitos: TConsolidadoImplicitos[] = obtenerConsolidacionImplicitos(
		productosPedido
	);

	const Header = ({title}: {title: string}) => (
		<Box textAlign='center'>{title}</Box>
	);

	const headers: THeader[] = [
		{
			component: <Header title='Envase' />,
			width: 6,
		},
		{
			component: <Header title='Unidades' />,
			width: 3,
		},
		{
			component: <Header title='Subunidades' />,
			width: 3,
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
