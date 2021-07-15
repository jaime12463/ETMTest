import {Fragment, SyntheticEvent, useEffect, useState} from 'react';
import {Button, Grid, Snackbar, Typography} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import useEstilos from './useEstilos';
import {useForm} from 'react-hook-form';
import {Alert} from '@material-ui/lab';
import {darFormatoFecha} from 'utils/methods';
import {
	TClienteActual,
	TInputsFormularioAgregarProducto,
	TPedidoActual,
	TPrecioProducto,
	TPrecioSinVigencia,
} from 'models';
import {
	TablaProductos,
	FormularioAgregarProducto,
	TotalPedido,
	Estructura,
	Dialogo,
} from 'components';
import {
	useAgregarPedidoActualAPedidosClientes,
	useAgregarProductoAlPedidoActual,
	useAsignarProductoActual,
	useFiltrarPreciosProductosDelClienteActual,
	useValidarAgregarProductoAlPedidoCliente,
	useManejadorConfirmarAgregarPedido,
	useValidarProductoPermiteSubUnidades,
	useResetLineaActual,
	useResetPedidoActual,
	useInicializarPreciosProductosDelClienteActual,
} from './hooks';
import {
	useMostrarAdvertenciaEnDialogo,
	useObtenerClienteActual,
	useObtenerPedidoActual,
} from 'hooks';

export default function TomaDePedidos() {
	const [preciosProductos, setPreciosProductos] = useState<TPrecioProducto[]>(
		[]
	);

	const [
		avisoPedidoGuardadoExitoso,
		setAvisoPedidoGuardadoExitoso,
	] = useState<boolean>(false);

	const [productoActual, setProductoActual] = useState<TPrecioSinVigencia>({
		codigoProductoConNombre: '',
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

	const pedidoActual: TPedidoActual = useObtenerPedidoActual();

	const clienteActual: TClienteActual = useObtenerClienteActual();

	const resetLineaActual = useResetLineaActual(setValue, setProductoActual);

	const resetPedidoActual = useResetPedidoActual(
		setPreciosProductos,
		resetLineaActual,
		setValue
	);

	const agregarProductoAlPedidoActual = useAgregarProductoAlPedidoActual(
		productoActual,
		resetLineaActual
	);

	const manejadorConfirmarAgregarPedido = useManejadorConfirmarAgregarPedido(
		productoActual,
		getValues,
		agregarProductoAlPedidoActual
	);

	const {
		mostrarAdvertenciaEnDialogo,
		mostarDialogo,
		parametrosDialogo,
	} = useMostrarAdvertenciaEnDialogo();

	const asignarProductoActual = useAsignarProductoActual(
		setProductoActual,
		setValue
	);

	const validarAgregarProductoAlPedidoCliente = useValidarAgregarProductoAlPedidoCliente(
		mostrarAdvertenciaEnDialogo,
		manejadorConfirmarAgregarPedido,
		agregarProductoAlPedidoActual
	);

	const filtrarPreciosProductosDelClienteActual = useFiltrarPreciosProductosDelClienteActual(
		preciosProductos,
		setPreciosProductos
	);

	const agregarPedidoActualAPedidosClientes = useAgregarPedidoActualAPedidosClientes(
		setAvisoPedidoGuardadoExitoso,
		mostrarAdvertenciaEnDialogo,
	);

	const validarProductoPermiteSubUnidades = useValidarProductoPermiteSubUnidades();

	useInicializarPreciosProductosDelClienteActual(setPreciosProductos);

	const cerrarAvisoPedidoGuardado = (event: SyntheticEvent<Element, Event>) => {
		setAvisoPedidoGuardadoExitoso(false);
	};

	//TODO: Deberia preguntar antes de salir si lo desea?
	useEffect(() => {
		return () => {
			resetPedidoActual();
		};
	}, []);

	return (
		<>
			<Estructura
				titulo={'titulos.ingresoPedido'}
				esConFechaHaciaAtras={true}
			>
				<Estructura.Cuerpo>
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
						{clienteActual.codigoCliente !== '' && pedidoActual.fechaEntrega && (
							<Fragment>
								<Grid item xs={6} sm={6}>
									<Typography variant='body2' component='p' data-cy='razonSocial'>
										{clienteActual.razonSocial}
									</Typography>
								</Grid>
								<Grid item xs={12} sm={12}>
									<Typography
										variant='body2'
										component='p'
										data-cy='fechaEntrega'
									>
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
						{clienteActual.codigoCliente !== '' && pedidoActual.fechaEntrega && (
							<Fragment>
								<FormularioAgregarProducto
									agregarProductoAlPedidoCliente={
										validarAgregarProductoAlPedidoCliente
									}
									buscarPreciosProductos={filtrarPreciosProductosDelClienteActual}
									handleSubmit={handleSubmit}
									control={control}
									disabled={productoActual.codigoProductoConNombre === ''}
									deshabilitarSubunidades={
										!validarProductoPermiteSubUnidades(
											parseInt(
												getValues('codigoProductoConNombre')?.split(' ')[0]
											)
										)
									}
								/>
								<TablaProductos
									titulos={[
										t('general.codigo'),
										t('general.nombre'),
										t('general.precio'),
									]}
									preciosProductos={preciosProductos}
									asignarProductoActual={asignarProductoActual}
								/>
								
							</Fragment>
						)}
					</Grid>
				</Estructura.Cuerpo>
				<Estructura.PieDePagina>
					{pedidoActual.productosPedido.length > 0 && (
						<Fragment>
							<TotalPedido />
							<Grid
								container
								direction='row'
								justify='flex-end'
								alignItems='center'
							>
								<Button
									variant='contained'
									color='secondary'
									data-cy='boton-cerrarPedido'
									onClick={agregarPedidoActualAPedidosClientes}
									className={estilos.botonCerrarPedido}
								>
									{t('general.cerrarPedido').toUpperCase()}
								</Button>
							</Grid>
						</Fragment>
					)}
				</Estructura.PieDePagina>
			</Estructura>
		</>
	);
}
