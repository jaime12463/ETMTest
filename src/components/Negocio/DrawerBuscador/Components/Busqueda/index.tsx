import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import {BusquedaSinResultados} from 'assests/iconos/BusquedaSinResultados';
import {useTranslation} from 'react-i18next';
import useEstilos from '../../useEstilos';
import {BorrarIcon} from 'assests/iconos';
import {
	useAppDispatch,
	useObtenerClienteActual,
	useObtenerVisitaActual,
} from 'redux/hooks';
import {TPrecioProducto, TProductoPedido} from 'models';
import {agregarProductoDelPedidoActual} from 'redux/features/visitaActual/visitaActualSlice';
import {FiltrosBusqueda} from 'hooks/useObtenerFiltrosDelCliente';

interface Props {
	resultadosBusqueda: TPrecioProducto[];
	debouncedInput: string;
	setOpenBuscador: React.Dispatch<React.SetStateAction<boolean>>;
	setInputBusqueda: React.Dispatch<React.SetStateAction<string>>;
	setFiltrosBusqueda: React.Dispatch<React.SetStateAction<FiltrosBusqueda>>;
	estadoInicialFiltros: FiltrosBusqueda;
}

const Busqueda: React.FC<Props> = ({
	resultadosBusqueda,
	debouncedInput,
	setOpenBuscador,
	setInputBusqueda,
	setFiltrosBusqueda,
	estadoInicialFiltros,
}) => {
	const classes = useEstilos();
	const {t} = useTranslation();
	const clienteActual = useObtenerClienteActual();

	const visitaActual = useObtenerVisitaActual();

	const {venta, canje} = visitaActual.pedidos;

	const dispatch = useAppDispatch();

	const [codigosProductos, setCodigosProductos] = React.useState<number[]>([]);

	React.useEffect(() => {
		setCodigosProductos([]);
	}, [resultadosBusqueda]);

	const onChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {value, checked} = e.target;

		if (checked) {
			setCodigosProductos([...codigosProductos, +value]);
			return;
		}

		setCodigosProductos(codigosProductos.filter((codigo) => codigo !== +value));
	};

	const agregarProductosAlPedido = () => {
		// Filtramos los productos seleccionados
		const productosParaAgregar = resultadosBusqueda.filter((producto) => {
			return codigosProductos.includes(producto.codigoProducto);
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
				preciosPromo: {
					unidad: 0,
					subUnidad: 0,
				},
			};

			dispatch(
				agregarProductoDelPedidoActual({productoPedido: productoParaAgregar})
			);
		}
		setOpenBuscador(false);
	};

	const borrarTodo = () => {
		setInputBusqueda('');
		setFiltrosBusqueda(estadoInicialFiltros);
	};

	return (
		<>
			{resultadosBusqueda.length > 0 && (
				<>
					<Box
						display='flex'
						flexDirection='column'
						gap='14px'
						padding='20px 14px'
					>
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
								opacity: codigosProductos.length > 0 ? 1 : 0.5,
							}}
							disabled={codigosProductos.length === 0}
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
			)}

			{debouncedInput.length < 3 && resultadosBusqueda.length === 0 && (
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
			)}

			{debouncedInput.length >= 3 && resultadosBusqueda.length === 0 && (
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
							{t('general.loSentimos')}
						</Typography>
						<Typography
							variant='body3'
							fontFamily='Open Sans'
							marginBottom='18px'
							textAlign='center'
							width='18ch'
						>
							{t('general.noHayResultadosBusqueda')}
						</Typography>
						<Typography variant='subtitle3' fontFamily='Open Sans'>
							{t('general.intentaOtroProducto')}
						</Typography>
					</Box>
				</Box>
			)}
		</>
	);
};

export default Busqueda;
