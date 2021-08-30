import {Grid} from '@material-ui/core';
import {Numero} from 'components/UI';
import {TStateProductoActual} from 'models';
import {FunctionComponent} from 'react';

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

	return (
		<Grid container>
			<Grid item xs={6}>
				{nombreProducto}
			</Grid>
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
		</Grid>
	);
};
