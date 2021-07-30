import {FunctionComponent} from 'react';
import {TConsolidadoImplicitos} from 'models';
import {Box, Grid, Switch, Typography} from '@material-ui/core';

type Props = {
	item: TConsolidadoImplicitos;
};

const ItemListadoEnvasesRetornables: FunctionComponent<Props> = (
	props
) => {
	const {item} = props;

	const {
		codigoImplicito,
		nombreImplicito,
		unidades,
		subUnidades,
	} = item;

	return (
		<Typography component='div' variant='body2'>
			<Grid container justify='center' item xs={12}>
					<Grid item xs={8}>
						<Box>{codigoImplicito} {nombreImplicito}</Box>
					</Grid>
					<Grid item xs={3}>
						<Box>{unidades}</Box>
					</Grid>
					<Grid item xs={3}>
						<Box>{subUnidades}</Box>
					</Grid>
			</Grid>
		</Typography>
	);
};

export default ItemListadoEnvasesRetornables;
