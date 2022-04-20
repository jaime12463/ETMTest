import {TProductoPedido} from 'models';
import {Box, Grid} from '@mui/material';
import {useTranslation} from 'react-i18next';

type Props = {
	item: TProductoPedido;
	onClickItem?: (item: TProductoPedido) => void;
};

const ItemCanjeAgregadoAlPedidoActual: React.VFC<Props> = ({
	item,
	onClickItem,
}) => {
	const {codigoProducto, nombreProducto, unidades, subUnidades} = item;

	const {t} = useTranslation();

	return (
		<Grid container>
			<Grid
				item
				xs={12}
				onClick={() => {
					if (onClickItem) onClickItem(item);
				}}
			>
				<Grid container>
					<Grid item xs={2}>
						<Grid container>
							<Box fontWeight='fontWeightBold' fontSize={12}>
								{codigoProducto}
							</Box>
						</Grid>
					</Grid>
					<Grid item xs={10}>
						<Grid container>
							<Grid item xs={12}>
								<Box fontWeight='fontWeightBold' fontSize={12}>
									{nombreProducto}
								</Box>
							</Grid>
						</Grid>
						<Grid container>
							<Grid item xs={4}>
								<Box
									fontWeight='fontWeightLight'
									fontSize={11}
									data-cy={`producto-pedido-unidades-${codigoProducto}`}
								>
									{t('general.unidades')}: {unidades}
								</Box>
							</Grid>
							<Grid item xs={6}>
								<Box
									fontWeight='fontWeightLight'
									fontSize={11}
									data-cy={`producto-pedido-subunidades-${codigoProducto}`}
								>
									{t('general.subUnidades')}: {subUnidades}
								</Box>
							</Grid>
						</Grid>
						<Grid container>
							<Grid item xs={12}>
								<Box
									fontWeight='fontWeightLight'
									fontSize={12}
									data-cy={`producto-pedido-motivo-${codigoProducto}`}
								></Box>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default ItemCanjeAgregadoAlPedidoActual;
