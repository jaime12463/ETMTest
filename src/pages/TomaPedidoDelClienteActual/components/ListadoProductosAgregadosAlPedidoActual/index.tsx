import {List} from 'components/UI';
import {FunctionComponent} from 'react';
import {ItemProductoAgregadoAlPedidoActual} from '..';
import {THeader, TPedidoActual} from 'models';
import {Box, Switch} from '@material-ui/core';
import {useObtenerPedidoActual} from 'redux/hooks';

type Props = {};

const ListadoProductosAgregadosAlPedidoActual: FunctionComponent<Props> = (
	props
) => {
	const pedidoActual: TPedidoActual = useObtenerPedidoActual();
	const {productosPedido} = pedidoActual;

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
			items={productosPedido}
			ItemComponent={ItemProductoAgregadoAlPedidoActual}
		/>
	);
};

export default ListadoProductosAgregadosAlPedidoActual;
