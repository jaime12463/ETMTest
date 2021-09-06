import {FunctionComponent} from 'react';
import {
	Grid,
	Box,
	Table,
	TableBody,
	TableContainer,
	TableRow,
	TableCell,
} from '@material-ui/core';
import {Center, Fecha, Numero} from 'components/UI';
import useEstilos from './useEstilos';
import React from 'react';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {TPromoPush} from 'models';
import {useObtenerDatos} from 'redux/hooks';
import {makeStyles} from '@material-ui/core/styles';
import {useTranslation} from 'react-i18next';
import {formatearNumero} from 'utils/methods';

type Props = {
	item: TPromoPush;
	onClickItem: (item: any) => void;
};

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
			<CardHeader onClick={onClickItem({codigo:codigoProducto, modo:'select'})}
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
						<Grid container >
							<Grid item>
								<Typography variant='caption'>
									Descuento: {formatearNumero(descuento, t)}
								</Typography>
							</Grid>
							
							<Grid item xs={6}/>
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
						onClick={onClickItem({estado:( estado === index ? false : index), modo:'expand'})}
						aria-expanded={estado === index ? true : false}
					>
						<ExpandMoreIcon />
					</IconButton>
				</CardActions>
				<Collapse in={estado === index} timeout='auto' unmountOnExit>
					<CardContent className={classes.cardContentExpand}>
						<TableContainer>
							<Table size='small'>
								<TableBody>
									{componentes.map((el: any, i: number) => (
										<React.Fragment key={i}>
											<TableRow>
												<TableCell colSpan={4} className={classes.celdaProducto}>
															{`${el.CodigoProducto} ${
																productos[el.CodigoProducto].nombre
															}  ${promoPush.componentes[i].cantidad} ${
																promoPush.componentes[i].unidadMedida
															}`}
													</TableCell>
											</TableRow>
											<TableRow>
												<TableCell/>
												<TableCell className={classes.celdaValores}>
													Precio: {formatearNumero(el.precioBase,t)} 
												</TableCell>
												<TableCell className={classes.celdaValores}>
													 Descuento: {formatearNumero(el.descuento,t)}
												</TableCell>
												<TableCell className={classes.celdaValores}>
												 	Total: {formatearNumero(el.precioFinal,t)}
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
