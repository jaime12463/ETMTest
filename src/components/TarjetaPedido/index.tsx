import React, {useMemo} from 'react';
import {useRouteMatch, useHistory} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Grid} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import {TTotalPedido} from 'models';
import useEstilos from './useEstilos';
import { useCalcularTotalPedido } from 'hooks';

export type Props = {};

const TarjetaPedido = ({}: Props) => {
	let history = useHistory();
	let {path} = useRouteMatch();
	const estilos = useEstilos();
	const {t} = useTranslation();
	const totalPedido: TTotalPedido = useCalcularTotalPedido();

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
							{totalPedido.totalUnidades}
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
							{totalPedido.totalSubUnidades}
						</Typography>
					</Grid>
					<Grid item xs={6}>
						<Typography component='b' display='block' gutterBottom>
							{t('general.total')}:
						</Typography>
					</Grid>
					<Grid item xs={6}>
						<Typography component='b' display='block' gutterBottom>
							$ {Number(totalPedido.totalPrecio).toFixed(2)}
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
