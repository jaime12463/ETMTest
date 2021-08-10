import {FunctionComponent} from 'react';
import {TProductoPedido} from 'models';
import {Box, Grid, Divider } from '@material-ui/core';
import { Numero} from 'components/UI';
import {SwitchCambiarTipoPago} from '..';
import {useTranslation} from 'react-i18next';

type Props = {
	item: TProductoPedido;
	onClickItem?: (item: TProductoPedido) => void;
};

const ItemProductoAgregadoAlPedidoActual: FunctionComponent<Props> = (
	props
) => {
	const {item, onClickItem} = props;

	const {codigoProducto, nombreProducto, unidades, subUnidades, total} = item;

	const {t} = useTranslation();

	return (
		<Grid container >
			<Grid item xs={10} onClick={() => { if (onClickItem) onClickItem(item);}} >
				<Grid container>
					<Grid item xs={12}>
						<Grid container>
							<Grid item xs={2}>
							<Box fontWeight='fontWeightBold' fontSize={12}>{codigoProducto}</Box>
							</Grid>
							<Grid item xs={10}>
								<Box fontWeight='fontWeightBold' fontSize={12}>{nombreProducto}</Box>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<Grid container>
							<Grid item xs={4}>
								<Box  fontWeight='fontWeightLight' fontSize={11}>
									{t('general.unidades')}: {unidades}
								</Box>
							</Grid>
							<Grid item xs={4}>
								<Box fontWeight='fontWeightLight' fontSize={11}>
									{t('general.subUnidades')}: {subUnidades}
								</Box>
							</Grid>
							<Grid item xs={4}>
								<Box fontWeight='fontWeightLight' fontSize={11}>
									<Numero tipo="moneda" valor={total} decimales={2}/>
								</Box>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={2}>
				<SwitchCambiarTipoPago producto={item} />
			</Grid>
			
		</Grid>
	);
};

export default ItemProductoAgregadoAlPedidoActual;
