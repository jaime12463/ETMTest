import React from 'react';
import {Box, IconButton, Typography} from '@mui/material';
import {CerrarIcon} from 'assests/iconos';
import {useObtenerProductosConDescuentoEscalonado} from 'hooks';
import {useAppDispatch, useObtenerClienteActual} from 'redux/hooks';
import {useTranslation} from 'react-i18next';
import {TPrecioProducto, TProductoPedido} from 'models';
import {agregarProductoDelPedidoActual} from 'redux/features/visitaActual/visitaActualSlice';
import {ListaProductos} from './components/ListaProductos';

interface Props {
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalDescuentoEscalondo: React.VFC<Props> = ({setOpen}) => {
	const {t} = useTranslation();
	const clienteActual = useObtenerClienteActual();
	const productos = useObtenerProductosConDescuentoEscalonado();
	const dispatch = useAppDispatch();
	const [productosParaMostrar, setProductosParaMostrar] =
		React.useState<TPrecioProducto[]>(productos);

	const agregarProductoAlPedido = (producto: TPrecioProducto) => {
		const productoParaAgregar = {
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
		} as TProductoPedido;

		dispatch(
			agregarProductoDelPedidoActual({productoPedido: productoParaAgregar})
		);

		setProductosParaMostrar((state) =>
			state.filter((p) => p.codigoProducto !== producto.codigoProducto)
		);
	};

	return (
		<Box
			borderRadius='8px'
			display='flex'
			flexDirection='column'
			padding='16px 18px 30px 18px'
			sx={{background: '#fff'}}
			width='100%'
		>
			<IconButton
				onClick={() => setOpen((state) => !state)}
				sx={{alignSelf: 'flex-end', padding: 0}}
			>
				<CerrarIcon />
			</IconButton>
			<Typography
				color='#000'
				marginTop='16px'
				variant='subtitle2'
				textAlign='center'
			>
				{t('descuentos.descuentosEscalonados')}
			</Typography>
			<Typography
				fontFamily='Open Sans'
				marginTop='8px'
				variant='body3'
				textAlign='center'
			>
				{t('descuentos.mensajeModalDescuentosEscalonados')}
			</Typography>
			<ListaProductos
				agregarProductoAlPedido={agregarProductoAlPedido}
				productosParaMostrar={productosParaMostrar}
			/>
		</Box>
	);
};
