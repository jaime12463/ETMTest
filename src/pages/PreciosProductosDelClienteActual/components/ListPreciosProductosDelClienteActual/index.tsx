import {Box} from '@material-ui/core';
import {Dialogo, List} from 'components/UI';
import {
	useMostrarAdvertenciaEnDialogo,
	useSeleccionarProductoDePrecios,
} from 'hooks';
import {
	InputsKeysFormTomaDePedido,
	TFormTomaDePedido,
	THeader,
	THookForm,
	TPrecioProducto,
} from 'models';
import {Dispatch, FunctionComponent, SetStateAction} from 'react';
import {ItemPrecioProductoDelClienteActual} from '..';
import {useTranslation} from 'react-i18next';

type Props = {
	setProductoActual: Dispatch<SetStateAction<TPrecioProducto | null>>;
	hookForm: THookForm<TFormTomaDePedido>;
	preciosProductos: TPrecioProducto[];
	setInputFocus: Dispatch<SetStateAction<InputsKeysFormTomaDePedido>>;
};

const ListPreciosProductosDelClienteActual: FunctionComponent<Props> = (
	props
) => {
	const {hookForm, setProductoActual, preciosProductos, setInputFocus} = props;

	const {setValue} = hookForm;

	const Header = ({title}: {title: string}) => (
		<Box textAlign='center'>{title}</Box>
	);
	const {t} = useTranslation();

	const headers: THeader[] = [
		{
			component: <Header title={t('general.producto')} />,
			width: 8,
		},
		{
			component: <Header title={t('general.precio')} />,
			width: 4,
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

	const onClickItem = (item: TPrecioProducto) => {
		seleccionarProductoDePrecios({
			productoABuscar: item.codigoProducto.toString(),
		});
	};

	return (
		<>
			{mostarDialogo && <Dialogo {...parametrosDialogo} />}
			<List
				headers={headers}
				ItemComponent={ItemPrecioProductoDelClienteActual}
				items={preciosProductos}
				onClickItem={onClickItem}
			/>
		</>
	);
};

export default ListPreciosProductosDelClienteActual;
