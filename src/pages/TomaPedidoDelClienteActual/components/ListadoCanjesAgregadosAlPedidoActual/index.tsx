import {Dialogo, List} from 'components/UI';
import {Dispatch, FunctionComponent, SetStateAction} from 'react';
import {ItemCanjeAgregadoAlPedidoActual, SwitchCambiarTipoPago} from '..';
import {
	THeader,
	TPedido,
	TPrecioProducto,
	TProductoPedido,
	THookForm,
	TFormTomaDePedido,
	InputsKeysFormTomaDePedido,
} from 'models';
import {Box} from '@material-ui/core';
import {useObtenerPedidoActual} from 'redux/hooks';
import {
	useMostrarAdvertenciaEnDialogo,
	useSeleccionarProductoDePrecios,
} from 'hooks';
import {useTranslation} from 'react-i18next';

type Props = {
	setProductoActual: Dispatch<SetStateAction<TPrecioProducto | null>>;
	hookForm: THookForm<TFormTomaDePedido>;
	preciosProductos: TPrecioProducto[];
	setInputFocus: Dispatch<SetStateAction<InputsKeysFormTomaDePedido>>;
};

const ListadoCanjesAgregadosAlPedidoActual: FunctionComponent<Props> = (
	props
) => {
	const pedidoActual: TPedido = useObtenerPedidoActual();

	const {productos} = pedidoActual;

	const {hookForm, setProductoActual, preciosProductos, setInputFocus} = props;

	const {setValue} = hookForm;

	const Header = ({title}: {title: string}) => (
		<Box textAlign='center'>{title}</Box>
	);

	const {t} = useTranslation();

	const headers: THeader[] = [
		{
			component: <Header title={t('general.producto')} />,
			width: 12,
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
				items={productos}
				ItemComponent={ItemCanjeAgregadoAlPedidoActual}
				onClickItem={onClickItem}
				dataCY='listado-RequiereMotivo'
			/>
		</>
	);
};

export default ListadoCanjesAgregadosAlPedidoActual;
