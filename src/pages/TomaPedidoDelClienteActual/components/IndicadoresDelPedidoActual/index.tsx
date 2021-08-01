import {Grid} from '@material-ui/core';
import {BarraDeProgeso, Center} from 'components/UI';
import {TCliente, TClienteActual} from 'models';
import {useObtenerDatosCliente, useCalcularTotalPedido} from 'hooks';
import {useObtenerClienteActual} from 'redux/hooks';

const IndicadoresDelPedidoActual = () => {
	const {obtenerDatosCliente} = useObtenerDatosCliente();
	const calcularTotalPedido = useCalcularTotalPedido();
	const clienteActual: TClienteActual = useObtenerClienteActual();
	const datosCliente: TCliente | undefined = obtenerDatosCliente(
		clienteActual.codigoCliente
	);

	const indicadores = [
		{
			titulo: 'Pedido minimo',
			valorMax: datosCliente?.configuracionPedido.ventaMinima?.montoVentaMinima,
			valor: calcularTotalPedido.totalPrecio,
		},
		{
			titulo: 'Pedido maximo',
			valorMax:
				datosCliente?.configuracionPedido.ventaContadoMaxima
					?.montoVentaContadoMaxima,
			valor: calcularTotalPedido.totalPrecio,
			colores: ['verde', 'amarillo', 'rojo'],
		},
		{
			titulo: 'Credito disponible',
			valorMax: datosCliente?.informacionCrediticia.disponible,
			valor: 0,
			colores: ['verde', 'amarillo', 'rojo'],
		},
	];

	return (
		<Grid container direction='row'>
			{indicadores.map((el, i) => (
				<Grid item xs={4} key={i}>
					<Center>
						<BarraDeProgeso
							titulo={el.titulo}
							max={el.valorMax}
							valor={el.valor}
							colores={el.colores}
						/>
					</Center>
				</Grid>
			))}
		</Grid>
	);
};

export default IndicadoresDelPedidoActual;
