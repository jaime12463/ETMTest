import {useEffect, useState} from 'react';
import {BuscadorenLista} from 'components/UI';
import {
	InputsKeysFormTomaDePedido,
	TFormTomaDePedido,
	TPrecioProducto,
} from 'models';
import {ItemBuscadorProductosClienteActual} from '..';
import {useFiltrarPreciosProductosDelClienteActual} from './hooks/useFiltrarPreciosProductosDelClienteActual';

const BuscadorProductosClienteActual = ({
	seleccionarProductoDePrecios,
	setMostrarCajon,
}: any) => {
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
