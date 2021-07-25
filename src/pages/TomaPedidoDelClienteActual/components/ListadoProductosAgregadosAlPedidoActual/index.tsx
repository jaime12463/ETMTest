import {List} from 'components/UI';
import {FunctionComponent} from 'react';
import {useObtenerProductosDelPedidoActual} from './hooks';
import {ItemProductoAgregadoAlPedidoActual} from '..';
import {THeader} from 'models';
import {Box, Grid, Switch} from '@material-ui/core';

type Props = {};

const ListadoProductosAgregadosAlPedidoActual: FunctionComponent<Props> = (
	props
) => {
	const productosDelPedidoActual = useObtenerProductosDelPedidoActual();

	const Header = ({title}: {title: string}) => (
		<Box textAlign='center'>{title}</Box>
	);

	const headers: THeader[] = [
		{
			component: <Header title='Producto' />,
			width: 8,
		},
		{
			component: <Header title='Precio' />,
			width: 2,
		},
		{
			component: (
				<Box textAlign='center'>
					<Switch
						checked={true} //TODO: Hacer logica
						onChange={() => {}}
						name='checkedA'
						inputProps={{'aria-label': 'secondary checkbox'}}
					/>
				</Box>
			),
			width: 2,
		},
	];

	return (
		<List
			headers={headers}
			items={productosDelPedidoActual}
			ItemComponent={ItemProductoAgregadoAlPedidoActual}
		/>
	);
};

export default ListadoProductosAgregadosAlPedidoActual;
