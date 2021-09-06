import {Grid} from '@material-ui/core';
import {Numero} from 'components/UI';
import { useObtenerDatosTipoPedido } from 'hooks/useObtenerDatosTipoPedido';
import {TStateProductoActual, TTipoPedido, TFormTomaDePedido, TStateInputFocus, THookForm} from 'models';
import {FunctionComponent} from 'react';
import {useForm} from 'react-hook-form';
import { SelectCatalogoMotivos } from '../SelectCatalogoMotivos';

type Props = {
	stateProductoActual: TStateProductoActual;
	stateInputFocus: TStateInputFocus;
	hookForm: THookForm<TFormTomaDePedido>;
};

export const InfoProductoActual: FunctionComponent<Props> = (props) => {
	const {
		stateProductoActual,
		hookForm,
		stateInputFocus
	} = props;
	const { productoActual } = stateProductoActual;

	const {
		nombreProducto,
		precioConImpuestoSubunidad,
		precioConImpuestoUnidad,
	} = {...productoActual};

	const obtenerDatosTipoPedido = useObtenerDatosTipoPedido();

	const datosTipoPedidoActual:
	| TTipoPedido
	| undefined = obtenerDatosTipoPedido();

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
						<SelectCatalogoMotivos hookForm={hookForm} stateInputFocus={stateInputFocus} stateProductoActual={stateProductoActual}/>
					</Grid>
				</Grid>
			}
		</Grid>
	);
};
