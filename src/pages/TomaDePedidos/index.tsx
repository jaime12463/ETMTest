import {Fragment, SyntheticEvent, useState} from 'react';
import {selectPedidoActual} from 'redux/features/pedidoActual/pedidoActualSlice';
import {
	TInputsFormularioAgregarProducto,
	TPedidoCliente,
	TPreciosProductos,
	TProductoPedidoConPrecios,
} from 'models';
import {useAppSelector} from 'redux/hooks';
import {Button, Grid, Snackbar, Typography} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import useEstilos from './useEstilos';
import {useForm} from 'react-hook-form';
import {Alert} from '@material-ui/lab';
import {darFormatoFecha} from 'utils/methods';
import {
	TablaProductos,
	FormularioAgregarProducto,
	TarjetaPedido,
	Input,
	Estructura,
} from 'components';
import {useObtenerDatos} from '../../hooks';
import {
	useAgregarPedidoAlListado,
	useValidarAgregarProductoAlPedidoCliente,
	useAsignarPedidoActual,
	useAsignarProductoActual,
	useBuscarPreciosProductos,
} from './hooks';
import Dialogo, {Props as PropsDialogo} from 'components/Dialogo';

export default function TomaDePedidos() {
	const [preciosProductos, setPreciosProductos] = useState<TPreciosProductos>(
		[]
	);
	const [existeCliente, setExisteCliente] = useState<boolean | null>(null);
	const [frecuenciaValida, setFrecuenciaValida] = useState<boolean | null>(
		null
	);
	const [
		avisoPedidoGuardadoExitoso,
		setAvisoPedidoGuardadoExitoso,
	] = useState<boolean>(false);
	const [razonSocial, setRazonSocial] = useState<string>('');
	const [mostarDialogo, setMostarDialogo] = useState<boolean>(false);
	const [parametrosDialogo, setParametrosDialogo] = useState<PropsDialogo>({
		mensaje: '',
		manejadorClick: () => {},
		conBotonCancelar: false,
	});
	const [
		productoActual,
		setProductoActual,
	] = useState<TProductoPedidoConPrecios>({
		codigoProductoConNombre: '',
		unidades: 0,
		subUnidades: 0,
		precioConImpuestoUnidad: 0,
		precioConImpuestoSubunidad: 0,
	});
	const {t} = useTranslation();
	const estilos = useEstilos();
	const {
		control,
		handleSubmit,
		setValue,
		getValues,
	} = useForm<TInputsFormularioAgregarProducto>();
	const pedidoActual: TPedidoCliente = useAppSelector(selectPedidoActual);

	useObtenerDatos();

	const asignarProductoActual = useAsignarProductoActual(
		setProductoActual,
		setValue
	);
	const validarAgregarProductoAlPedidoCliente = useValidarAgregarProductoAlPedidoCliente(
		setMostarDialogo,
		setParametrosDialogo,
		productoActual,
		setProductoActual,
		setValue,
		getValues
	);
	const asignarPedidoActual = useAsignarPedidoActual(
		setExisteCliente,
		setRazonSocial,
		setPreciosProductos,
		setFrecuenciaValida
	);
	const buscarPreciosProductos = useBuscarPreciosProductos(
		preciosProductos,
		setPreciosProductos
	);
	const agregarPedidoAlListado = useAgregarPedidoAlListado(
		setMostarDialogo,
		setParametrosDialogo,
		setExisteCliente,
		setValue,
		setAvisoPedidoGuardadoExitoso
	);

	const cerrarAvisoPedidoGuardado = (event: SyntheticEvent<Element, Event>) => {
		setAvisoPedidoGuardadoExitoso(false);
	};

	return (
		<>
			<Estructura
				titulo={'titulos.ingresoPedido'}
				esConFechaHaciaAtras={true}
				esConLogoInferior={false}
			>
				<Fragment>
					{mostarDialogo && <Dialogo {...parametrosDialogo} />}
					<Snackbar
						open={avisoPedidoGuardadoExitoso}
						autoHideDuration={4000}
						onClose={cerrarAvisoPedidoGuardado}
					>
						<Alert onClose={cerrarAvisoPedidoGuardado} severity='success'>
							Se guardo el pedido del cliente
						</Alert>
					</Snackbar>
					<Grid
						container
						direction='row'
						alignItems='center'
						spacing={2}
						className={estilos.contenedor}
					>
						<Grid item xs={6} sm={6}>
							<form onSubmit={handleSubmit(asignarPedidoActual)}>
								<Input
									label={t('general.cliente')}
									name='codigoCliente'
									control={control}
									inputDataCY='codigo-cliente'
								/>
							</form>
						</Grid>
						{existeCliente && pedidoActual.fechaEntrega && (
							<Fragment>
								<Grid item xs={6} sm={6}>
									<Typography variant='body2' component='p'>
										{razonSocial}
									</Typography>
								</Grid>
								<Grid item xs={12} sm={12}>
									<Typography variant='body2' component='p'>
										{t('general.fechaEntrega')}
										{': '}
										{pedidoActual.fechaEntrega
											? darFormatoFecha(
													new Date(pedidoActual.fechaEntrega)
														.toISOString()
														.split('T')[0]
											  )
											: 'No existe Fecha'}
									</Typography>
								</Grid>
							</Fragment>
						)}
						{existeCliente && !pedidoActual.fechaEntrega && (
							<Alert variant='filled' severity='warning'>
								{t('advertencias.noFechaProgramada')}
							</Alert>
						)}
						{!existeCliente && existeCliente !== null && (
							<Alert variant='filled' severity='warning'>
								{t('advertencias.clienteNoPortafolio')}
							</Alert>
						)}
						{!frecuenciaValida && frecuenciaValida !== null && (
							<Alert variant='filled' severity='warning'>
								El cliente está fuera de frecuencia
							</Alert>
						)}
						{existeCliente && pedidoActual.fechaEntrega && (
							<Fragment>
								<FormularioAgregarProducto
									agregarProductoAlPedidoCliente={
										validarAgregarProductoAlPedidoCliente
									}
									buscarPreciosProductos={buscarPreciosProductos}
									handleSubmit={handleSubmit}
									control={control}
									disabled={productoActual.codigoProductoConNombre === ''}
								/>
								<TablaProductos
									titulos={[t('general.producto'), t('general.precio')]}
									preciosProductos={preciosProductos}
									asignarProductoActual={asignarProductoActual}
								/>
								{pedidoActual.productosPedido.length > 0 && (
									<Fragment>
										<TarjetaPedido />
										<Grid
											container
											direction='row'
											justify='flex-end'
											alignItems='center'
										>
											<Button
												variant='contained'
												color='secondary'
												onClick={agregarPedidoAlListado}
												className={estilos.botonCerrarPedido}
											>
												{t('general.cerrarPedido').toUpperCase()}
											</Button>
										</Grid>
									</Fragment>
								)}
							</Fragment>
						)}
					</Grid>
				</Fragment>
			</Estructura>
		</>
	);
}
