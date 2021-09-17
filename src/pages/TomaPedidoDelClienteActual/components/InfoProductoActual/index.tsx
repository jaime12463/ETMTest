import {Grid} from '@material-ui/core';
import {Numero} from 'components/UI';
import {useObtenerDatosTipoPedido} from 'hooks/useObtenerDatosTipoPedido';
import {
	TStateProductoActual,
	TTipoPedido,
	TFormTomaDePedido,
	TStateInputFocus,
	THookForm,
} from 'models';
import {FunctionComponent} from 'react';
import {SelectCatalogoMotivos} from '../SelectCatalogoMotivos';
import useEstilos from 'theme/useEstilosGenerales';
import {useObtenerEsPermitidoSubUnidades} from 'components/Negocio/InputsUnidadesYSubUnidades/hooks';

type Props = {
	stateProductoActual: TStateProductoActual;
	stateInputFocus: TStateInputFocus;
	hookForm: THookForm<TFormTomaDePedido>;
};

export const InfoProductoActual: FunctionComponent<Props> = (props) => {
	const {stateProductoActual, hookForm, stateInputFocus} = props;
	const {productoActual} = stateProductoActual;

	const {
		nombreProducto,
		precioConImpuestoSubunidad,
		precioConImpuestoUnidad,
	} = {...productoActual};

	const obtenerDatosTipoPedido = useObtenerDatosTipoPedido();

	const datosTipoPedidoActual:
		| TTipoPedido
		| undefined = obtenerDatosTipoPedido();

	const estilos = useEstilos();

	const esPermitidoSubUnidades = useObtenerEsPermitidoSubUnidades(
		productoActual
	);

	return (
		<Grid container>
			<Grid item xs={6} className={estilos.cortarTexto}>
				{nombreProducto && (
					<span data-cy='info-producto'>{nombreProducto}</span>
				)}
			</Grid>
			{!datosTipoPedidoActual?.requiereMotivo && (
				<Grid item xs={6}>
					<Grid container>
						<Grid item xs={6}>
							<Numero
								valor={precioConImpuestoUnidad ?? 0}
								dataCy='info-unidades'
							/>
						</Grid>
						<Grid item xs={6}>
							{esPermitidoSubUnidades && (
								<Numero
									valor={precioConImpuestoSubunidad ?? 0}
									dataCy='info-subunidades'
								/>
							)}
						</Grid>
					</Grid>
				</Grid>
			)}
			{datosTipoPedidoActual?.requiereMotivo && (
				<Grid item xs={6}>
					<Grid container>
						<SelectCatalogoMotivos
							hookForm={hookForm}
							stateInputFocus={stateInputFocus}
							stateProductoActual={stateProductoActual}
						/>
					</Grid>
				</Grid>
			)}
		</Grid>
	);
};
