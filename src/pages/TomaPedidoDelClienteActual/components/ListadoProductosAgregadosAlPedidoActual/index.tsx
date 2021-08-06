import {Dialogo, List} from 'components/UI';
import {Dispatch, FunctionComponent, SetStateAction} from 'react';
import {ItemProductoAgregadoAlPedidoActual, SwitchCambiarTipoPago} from '..';
import {
	THeader,
	TPedidoActual,
	TPrecioProducto,
	TProductoPedido,
	THookForm,
	TFormTomaDePedido,
	InputsKeysFormTomaDePedido,
} from 'models';
import {Box, Switch} from '@material-ui/core';
import {useObtenerPedidoActual} from 'redux/hooks';
import {
	useMostrarAdvertenciaEnDialogo,
	useSeleccionarProductoDePrecios,
} from 'hooks';

type Props = {
	setProductoActual: Dispatch<SetStateAction<TPrecioProducto | null>>;
	hookForm: THookForm<TFormTomaDePedido>;
	preciosProductos: TPrecioProducto[];
	setInputFocus: Dispatch<SetStateAction<InputsKeysFormTomaDePedido>>;
};

const ListadoProductosAgregadosAlPedidoActual: FunctionComponent<Props> = (
	props
) => {
	const pedidoActual: TPedidoActual = useObtenerPedidoActual();

	const {productosPedido} = pedidoActual;

	const {hookForm, setProductoActual, preciosProductos, setInputFocus} = props;

	const {setValue} = hookForm;

	const Header = ({title}: {title: string}) => (
		<Box textAlign='center'>{title}</Box>
	);

	const headers: THeader[] = [
		{
			component: <Header title='Producto' />,
			width: 7,
		},
		{
			component: <Header title='Precio' />,
			width: 3,
		},
		{
			component: <SwitchCambiarTipoPago />,
			width: 2,
		},
	];

	const {
		mostrarAdvertenciaEnDialogo,
		mostarDialogo,
		parametrosDialogo,
	} = useMostrarAdvertenciaEnDialogo();

	const seleccionarProductoDePrecios = useSeleccionarProductoDePrecios(
		setProductoActual,
		setValue,
		preciosProductos,
		setInputFocus,
		mostrarAdvertenciaEnDialogo
	);

	const onClickItem = (item: TProductoPedido) => {
		seleccionarProductoDePrecios({
			productoABuscar: item.codigoProducto.toString(),
		});
	};

	return (
		<>
			{mostarDialogo && <Dialogo {...parametrosDialogo} />}
			<List
				headers={headers}
				items={productosPedido}
				ItemComponent={ItemProductoAgregadoAlPedidoActual}
				onClickItem={onClickItem}
			/>
		</>
	);
};

export default ListadoProductosAgregadosAlPedidoActual;
