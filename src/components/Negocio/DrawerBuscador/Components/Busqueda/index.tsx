import {useEffect, useState, memo} from 'react';
import {Box, Typography, IconButton} from '@mui/material';
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
import theme from 'theme';

interface Props {
	cantidadFiltrosAplicados: number;
	estadoInicialFiltros: FiltrosBusqueda;
	resultadosBusqueda: TPrecioProducto[];
	setFiltrosBusqueda: React.Dispatch<React.SetStateAction<FiltrosBusqueda>>;
	setInputBusqueda: React.Dispatch<React.SetStateAction<string>>;
	setOpenBuscador: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Busqueda: React.VFC<Props> = memo(
	({
		cantidadFiltrosAplicados,
		estadoInicialFiltros,
		resultadosBusqueda,
		setFiltrosBusqueda,
		setInputBusqueda,
		setOpenBuscador,
	}) => {
		const classes = useEstilos();
		const {t} = useTranslation();
		const clienteActual = useObtenerClienteActual();

		const visitaActual = useObtenerVisitaActual();

		const {venta, canje} = visitaActual.pedidos;

		const dispatch = useAppDispatch();

		const [codigosProductos, setCodigosProductos] = useState<number[]>([]);

		useEffect(() => {
			setCodigosProductos([]);
		}, [resultadosBusqueda, cantidadFiltrosAplicados]);

		const onChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
			const {value, checked} = e.target;

			if (checked) {
				setCodigosProductos([...codigosProductos, +value]);
				return;
			}

			setCodigosProductos(
				codigosProductos.filter((codigo) => codigo !== +value)
			);
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
			setCodigosProductos([]);
		};

		return (
			<>
				{!!resultadosBusqueda.length && (
					<>
						<Box
							display='flex'
							flex='1'
							flexDirection='column'
							gap='14px'
							padding='20px 14px'
							marginBottom='50px'
						>
							{resultadosBusqueda.map((producto) => {
								return (
									<Box
										alignItems='center'
										display='flex'
										gap='10px'
										key={producto.codigoProducto}
									>
										<input
											checked={codigosProductos.includes(
												producto.codigoProducto
											)}
											className={classes.inputCheckbox}
											id={producto.nombreProducto}
											name={producto.nombreProducto}
											onChange={onChangeCheckbox}
											type='checkbox'
											value={producto.codigoProducto}
										/>
										<label htmlFor={producto.nombreProducto}>
											<Typography
												color='#565657'
												fontFamily='Open Sans'
												variant='caption'
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
							{!!codigosProductos.length && (
								<IconButton sx={{padding: 0}} onClick={borrarTodo}>
									<Box
										className={classes.button}
										sx={{
											background: '#fff',
											border: `1px solid ${theme.palette.secondary.main}`,
										}}
									>
										<BorrarIcon height={13} width={13} />
										<Typography
											color='secondary'
											fontFamily='Open Sans'
											variant='subtitle3'
										>
											{t('general.borrarSeleccion')}
										</Typography>
									</Box>
								</IconButton>
							)}
							<IconButton
								disabled={codigosProductos.length === 0}
								onClick={agregarProductosAlPedido}
								sx={{
									padding: 0,
									opacity: !!codigosProductos.length ? 1 : 0.5,
								}}
							>
								<Box className={classes.button}>
									<Typography
										color='#fff'
										fontFamily='Open Sans'
										variant='subtitle3'
									>
										{t('general.agregar')}
									</Typography>
								</Box>
							</IconButton>
						</Box>
					</>
				)}

				{resultadosBusqueda.length === 0 && (
					<Box
						display='flex'
						flexDirection='column'
						gap='16px'
						justifyContent='center'
						maxWidth='360px'
						paddingTop='63px'
						width='100%'
					>
						<Box display='flex' justifyContent='flex-end'>
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
	},
	(prev, next) => {
		return (
			JSON.stringify(prev.resultadosBusqueda) ===
			JSON.stringify(next.resultadosBusqueda)
		);
	}
);
