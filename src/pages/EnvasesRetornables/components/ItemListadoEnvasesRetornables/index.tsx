import {FunctionComponent} from 'react';
import {TConsolidadoImplicitos} from 'models';
import {Box, Grid, Typography} from '@material-ui/core';
import useEstilos from './useEstilos';

type Props = {
	item: TConsolidadoImplicitos;
};

const ItemListadoEnvasesRetornables: FunctionComponent<Props> = (props) => {
	const {item} = props;

	const {codigoImplicito, nombreImplicito, unidades, subUnidades} = item;

	const estilos = useEstilos();

	return (
		<Grid container justify='center'>
			<Grid item xs={6}>
				<Box className={estilos.cortarTexto}>
					{codigoImplicito} {nombreImplicito}
				</Box>
			</Grid>
			<Grid item xs={3}>
				<Box display='flex' justifyContent='end'>
					{unidades}
				</Box>
			</Grid>
			<Grid item xs={3}>
				<Box display='flex' justifyContent='end'>
					{subUnidades}
				</Box>
			</Grid>
		</Grid>
	);
};

export default ItemListadoEnvasesRetornables;
