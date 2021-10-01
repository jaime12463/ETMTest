import {FunctionComponent} from 'react';
import {
	Grid,
	Box,
	Table,
	TableBody,
	TableContainer,
	TableRow,
	TableCell,
} from '@mui/material';
import {Center, Fecha, Numero} from 'components/UI';
import useEstilos from './useEstilos';
import React from 'react';
import clsx from 'clsx';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {TPromoPush} from 'models';
import {useObtenerDatos} from 'redux/hooks';
import {makeStyles} from '@material-ui/styles';
import {useTranslation} from 'react-i18next';
import {formatearNumero} from 'utils/methods';

type Props = {
	item: TPromoPush;
	onClickItem: (item: any) => void;
};

/* 2 US */

const ItemTarjetaPromoPush = (props: any) => {
	const {t} = useTranslation();
	const {item, onClickItem, estado, index} = props;
	const datos = useObtenerDatos();
	const {productos} = datos;
	const {
		codigoProducto,
		nombreProducto,
		unidadesDisponibles,
		precioConImpuestoUnidad,
		descuento,
		componentes,
		promoPush,
	} = item;

	const classes = useEstilos();

	return (
		<Card className={classes.root}>
			<CardHeader
				onClick={onClickItem({codigo: codigoProducto, modo: 'select'})}
				title={
					<Box display='flex ' justifyContent='space-between'>
						<Typography variant='body2'>{codigoProducto}</Typography>
						<Typography variant='body2'>
							Disponible: {unidadesDisponibles}
						</Typography>
					</Box>
				}
				style={{
					backgroundColor: '#c7d2fb',
					paddingLeft: 6,
					paddingRight: 6,
					paddingBottom: 5,
					paddingTop: 5,
				}}
				disableTypography={true}
			/>
			<CardContent className={classes.cardContent}>
				<Typography variant='caption' component='p'>
					<strong> {nombreProducto} </strong>
				</Typography>
				<Grid container>
					<Grid item xs={10}>
						<Grid container>
							<Grid item>
								<Typography variant='caption'>
									Descuento: {formatearNumero(descuento, t)}
								</Typography>
							</Grid>

							<Grid item xs={6} />
							<Grid item>
								<Typography variant='caption'>
									Total: {formatearNumero(precioConImpuestoUnidad, t)}
								</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				<CardActions disableSpacing style={{padding: 0}}>
					<IconButton
						className={clsx(classes.expand, {
							[classes.expandOpen]: estado === index ? true : false,
						})}
						onClick={onClickItem({
							estado: estado === index ? false : index,
							modo: 'expand',
						})}
						aria-expanded={estado === index ? true : false}
					>
						Icono expandir
					</IconButton>
				</CardActions>
				<Collapse in={estado === index} timeout='auto' unmountOnExit>
					<CardContent className={classes.cardContentExpand}>
						<TableContainer>
							<Table size='small'>
								<TableBody>
									{componentes &&
										componentes.map((el: any, i: number) => (
											<React.Fragment key={i}>
												<TableRow>
													<TableCell
														colSpan={4}
														className={classes.celdaProducto}
													>
														{`${el.codigoProducto} ${
															productos[el.codigoProducto].nombre
														}  ${promoPush.componentes[i].cantidad} ${
															promoPush.componentes[i].unidadMedida
														}`}
													</TableCell>
												</TableRow>
												<TableRow>
													<TableCell />
													<TableCell className={classes.celdaValores}>
														Precio: {formatearNumero(el.precioBase, t)}
													</TableCell>
													<TableCell className={classes.celdaValores}>
														Descuento: {formatearNumero(el.descuento, t)}
													</TableCell>
													<TableCell className={classes.celdaValores}>
														Total: {formatearNumero(el.precioFinal, t)}
													</TableCell>
												</TableRow>
											</React.Fragment>
										))}
								</TableBody>
							</Table>
						</TableContainer>
					</CardContent>
				</Collapse>
			</CardContent>
		</Card>
	);
};

export default ItemTarjetaPromoPush;
