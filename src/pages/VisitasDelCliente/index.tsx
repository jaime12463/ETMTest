import {Estructura} from 'components';
import {Celda} from 'components/Table/Celda';
import useEstilos from './useEstilos';
import {
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Grid,
	Fab,
	Typography,
	IconButton,
	Popover,
	List,
	ListItem,
	ListItemText,
} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import {TPedidoClienteParaEnviar, TClienteActual} from 'models';
import {
	useCrearPedidoAlClienteActual,
	useEditarPedidoDelClienteActual,
	useObtenerPedidosDelClienteActual,
} from './hooks';
import {useCalcularTotalPedidos, useObtenerClienteActual} from 'hooks';
import AddIcon from '@material-ui/icons/Add';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import EditIcon from '@material-ui/icons/Edit';
import Paper from '@material-ui/core/Paper';
import {useState} from 'react';

const VisitasDelCliente: React.FC = () => {
	const {t} = useTranslation();

	const estilos = useEstilos();

	const clienteActual: TClienteActual = useObtenerClienteActual();

	const pedidosCliente: TPedidoClienteParaEnviar[] = useObtenerPedidosDelClienteActual(
		clienteActual.codigoCliente
	);

	const crearPedidoAlClienteActual = useCrearPedidoAlClienteActual();

	const editarPedidoDelClienteActual = useEditarPedidoDelClienteActual();

	const calcularTotalPedido = useCalcularTotalPedidos();

	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event: any) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<Estructura
				titulo={'titulos.visitaCliente'}
				esConFechaHaciaAtras={true}
				esConLogoInferior={false}
			>
				<Grid
					container
					direction='row'
					alignItems='center'
					spacing={2}
					className={estilos.container}
				>
					<Grid item xs={4}>
						<Typography variant='body2' component='p' data-cy='info'>
							{`Cliente ${clienteActual.codigoCliente}`}
						</Typography>
					</Grid>
					<Grid item xs={8}>
						<Typography variant='body2' component='p' data-cy='info'>
							{`${clienteActual.razonSocial}`}
						</Typography>
					</Grid>
					<TableContainer>
						<Table stickyHeader aria-label='a dense table' size='small'>
							<TableHead>
								<TableRow>
									{[
										t('general.estado'),
										t('general.tipoPedido'),
										t('general.fechaEntrega'),
										t('general.monto'),
										t('general.acciones'),
									].map((column) => (
										<TableCell key={column} padding='none' align='left'>
											<Box my={1} mx={1}>
												{column}
											</Box>
										</TableCell>
									))}
								</TableRow>
							</TableHead>
							<TableBody>
								{pedidosCliente &&
									pedidosCliente.map((pedido: TPedidoClienteParaEnviar, i) => (
										<TableRow key={i} hover>
											<Celda
												estilos={estilos}
												width='20'
												align='left'
												dataCy='cliente-estado-pedido'
											>
												{pedido.estado}
											</Celda>
											<Celda
												estilos={estilos}
												width='20'
												align='left'
												dataCy='cliente-nombre-pedido'
											>
												{'Venta'}
											</Celda>
											<Celda
												estilos={estilos}
												width='20'
												align='left'
												dataCy='cliente-fechaEntrega-pedido'
											>
												{pedido.fechaEntrega}
											</Celda>
											<Celda
												estilos={estilos}
												width='20'
												align='left'
												dataCy='cliente-monto-pedido'
											>
												{
													calcularTotalPedido(pedido.productosPedido)
														.totalPrecio
												}
											</Celda>
											<Celda
												estilos={estilos}
												width='20'
												align='center'
												dataCy='cliente-acciones-pedido'
											>
												<IconButton
													aria-label='more'
													aria-describedby={i.toString()}
													onClick={handleClick}
												>
													<MoreHorizIcon />
												</IconButton>
												<Popover
													open={Boolean(anchorEl)}
													anchorEl={anchorEl}
													onClose={handleClose}
													id={i.toString()}
													anchorOrigin={{
														vertical: 'bottom',
														horizontal: 'center',
													}}
													transformOrigin={{
														vertical: 'top',
														horizontal: 'center',
													}}
												>
													<Paper>
														<List
															component='nav'
															aria-label='main mailbox folders'
														>
															<ListItem
																button
																onClick={() =>
																	editarPedidoDelClienteActual(
																		pedido.codigoPedido
																	)
																}
															>
																<EditIcon />
																<ListItemText primary='Editar Pedido' />
															</ListItem>
														</List>
													</Paper>
												</Popover>
											</Celda>
										</TableRow>
									))}
							</TableBody>
						</Table>
					</TableContainer>
					<Fab
						color='primary'
						aria-label='add'
						className={estilos.fab}
						onClick={crearPedidoAlClienteActual}
					>
						<AddIcon />
					</Fab>
				</Grid>
			</Estructura>
		</>
	);
};

export default VisitasDelCliente;
