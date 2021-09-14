import {Box, Grid, Typography} from '@material-ui/core';
import {TPrecioProducto} from 'models';
import {FunctionComponent} from 'react';
import useEstilos from 'theme/useEstilosGenerales';
import {formatearNumero} from 'utils/methods';
import {useTranslation} from 'react-i18next';
import Divider from '@material-ui/core/Divider';

type Props = {
	item: TPrecioProducto;
	onClickItem?: (item: TPrecioProducto) => void;
};

const ItemBuscadorProductosClienteActual: FunctionComponent<Props> = (
	props
) => {
	const {t} = useTranslation();
	const {item, onClickItem} = props;

	const estilos = useEstilos();

	return (
		<Grid
			container
			onClick={() => {
				if (onClickItem) onClickItem(item);
			}}
		>
			<Grid item xs={3}>
				<Box display='flex' justifyContent='start' px={2}>
					<Typography variant='body2'>{item.codigoProducto}</Typography>
				</Box>
			</Grid>
			<Grid item xs={6}>
				<Box display='flex' justifyContent='center' px={2}>
					<Typography variant='body2' className={estilos.cortarTexto}>
						{item.nombreProducto}
					</Typography>
				</Box>
			</Grid>

			<Grid item xs={3}>
				<Box display='flex' justifyContent='end' px={2}>
					{formatearNumero(item.precioConImpuestoUnidad, t)}
				</Box>
			</Grid>
		</Grid>
	);
};

export default ItemBuscadorProductosClienteActual;
