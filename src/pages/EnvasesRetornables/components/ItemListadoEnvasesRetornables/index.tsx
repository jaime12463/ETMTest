import {FunctionComponent} from 'react';
import {TConsolidadoImplicitos} from 'models';
import {Box, Grid, Typography} from '@material-ui/core';
import useEstilos from 'theme/useEstilosGenerales';

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
				<Box
					display='flex'
					justifyContent='start'
					px={1}
					className={estilos.cortarTexto}
				>
					<Typography variant='body2'>
						{codigoImplicito} {nombreImplicito}
					</Typography>
				</Box>
			</Grid>
			<Grid item xs={3}>
				<Box display='flex' justifyContent='end' px={1}>
					<Typography variant='body2'>{unidades}</Typography>
				</Box>
			</Grid>
			<Grid item xs={3}>
				<Box display='flex' justifyContent='end' px={1}>
					<Typography variant='body2'>{subUnidades}</Typography>
				</Box>
			</Grid>
		</Grid>
	);
};

export default ItemListadoEnvasesRetornables;
