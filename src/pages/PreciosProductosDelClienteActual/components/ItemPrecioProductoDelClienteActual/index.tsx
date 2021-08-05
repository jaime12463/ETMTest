import {Box, Grid, Typography} from '@material-ui/core';
import {TPrecioProducto} from 'models';
import {FunctionComponent} from 'react';
import useEstilos from 'theme/useEstilosGenerales';
import Numero from 'components/UI/Numero';

type Props = {
	item: TPrecioProducto;
};

const ItemPrecioProductoDelClienteActual: FunctionComponent<Props> = (
	props
) => {
	const {item} = props;

	const estilos = useEstilos();

	return (
		<Grid container>
			<Grid item xs={8}>
				<Box
					display='flex'
					justifyContent='start'
					px={1}
					className={estilos.cortarTexto}
				>
					<Typography variant='body2'>
						{item.codigoProducto} {item.nombreProducto}
					</Typography>
				</Box>
			</Grid>
			<Grid item xs={4}>
				<Box display='flex' justifyContent='end' px={1}>
					<Typography variant='body2'>
						<Numero tipo="moneda" valor={item.precioConImpuestoUnidad} decimales={2}/>
					</Typography>
				</Box>
			</Grid>
		</Grid>
	);
};

export default ItemPrecioProductoDelClienteActual;
