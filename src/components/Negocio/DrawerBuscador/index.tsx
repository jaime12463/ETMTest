import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import {BorrarIcon, BuscarIcon} from 'assests/iconos';
import {Filter} from 'assests/iconos/Filter';
import Drawer from 'components/UI/Drawer';
import {useTranslation} from 'react-i18next';
import DrawerFiltros from 'components/UI/DrawerFiltros';
import useEstilos from './useEstilos';
import {
	useDebounce,
	useFiltrarPreciosProductosDelClienteActual,
	useObtenerDatosTipoPedido,
	useObtenerPresupuestosTipoPedidoActual,
} from 'hooks';
import {TPrecioProducto, TProductoPedido} from 'models';
import {
	useAppDispatch,
	useObtenerClienteActual,
	useObtenerVisitaActual,
} from 'redux/hooks';
import {agregarProductoDelPedidoActual} from 'redux/features/visitaActual/visitaActualSlice';
import {BusquedaSinResultados} from 'assests/iconos/BusquedaSinResultados';
import {
	ETiposDeFiltro,
	FiltroProductos,
} from 'utils/procesos/filtros/productos/filtroProductos';

interface Props {
	openBuscador: boolean;
	setOpenBuscador: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ResultadoBusqueda extends TPrecioProducto {
	checked: boolean;
}

const DrawerBuscador: React.FC<Props> = ({openBuscador, setOpenBuscador}) => {
	const classes = useEstilos();
	const {t} = useTranslation();
	const [abrirFiltros, setAbrirFiltros] = React.useState<boolean>(false);

	const [inputBusqueda, setInputBusqueda] = React.useState<string>('');

	const debouncedInput = useDebounce(inputBusqueda);

	const [resultadosBusqueda, setResultadosBusqueda] = React.useState<
		ResultadoBusqueda[]
	>([]);

	const clienteActual = useObtenerClienteActual();

	const visitaActual = useObtenerVisitaActual();

	const {venta, canje} = visitaActual.pedidos;

	const dispatch = useAppDispatch();

	const onChangeBusqueda = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputBusqueda(e.target.value);
	};

	const preciosProductosDelClienteActual =
		useFiltrarPreciosProductosDelClienteActual();

	const onChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {value} = e.target;

