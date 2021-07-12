import {Estructura} from 'components';
import Dialogo, {Props as PropsDialogo} from 'components/Dialogo';
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
	useCancelarPedidoDelClienteActual,
} from './hooks';
import {useCalcularTotalPedidos, useObtenerClienteActual} from 'hooks';
import AddIcon from '@material-ui/icons/Add';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/NotInterested';
import Paper from '@material-ui/core/Paper';
import {useState} from 'react';
import {useMostrarAdvertenciaEnDialogo} from 'hooks';
import {match} from 'assert/strict';

const VisitasDelCliente: React.FC = () => {
	const {t} = useTranslation();

	const estilos = useEstilos();

	const [mostarDialogo, setMostarDialogo] = useState<boolean>(false);

	const [parametrosDialogo, setParametrosDialogo] = useState<PropsDialogo>({
		mensaje: '',
		manejadorClick: () => {},
		conBotonCancelar: true,
		dataCy: '',
	});

	const mostrarAdvertenciaEnDialogo = useMostrarAdvertenciaEnDialogo(
		setMostarDialogo,
		setParametrosDialogo
	);

	const clienteActual: TClienteActual = useObtenerClienteActual();

	const pedidosCliente: TPedidoClienteParaEnviar[] = useObtenerPedidosDelClienteActual(
		clienteActual.codigoCliente
	);

	const crearPedidoAlClienteActual = useCrearPedidoAlClienteActual();

	const editarPedidoDelClienteActual = useEditarPedidoDelClienteActual();
	const cancelarPedidoDelClienteActual = useCancelarPedidoDelClienteActual();

	const calcularTotalPedido = useCalcularTotalPedidos();

	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event: any) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleButtonOnClick = (codigoPedido: string) => {
		console.log(codigoPedido, 'hanlder');

		cancelarPedidoDelClienteActual(
			codigoPedido,
			pedidosCliente,
			mostrarAdvertenciaEnDialogo
		);
	};

	console.log(pedidosCliente);

	return (
		<>
			<Estructura
				titulo={'titulos.visitaCliente'}
				esConFechaHaciaAtras={true}
				esConLogoInferior={false}
			>
				{mostarDialogo && <Dialogo {...parametrosDialogo} />}
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
					<Grid item className={estilos.margin}>
						<Typography variant='body2' component='p' data-cy='info'>
							{t('general.pedidosRealizados')}
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
									pedidosCliente.map((pedido: any, i) => (
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
													id={(i + Math.random()).toString()}
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
															id={(i + Math.random()).toString()}
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
															</ListItem>
															<ListItem
																button
																onClick={() =>
																	handleButtonOnClick(pedido.codigoPedido)
																}
															>
																<CancelIcon />
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
