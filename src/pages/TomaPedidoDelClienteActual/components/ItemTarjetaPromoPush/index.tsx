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

type Props = {
	item: TPromoPush;
	onClickItem: (item: any) => void;
};

const ItemTarjetaPromoPush = (props: any) => {
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
					{nombreProducto}
				</Typography>
				<Grid item xs={10}>
					<Box display='flex ' justifyContent='space-between'>
						<Grid item xs={1}>
							<Typography variant='caption'>
								Descuento: <Numero valor={descuento} />
							</Typography>
						</Grid>

						<Typography variant='caption'>
							Total: ${precioConImpuestoUnidad}
						</Typography>
					</Box>
				</Grid>
				<CardActions disableSpacing style={{padding: 0}}>
					<IconButton
						className={clsx(classes.expand, {
							[classes.expandOpen]: estado === index ? true : false,
						})}
						onClick={onClickItem(estado === index ? false : index)}
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
												<TableCell className={classes.celda}>
													<Typography variant='body2'>
														{`${el.CodigoProducto} ${
															productos[el.CodigoProducto].nombre
														}  ${promoPush.componentes[i].cantidad} ${
															promoPush.componentes[i].unidadMedida
														}`}
													</Typography>
													<Typography variant='body2'>
														{`Precio: $${el.precioBase} Descuento: $${el.descuento}
												 Total: $${el.precioFinal}`}
													</Typography>
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