		setResultadosBusqueda(
			resultadosBusqueda.map((producto) => {
				// Se mapea el array de busqueda y se cambia el checked del producto seleccionado
				if (producto.codigoProducto === Number(value)) {
					return {...producto, checked: !producto.checked};
				}

				return producto;
			})
		);
	};

	const borrarTodo = () => {
		setInputBusqueda('');
	};

	const agregarProductosAlPedido = () => {
		// Filtramos los productos seleccionados
		const productosParaAgregar = resultadosBusqueda.filter((producto) => {
			if (producto.checked) {
				const {checked, ...productoSinCheck} = producto;

				return productoSinCheck;
			}
		});

		for (const producto of productosParaAgregar) {
			// Verificamos el tipo de pedido para saber si el producto ya está en el pedido
			const existeEnPedido =
				visitaActual.tipoPedidoActual === 'venta'
					? venta.productos.find(
							(p) => p.codigoProducto === producto.codigoProducto
					  )
					: canje.productos.find(
							(p) => p.codigoProducto === producto.codigoProducto
					  );

			// Si el producto ya está en el pedido, ignoramos el agregado
			if (existeEnPedido) continue;

			const productoParaAgregar: TProductoPedido = {
				...producto,
				unidades: 0,
				subUnidades: 0,
				total: 0,
				tipoPago: clienteActual.tipoPagoActual,
				catalogoMotivo: '',
				estado: 'activo',
				preciosBase: {
					unidad: producto.precioConImpuestoUnidad,
					subUnidad: producto.precioConImpuestoSubunidad,
				},
				preciosNeto: {
					unidad: producto.precioConImpuestoUnidad,
					subUnidad: producto.precioConImpuestoSubunidad,
				},
			};

			dispatch(
				agregarProductoDelPedidoActual({productoPedido: productoParaAgregar})
			);
		}
		setOpenBuscador(false);
	};

	const obtenerDatosTipoPedido = useObtenerDatosTipoPedido();
	const obtenerPresupuestosTipoPedidoActual =
		useObtenerPresupuestosTipoPedidoActual();

	const datosTipoPedidoActual = obtenerDatosTipoPedido();
	const presupuestoTipoPedido = obtenerPresupuestosTipoPedidoActual();
	const filtroProductos = new FiltroProductos(preciosProductosDelClienteActual);

	React.useEffect(() => {
		setResultadosBusqueda([]);

		if (debouncedInput.length >= 3 && preciosProductosDelClienteActual) {
			filtroProductos.agregarFiltro(ETiposDeFiltro.Venta);
			const resultados = filtroProductos.ejecutar(debouncedInput);

			if (resultados?.length) {
				for (const producto of resultados) {
					// Se valida que se pueda mostrar el producto para ser agregado al pedido
					if (
						(!datosTipoPedidoActual?.validaPresupuesto &&
							!datosTipoPedidoActual?.tipoProductosHabilitados.includes(
								producto.tipoProducto
							)) ||
						(datosTipoPedidoActual?.validaPresupuesto &&
							!presupuestoTipoPedido?.tieneProductosHabilitados &&
							!datosTipoPedidoActual?.tipoProductosHabilitados.includes(
								producto.tipoProducto
							)) ||
						(datosTipoPedidoActual?.validaPresupuesto &&
							presupuestoTipoPedido?.tieneProductosHabilitados &&
							!presupuestoTipoPedido.productosHabilitados.includes(
								producto.codigoProducto
							))
					) {
						// En caso de que se cumpla alguna de estas tres condiciones el producto se descarta de las opciones para agregar
						continue;
					}

					// Se agregan a los resultados de búsqueda
					setResultadosBusqueda((state) => [
						...state,
						{...producto, checked: false},
					]);
				}
				return;
			}
		}

		//Si no hay resultados o se borra la búsqueda vaciamos el array de resultados
		setResultadosBusqueda([]);
	}, [debouncedInput]);

	React.useEffect(() => {
		return () => {
			// Limpieza del estado al cerrar el drawer
			setInputBusqueda('');
		};
	}, [openBuscador]);

	return (
		<Drawer
			open={openBuscador}
			setOpen={setOpenBuscador}
			titulo={
				<Box padding='37px 14px 14px' width='100%'>
					<Typography
						variant='subtitle2'
						fontFamily='Open Sans'
						fontWeight={700}
						color='#fff'
					>
						{t('general.catalogoDeProductos')}
					</Typography>
					<Box
						alignItems='center'
						display='flex'
						justifyContent='space-between'
						marginTop='12px'
					>
						<Box position='relative'>
							<TextField
								autoFocus
								className={classes.inputBuscador}
								sx={{padding: '4px 12px'}}
								type='text'
								variant='standard'
								InputProps={{
									disableUnderline: true,
									style: {fontSize: '12px'},
								}}
								placeholder={`${t('general.buscarProducto')}`}
								value={inputBusqueda}
								onChange={onChangeBusqueda}
							/>
							<IconButton
								sx={{
									padding: 0,
									position: 'absolute',
									right: '9px',
									top: '50%',
									transform: 'translateY(-50%)',
								}}
							>
								<BuscarIcon />
							</IconButton>
						</Box>
						<IconButton sx={{padding: 0}} onClick={() => setAbrirFiltros(true)}>
							<Filter />
						</IconButton>
					</Box>
				</Box>
			}
		>
			{resultadosBusqueda.length > 0 ? (
				<>
					<Box
						display='flex'
						flexDirection='column'
						gap='14px'
						padding='20px 14px'
					>
						{resultadosBusqueda.map((producto: ResultadoBusqueda) => {
							return (
								<Box
									alignItems='center'
									display='flex'
									gap='10px'
									key={producto.codigoProducto}
								>
									<input
										type='checkbox'
										name={producto.nombreProducto}
										id={producto.nombreProducto}
										className={classes.inputCheckbox}
										value={producto.codigoProducto}
										onChange={onChangeCheckbox}
										checked={producto.checked}
									/>
									<label htmlFor={producto.nombreProducto}>
										<Typography
											variant='caption'
											fontFamily='Open Sans'
											color='#565657'
										>
											{`${
												producto.codigoProducto
											} - ${producto.nombreProducto.toUpperCase()}`}
										</Typography>
									</label>
								</Box>
							);
						})}
					</Box>
					<Box className={classes.buttonContainer}>
						<IconButton sx={{padding: 0}} onClick={borrarTodo}>
							<Box className={classes.button}>
								<BorrarIcon height={13} width={13} fill='#fff' />
								<Typography
									variant='subtitle3'
									fontFamily='Open Sans'
									color='#fff'
								>
									{t('general.borrarTodo')}
								</Typography>
							</Box>
						</IconButton>
						<IconButton
							onClick={agregarProductosAlPedido}
							sx={{
								padding: 0,
								opacity: resultadosBusqueda.some((producto) => producto.checked)
									? 1
									: 0.5,
							}}
							disabled={resultadosBusqueda.length === 0}
						>
							<Box className={classes.button}>
								<Typography
									variant='subtitle3'
									fontFamily='Open Sans'
									color='#fff'
								>
									{t('general.agregar')}
								</Typography>
							</Box>
						</IconButton>
					</Box>
				</>
			) : debouncedInput.length < 3 ? (
				<Box display='flex' justifyContent='center' padding='103px 0 0 0'>
					<Typography
						variant='subtitle2'
						fontFamily='Open Sans'
						fontWeight={700}
						color='#B2B2B2'
						textAlign='center'
						width='24ch'
					>
						{t('general.busquedaVacia')}
					</Typography>
				</Box>
			) : (
				<Box
					display='flex'
					flexDirection='column'
					justifyContent='center'
					gap='16px'
					paddingTop='63px'
				>
					<Box display='flex' justifyContent='end'>
						<BusquedaSinResultados />
					</Box>
					<Box
						alignSelf='center'
						alignItems='center'
						display='flex'
						flexDirection='column'
						justifyContent='center'
					>
						<Typography variant='h3' color='primary' marginBottom='4px'>
							¡Lo sentimos!
						</Typography>
						<Typography
							variant='body3'
							fontFamily='Open Sans'
							marginBottom='18px'
							textAlign='center'
							width='18ch'
						>
							No existen resultados para tu búsqueda
						</Typography>
						<Typography variant='subtitle3' fontFamily='Open Sans'>
							Intenta con otro producto
						</Typography>
					</Box>
				</Box>
			)}

			<DrawerFiltros open={abrirFiltros} setOpen={setAbrirFiltros}>
				<Typography variant='subtitle3'>
					Próximamente filtros de búsqueda
				</Typography>
			</DrawerFiltros>
		</Drawer>
	);
};

export default DrawerBuscador;
