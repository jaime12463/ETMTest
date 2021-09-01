import {Grid} from '@material-ui/core';
import {Numero} from 'components/UI';
import { useObtenerDatosTipoPedido } from 'hooks/useObtenerDatosTipoPedido';
import {TStateProductoActual, TTipoPedido, TFormTomaDePedido} from 'models';
import {FunctionComponent} from 'react';
import {useForm} from 'react-hook-form';
import { SelectCatalogoMotivos } from '../SelectCatalogoMotivos';

type Props = {
	stateProductoActual: TStateProductoActual;
};

export const InfoProductoActual: FunctionComponent<Props> = (props) => {
	const {
		stateProductoActual: {productoActual},
	} = props;

	const {
		nombreProducto,
		precioConImpuestoSubunidad,
		precioConImpuestoUnidad,
	} = {...productoActual};

	const obtenerDatosTipoPedido = useObtenerDatosTipoPedido();

	const datosTipoPedidoActual:
	| TTipoPedido
	| undefined = obtenerDatosTipoPedido();

	const defaultValues: TFormTomaDePedido = {
		unidades: '',
		subUnidades: '',
		productoABuscar: '',
		tipoDePedido: '',
	};

	const {
		control,
		handleSubmit,
		setValue,
		getValues,
	} = useForm<TFormTomaDePedido>({defaultValues});

	const hookForm = {control, handleSubmit, setValue, getValues};

	return (
		<Grid container>
			<Grid item xs={6}>
				{nombreProducto}
			</Grid>
			{!datosTipoPedidoActual?.requiereMotivo &&
				<Grid item xs={6}>
					<Grid container>
						<Grid item xs={6}>
							<Numero valor={precioConImpuestoUnidad ?? 0} />
						</Grid>
						<Grid item xs={6}>
							<Numero valor={precioConImpuestoSubunidad ?? 0} />
						</Grid>
					</Grid>
				</Grid>
			}
			{datosTipoPedidoActual?.requiereMotivo &&
				<Grid item xs={6}>
					<Grid container>
						<SelectCatalogoMotivos hookForm={hookForm} />
					</Grid>
				</Grid>
			}
		</Grid>
	);
};
