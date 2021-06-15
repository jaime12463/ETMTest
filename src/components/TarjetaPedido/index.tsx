import React, {useMemo} from 'react';
import {Link, useRouteMatch, useHistory} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Grid} from '@material-ui/core';

import {useTranslation} from 'react-i18next';
import {TProductoPedido} from 'models';
import useEstilos from './useEstilos';

export type Props = {
	pedido: TProductoPedido[];
};

type TTotal = {
	totalUnidades: number;
	totalSubUnidades: number;
	totalPrecio: number;
};

const TotalInicial: TTotal = {
	totalUnidades: 0,
	totalPrecio: 0,
	totalSubUnidades: 0,
};
const reducerSumarProductos = (
	total: TTotal,
	productoPedido: TProductoPedido
): TTotal => ({
	totalUnidades: total.totalUnidades + productoPedido.unidades,
	totalSubUnidades: total.totalSubUnidades + productoPedido.subUnidades,
	totalPrecio: total.totalPrecio + productoPedido.total,
});

const TarjetaPedido = ({pedido}: Props) => {
	let history = useHistory();
	let {path, url} = useRouteMatch();
	const estilos = useEstilos();
	const {t} = useTranslation();
	const totales = useMemo(
		() => pedido.reduce(reducerSumarProductos, TotalInicial),
		[pedido]
	);

	return (
		<Card className={estilos.root}>
			<CardContent className={estilos.sectionCardInfo}>
				<Grid container>
					<Grid item xs={6}>
						<Typography component='b' display='block' gutterBottom>
							{t('general.totalUnidades')}:
						</Typography>
					</Grid>
					<Grid item xs={6}>
						<Typography
							data-cy='cantidad-productos-pedido'
							component='b'
							display='block'
							gutterBottom
						>
							{totales.totalUnidades}
						</Typography>
					</Grid>
					<Grid item xs={6}>
						<Typography component='b' display='block' gutterBottom>
							{t('general.totalSubUnidades')}:
						</Typography>
					</Grid>
					<Grid item xs={6}>
						<Typography
							data-cy='cantidad-productos-pedido'
							component='b'
							display='block'
							gutterBottom
						>
							{totales.totalSubUnidades}
						</Typography>
					</Grid>
					<Grid item xs={6}>
						<Typography component='b' display='block' gutterBottom>
							{t('general.total')}:
						</Typography>
					</Grid>
					<Grid item xs={6}>
						<Typography component='b' display='block' gutterBottom>
							$ {Number(totales.totalPrecio).toFixed(2)}
						</Typography>
					</Grid>
				</Grid>
			</CardContent>
			<CardActions className={estilos.alignment}>
				<Button
					variant='contained'
					color='secondary'
					onClick={() => history.push(`${path}/detalle`)}
				>
					{t('general.verDetalle').toUpperCase()}
				</Button>
			</CardActions>
		</Card>
	);
};

export default TarjetaPedido;
