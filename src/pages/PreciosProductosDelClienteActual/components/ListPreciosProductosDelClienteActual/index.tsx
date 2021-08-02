import {Box} from '@material-ui/core';
import {List} from 'components/UI';
import {THeader, TPrecioProducto} from 'models';
import {Dispatch, FunctionComponent, SetStateAction} from 'react';
import {ItemPrecioProductoDelClienteActual} from '..';

type Props = {
	preciosProductos: TPrecioProducto[];
	setPreciosProductos?: Dispatch<SetStateAction<TPrecioProducto[]>>;
};

const ListPreciosProductosDelClienteActual: FunctionComponent<Props> = (
	props
) => {
	const {preciosProductos} = props;

	const Header = ({title}: {title: string}) => (
		<Box textAlign='center'>{title}</Box>
	);

	const headers: THeader[] = [
		{
			component: <Header title='Producto' />,
			width: 4,
		},
		{
			component: <Header title='Precio' />,
			width: 4,
		},
	];

	return (
		<List
			headers={headers}
			ItemComponent={ItemPrecioProductoDelClienteActual}
			items={preciosProductos}
		/>
	);
};

export default ListPreciosProductosDelClienteActual;
