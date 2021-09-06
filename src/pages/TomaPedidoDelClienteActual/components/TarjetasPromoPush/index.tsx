import {List, Dialogo} from 'components/UI';
import {Dispatch, FunctionComponent, SetStateAction} from 'react';
import {ItemTarjetaPromoPush} from '..';
import {
	useObtenerPromoPushDelCliente,
	useMostrarAdvertenciaEnDialogo,
	useSeleccionarProductoDePrecios,
} from 'hooks';
import React, {useState} from 'react';
import {
	TPrecioProducto,
	THookForm,
	TFormTomaDePedido,
	InputsKeysFormTomaDePedido,
} from 'models';

type Props = {
	setProductoActual: Dispatch<SetStateAction<TPrecioProducto | null>>;
	hookForm: THookForm<TFormTomaDePedido>;
	preciosProductos: TPrecioProducto[];
	setInputFocus: Dispatch<SetStateAction<InputsKeysFormTomaDePedido>>;
};

const TarjetasPromoPush: FunctionComponent<Props> = (props) => {
	const obtenerPromoPushDelCliente = useObtenerPromoPushDelCliente();
	const [expanded, setExpanded] = useState<string>('');
	const {hookForm, setProductoActual, preciosProductos, setInputFocus} = props;

	const {setValue} = hookForm;

	const handleChange = (retorno: any) => (event: React.ChangeEvent<{}>) => {
		if (retorno.modo == 'expand') {
			setExpanded(retorno.estado);
		} else {
			seleccionarProductoDePrecios({
				productoABuscar: retorno.codigo,
			});
		}
	};

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

	return (
		<>
			{mostarDialogo && <Dialogo {...parametrosDialogo} />}
			<List
				headers={[]}
				items={
					obtenerPromoPushDelCliente !== undefined
						? obtenerPromoPushDelCliente
						: []
				}
				ItemComponent={ItemTarjetaPromoPush}
				onClickItem={handleChange}
				estado={expanded}
				dataCY='listado-promoPush'
			/>
		</>
	);
};

export default TarjetasPromoPush;
