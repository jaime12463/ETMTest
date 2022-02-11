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
import {useDebounce, useFiltrarPreciosProductosDelClienteActual} from 'hooks';
import {TPrecioProducto, TProductoPedido} from 'models';
import {
	useAppDispatch,
	useObtenerClienteActual,
	useObtenerVisitaActual,
} from 'redux/hooks';
import {agregarProductoDelPedidoActual} from 'redux/features/visitaActual/visitaActualSlice';

interface Props {
	openBuscador: boolean;
	setOpenBuscador: React.Dispatch<React.SetStateAction<boolean>>;
}

const DrawerBuscador: React.FC<Props> = ({openBuscador, setOpenBuscador}) => {
	const classes = useEstilos();
	const {t} = useTranslation();
	const [abrirFiltros, setAbrirFiltros] = React.useState<boolean>(false);

	const [inputBusqueda, setInputBusqueda] = React.useState<string>('');

	const debouncedInput = useDebounce(inputBusqueda);

	const [resultadosBusqueda, setResultadosBusqueda] = React.useState<
		TPrecioProducto[]
	>([]);

	const [productosAgregados, setProductosAgregados] = React.useState<
		TPrecioProducto[]
	>([]);

	const clienteActual = useObtenerClienteActual();

	const {venta} = useObtenerVisitaActual().pedidos;

	const dispatch = useAppDispatch();

	const onChangeBusqueda = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputBusqueda(e.target.value);
	};

	const onChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {checked, value} = e.target;

		if (checked) {
			//Si el checkbox está chequeado, agregamos el producto al array de productos agregados
			const producto = resultadosBusqueda.filter(
				(producto) => producto.codigoProducto === Number(value)
			);

			setProductosAgregados([...productosAgregados, ...producto]);
			return;
		}

		//Si el checkbox está deschequeado, lo eliminamos del array de productos agregados
		setProductosAgregados(
			productosAgregados.filter(
				(producto) => producto.codigoProducto !== Number(value)
			)
		);
	};

	const borrarTodo = () => {
		setProductosAgregados([]);
		setInputBusqueda('');
	};

	const agregarProductosAlPedido = () => {
		for (const producto of productosAgregados) {
			// Verificamos si el producto ya está en el pedido
			const existeEnPedido = venta.productos.find(
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

	const preciosProductosDelClienteActual =
		useFiltrarPreciosProductosDelClienteActual();

	React.useEffect(() => {
		if (debouncedInput && preciosProductosDelClienteActual) {
			const resultados = preciosProductosDelClienteActual.filter(
				(producto: TPrecioProducto) => {
					//Si el nombre o codigo del producto contiene el texto de búsqueda, lo agregamos al array de resultados
					return (
						(producto.nombreProducto.toLowerCase().includes(debouncedInput) ||
							producto.codigoProducto.toString().includes(debouncedInput)) &&
						!producto.promoPush
					);
				}
			);

			if (resultados.length) {
				//Si hay resultados, los mostramos
				setResultadosBusqueda(resultados);
				return;
			}
			//Si no hay resultados, vaciamos el array de resultados
			setResultadosBusqueda([]);
		}
	}, [debouncedInput]);

	React.useEffect(() => {
		return () => {
			setInputBusqueda('');
			setProductosAgregados([]);
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
					<Box display='flex' flexDirection='column' gap='14px' padding='0 4px'>
						{resultadosBusqueda.map((producto: TPrecioProducto) => {
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
								opacity: productosAgregados.length > 0 ? 1 : 0.5,
							}}
							disabled={productosAgregados.length === 0}
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
			) : (
				<Typography
					variant='subtitle2'
					fontFamily='Open Sans'
					fontWeight={700}
					color='#B2B2B2'
					padding='103px 54px 0 54px'
					textAlign='center'
				>
					{t('general.busquedaVacia')}
				</Typography>
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
