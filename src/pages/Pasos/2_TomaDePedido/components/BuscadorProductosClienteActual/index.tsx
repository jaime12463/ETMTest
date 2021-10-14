import {useState, Dispatch, SetStateAction} from 'react';
import {FunctionComponent} from 'react';
import {BuscadorenLista} from 'components/UI';
import {TPrecioProducto} from 'models';
import {ItemBuscadorProductosClienteActual} from '..';
import {useFiltrarPreciosProductosDelClienteActual} from './hooks/useFiltrarPreciosProductosDelClienteActual';

type Props = {
	setMostrarCajon: Dispatch<SetStateAction<{bottom: boolean}>>;
	seleccionarProductoDePrecios: Function;
};

const BuscadorProductosClienteActual: FunctionComponent<Props> = ({
	seleccionarProductoDePrecios,
	setMostrarCajon,
}: Props) => {
	const [preciosProductos, setPreciosProductos] = useState<TPrecioProducto[]>(
		[]
	);

	const filtrarPreciosProductosDelClienteActual = useFiltrarPreciosProductosDelClienteActual(
		{preciosProductos, setPreciosProductos}
	);

	
	const onClickItem = (item: TPrecioProducto) => {
		seleccionarProductoDePrecios({
			productoABuscar: item.codigoProducto.toString(),
		});
		setMostrarCajon({bottom: false});
	};

	return (
		<BuscadorenLista
			lista={preciosProductos}
			itemComponent={ItemBuscadorProductosClienteActual}
			onClick={onClickItem}
			manejadorInput={filtrarPreciosProductosDelClienteActual}
		/>
	);
};

export default BuscadorProductosClienteActual;
