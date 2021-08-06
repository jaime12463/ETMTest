import {Grid} from '@material-ui/core';
import {BarraDeProgeso, Center} from 'components/UI';
import {TCliente, TClienteActual} from 'models';
import {useObtenerDatosCliente, useCalcularTotalPedido} from 'hooks';
import {useObtenerClienteActual} from 'redux/hooks';
import {useTranslation} from 'react-i18next';

const IndicadoresDelPedidoActual = () => {
	const {t} = useTranslation();
	const {obtenerDatosCliente} = useObtenerDatosCliente();
	const calcularTotalPedido = useCalcularTotalPedido();
	const clienteActual: TClienteActual = useObtenerClienteActual();
	const datosCliente: TCliente | undefined = obtenerDatosCliente(
		clienteActual.codigoCliente
	);

	const indicadores = [
		{
			titulo: t('general.pedidoMinimo'),
			valorMax: datosCliente?.configuracionPedido.ventaMinima?.montoVentaMinima,
			valor: calcularTotalPedido.totalPrecio,
		},
		{
			titulo: t('general.pedidoMaximo'),
			valorMax:
				datosCliente?.configuracionPedido.ventaContadoMaxima
					?.montoVentaContadoMaxima,
			valor: calcularTotalPedido.totalPrecio,
			colores: ['verde', 'amarillo', 'rojo'],
		},
		{
			titulo: t('general.creditoDisponible'),
			valorMax: datosCliente?.informacionCrediticia.disponible,
			valor: 0,
			colores: ['verde', 'amarillo', 'rojo'],
			condicion: datosCliente?.informacionCrediticia.condicion,
		},
	];

	return (
		<div>
			<Grid container direction='row' justify='center' spacing={3}>
				{indicadores.map((el, i) => (
					<Grid item xs='auto' key={i} style={{padding: 7}}>
						<Center>
							<BarraDeProgeso
								titulo={el.titulo}
								max={el.valorMax}
								valor={el.valor}
								colores={el.colores}
								disable={el.condicion === 'contado' ? true : false}
							/>
						</Center>
					</Grid>
				))}
			</Grid>
		</div>
	);
};

export default IndicadoresDelPedidoActual;
