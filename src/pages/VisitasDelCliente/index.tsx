import {Estructura} from '../../components';
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
} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import {TPedidoClienteParaEnviar, TPedidoCliente} from 'models';
import {selectPedidoActual} from 'redux/features/pedidoActual/pedidoActualSlice';
import {useAppSelector} from 'redux/hooks';
import {useObtenerPedidosCliente} from './hooks';
import {useCalcularTotalPedidos} from 'hooks';
import AddIcon from '@material-ui/icons/Add';
import {useRouteMatch, useHistory} from 'react-router-dom';
import nombresRutas from 'routes/nombresRutas';

const VisitasDelCliente: React.FC = () => {
	const {t} = useTranslation();
	const estilos = useEstilos();
	const pedidoActual: TPedidoCliente = useAppSelector(selectPedidoActual);

	const pedidosCliente: TPedidoClienteParaEnviar[] = useObtenerPedidosCliente(
		pedidoActual.codigoCliente
	);

	const {path} = useRouteMatch();
	const history = useHistory();

	return (
		<>
			<Estructura
				titulo={'titulos.ingresoPedido'}
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
							{`Cliente ${pedidoActual.codigoCliente}`}
						</Typography>
					</Grid>
					<Grid item xs={8}>
						<Typography variant='body2' component='p' data-cy='info'>
							{`${pedidoActual.razonSocial}`}
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
										<TableCell key={column} padding='none' align='center'>
											<Box my={1} mx={1}>
												{column}
											</Box>
										</TableCell>
									))}
								</TableRow>
							</TableHead>
							<TableBody>
								{pedidosCliente &&
									pedidosCliente.map((pedido, i) => (
										<TableRow key={i} hover>
											<Celda
												estilos={estilos}
												width='15'
												align='left'
												dataCy='cliente-estado-pedido'
											>
												{pedido.estado}
											</Celda>
											<Celda
												estilos={estilos}
												width='45'
												align='left'
												dataCy='cliente-nombre-pedido'
												resumirTexto={true}
											>
												{'Venta'}
											</Celda>
											<Celda
												estilos={estilos}
												width='15'
												align='left'
												dataCy='cliente-fechaEntrega-pedido'
												resumirTexto={true}
											>
												{pedido.fechaEntrega}
											</Celda>
											<Celda
												estilos={estilos}
												width='15'
												align='left'
												dataCy='cliente-monto-pedido'
												resumirTexto={true}
											>
												{useCalcularTotalPedidos(pedido.productosPedido)}
											</Celda>
											<Celda
												estilos={estilos}
												width='15'
												align='right'
												dataCy='cliente-acciones-pedido'
												resumirTexto={true}
											>
												{'...'}
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
						onClick={() =>
							history.push(`${path}${nombresRutas.ingresarpedido}`)
						}
					>
						<AddIcon />
					</Fab>
				</Grid>
			</Estructura>
		</>
	);
};

export default VisitasDelCliente;
