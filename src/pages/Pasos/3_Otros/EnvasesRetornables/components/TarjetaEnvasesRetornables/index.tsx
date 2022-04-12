import {TConsolidadoImplicitos, TPrecioProducto} from 'models';
import {TarjetaDoble} from 'components/UI';
import {useEffect, useState} from 'react';
import {
	useInicializarPreciosProductosDelClienteActual,
	useObtenerDatosCliente,
} from 'hooks';
import {
	useObtenerClienteActual,
	useObtenerConfiguracion,
	useObtenerVisitaActual,
} from 'redux/hooks';
import TarjetaDobleDerecha from './components/TarjetaDobleDerecha';
import TarjetaDobleIzquierda from './components/TarjetaDobleIzquierda';
import {restablecerEnvasesConError} from 'redux/features/visitaActual/visitaActualSlice';
import {useAppDispatch} from 'redux/hooks';
import {useObtenerProductoPorCodigo} from 'hooks/useObtenerProductoPorCodigo';
import {validarSubUnidades} from 'utils/validaciones';

interface Props {
	envase: TConsolidadoImplicitos;
}

const TarjetaEnvasesRetornables: React.VFC<Props> = ({envase}) => {
	const [preciosProductos, setPreciosProductos] = useState<TPrecioProducto[]>(
		[]
	);
	const visitaActual = useObtenerVisitaActual();

	useInicializarPreciosProductosDelClienteActual(setPreciosProductos);

	const configuracion = useObtenerConfiguracion();
	const dispatch = useAppDispatch();

	const [productoPedido, setProductoPedido] = useState({
		unidades: 0,
		subUnidades: 0,
	}); //

	const productoEnvase = preciosProductos.find(
		(producto: TPrecioProducto) =>
			producto.codigoProducto === envase.codigoImplicito
	);

	useEffect(() => {
		let unidadesContador = 0;
		let subUnidadesContador = 0;
		Object.values(visitaActual.pedidos).forEach((pedido) => {
			const producto = pedido.productos.find(
				(producto) =>
					producto.codigoProducto === envase.codigoImplicito &&
					producto.tipoPago === envase.tipoPago
			);
			if (producto) {
				unidadesContador = unidadesContador + producto?.unidades;
				subUnidadesContador = subUnidadesContador + producto?.subUnidades;
			}
		});

		setProductoPedido({
			unidades: unidadesContador,
			subUnidades: subUnidadesContador,
		});
	}, [envase]);

	useEffect(() => {
		dispatch(restablecerEnvasesConError());
	}, []);

	const pedidosEnvasesHabilitados =
		configuracion.tipoPedidoEnvasesHabilitados.map((tipoEnvases) =>
			configuracion.tipoPedidos.find(
				(tipoPedidos) => tipoPedidos.codigo === tipoEnvases
			)
		);

	const tipoPedidosEnvases = pedidosEnvasesHabilitados.map((tipoEnvases) => {
		if (!tipoEnvases) return;
		const pedidoActual = visitaActual.pedidos[tipoEnvases.codigo];

		const productoActual = pedidoActual?.productos.find(
			(producto) =>
				producto?.codigoProducto === envase?.codigoImplicito &&
				producto?.tipoPago === envase.tipoPago
		);

		return {
			tipoEnvase: tipoEnvases?.descripcionCorta,
			unidades: productoActual ? productoActual.unidades : 0,
			subUnidades: productoActual ? productoActual.subUnidades : 0,
		};
	});

	const [valoresEnvase, setValoresEnvase] = useState(tipoPedidosEnvases);

	const buscarPedidoValorizado = configuracion.tipoPedidoEnvasesHabilitados.map(
		(tipoEnvases) =>
			configuracion.tipoPedidos.find(
				(tipoPedidos) => tipoPedidos.codigo === tipoEnvases
			)?.esValorizado === true
	);

	let tieneTipoPedidoValorizado = buscarPedidoValorizado.includes(true);

	const clienteActual = useObtenerClienteActual();
	const {datosCliente} = useObtenerDatosCliente(clienteActual.codigoCliente);

	const producto = datosCliente?.portafolio.find(
		(p) => p.codigoProducto === envase.codigoImplicito
	);

	const {
		tipoPedidos: [
			,
			,
			{habilitaSubunidades: subUnidadesVenta},
			{habilitaSubunidades: subUnidadesPrestamo},
		],
	} = useObtenerConfiguracion();

	const habilitaSubUnidadesVenta = validarSubUnidades(
		producto?.esVentaSubunidades ?? false,
		subUnidadesVenta
	);

	const habilitaSubUnidadesPrestamo = validarSubUnidades(
		producto?.esVentaSubunidades ?? false,
		subUnidadesPrestamo
	);

	return (
		<TarjetaDoble
			widthDerecha='134px'
			widthIzquierda='170px'
			izquierda={
				<TarjetaDobleIzquierda
					envase={envase}
					tieneTipoPedidoValorizado={tieneTipoPedidoValorizado}
					habilitaSubUnidadesVenta={habilitaSubUnidadesVenta}
					habilitaSubUnidadesPrestamo={habilitaSubUnidadesPrestamo}
				/>
			}
			derecha={
				<TarjetaDobleDerecha
					pedidosEnvasesHabilitados={pedidosEnvasesHabilitados}
					stateTipoEnvases={{valoresEnvase, setValoresEnvase}}
					envase={envase}
					productoEnvase={productoEnvase}
					productoPedido={productoPedido}
					habilitaSubUnidadesVenta={habilitaSubUnidadesVenta}
					habilitaSubUnidadesPrestamo={habilitaSubUnidadesPrestamo}
				/>
			}
		></TarjetaDoble>
	);
};

export default TarjetaEnvasesRetornables;
