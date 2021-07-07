import {Fragment, SyntheticEvent, useEffect, useState} from 'react';
import {selectPedidoActual} from 'redux/features/pedidoActual/pedidoActualSlice';
import {
	TInputsFormularioAgregarProducto,
	TPedidoCliente,
	TPrecioProducto,
	TPrecioSinVigencia,
} from 'models';
import {useAppSelector} from 'redux/hooks';
import {Button, Chip, Grid, Snackbar, Typography} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import useEstilos from './useEstilos';
import {useForm} from 'react-hook-form';
import {Alert} from '@material-ui/lab';
import {darFormatoFecha} from 'utils/methods';
import {
	TablaProductos,
	FormularioAgregarProducto,
	TotalPedido,
	Input,
	Estructura,
} from 'components';
import {
	useAgregarPedidoAlListado,
	useValidarAgregarProductoAlPedidoCliente,
	useAsignarProductoActual,
	useBuscarPreciosProductos,
	usePermiteSubUnidades,
	useMostrarAdvertenciaEnDialogo,
	useResetPedidoActual,
	useResetLineaActual,
	useAgregarProductoAlPedidoCliente,
	useManejadorConfirmarAgregarPedido,
} from './hooks';
import Dialogo, {Props as PropsDialogo} from 'components/Dialogo';

export default function TomaDePedidos() {
	const [preciosProductos, setPreciosProductos] = useState<TPrecioProducto[]>(
		[]
	);

	const [avisoPedidoGuardadoExitoso, setAvisoPedidoGuardadoExitoso] =
		useState<boolean>(false);

	const [mostarDialogo, setMostarDialogo] = useState<boolean>(false);

	const [parametrosDialogo, setParametrosDialogo] = useState<PropsDialogo>({
		mensaje: '',
		manejadorClick: () => {},
		conBotonCancelar: false,
		dataCy: '',
	});

	const [productoActual, setProductoActual] = useState<TPrecioSinVigencia>({
		codigoProductoConNombre: '',
		precioConImpuestoUnidad: 0,
		precioConImpuestoSubunidad: 0,
	});

	const {t} = useTranslation();

	const estilos = useEstilos();

	const {control, handleSubmit, setValue, getValues} =
		useForm<TInputsFormularioAgregarProducto>();

	const pedidoActual: TPedidoCliente = useAppSelector(selectPedidoActual);

	const [pedidosCliente, setPedidosCliente] = useState<number>(0);

	const resetLineaActual = useResetLineaActual(setValue, setProductoActual);

	const resetPedidoActual = useResetPedidoActual(
		setPreciosProductos,
		resetLineaActual,
		setValue,
		setPedidosCliente
	);

	const agregarProductoAlPedidoCliente = useAgregarProductoAlPedidoCliente(
		productoActual,
		resetLineaActual
	);

	const manejadorConfirmarAgregarPedido = useManejadorConfirmarAgregarPedido(
		productoActual,
		getValues,
		agregarProductoAlPedidoCliente
	);

	const mostrarAdvertenciaEnDialogo = useMostrarAdvertenciaEnDialogo(
		setMostarDialogo,
		setParametrosDialogo
	);

	const asignarProductoActual = useAsignarProductoActual(
		setProductoActual,
		setValue
	);

	const validarAgregarProductoAlPedidoCliente =
		useValidarAgregarProductoAlPedidoCliente(
			mostrarAdvertenciaEnDialogo,
			manejadorConfirmarAgregarPedido,
			agregarProductoAlPedidoCliente
		);

	const buscarPreciosProductos = useBuscarPreciosProductos(
		preciosProductos,
		setPreciosProductos
	);

	const agregarPedidoAlListado = useAgregarPedidoAlListado(
		setAvisoPedidoGuardadoExitoso,
		mostrarAdvertenciaEnDialogo,
		resetPedidoActual
	);

	const permiteSubUnidades = usePermiteSubUnidades();

	const cerrarAvisoPedidoGuardado = (event: SyntheticEvent<Element, Event>) => {
		setAvisoPedidoGuardadoExitoso(false);
	};

	//TODO: Deberia preguntar antes de salir si lo desea?
/* 	useEffect(() => {
		return () => {
			resetPedidoActual();
		};
	}, []); */

	return (
		<>
			<Estructura
				titulo={'titulos.tomaPedido'}
				esConFechaHaciaAtras={true}
				esConLogoInferior={false}
			>
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
					{pedidoActual.codigoCliente !== '' && pedidoActual.fechaEntrega && (
						<Fragment>
							<Grid item xs={6} sm={6}>
								<Typography variant='body2' component='p' data-cy='razonSocial'>
									{pedidoActual.razonSocial}
								</Typography>
							</Grid>
							{pedidosCliente != 0 && (
								<Grid item xs={6} sm={12}>
									<Typography
										variant='body2'
										component='p'
										data-cy='pedidosCliente'
										display='inline'
									>
										{t('general.pedidosCliente')}
									</Typography>
									<Chip
										label={pedidosCliente}
										data-cy={`numeroPedidosCliente-${pedidosCliente}`}
									/>
								</Grid>
							)}
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
					{pedidoActual.codigoCliente !== '' && pedidoActual.fechaEntrega && (
						<Fragment>
							<FormularioAgregarProducto
								agregarProductoAlPedidoCliente={
									validarAgregarProductoAlPedidoCliente
								}
								buscarPreciosProductos={buscarPreciosProductos}
								handleSubmit={handleSubmit}
								control={control}
								disabled={productoActual.codigoProductoConNombre === ''}
								deshabilitarSubunidades={
									!permiteSubUnidades(
										pedidoActual.codigoCliente,
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
			</Estructura>
		</>
	);
}
