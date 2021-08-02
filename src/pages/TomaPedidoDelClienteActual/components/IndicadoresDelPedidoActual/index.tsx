import {Grid} from '@material-ui/core';
import {BarraDeProgeso} from 'components/UI';
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
		},
	];

	return (
		<Grid container direction='row'>
			{indicadores.map((el, i) => (
				<Grid item xs={4} key={i}>
					<BarraDeProgeso
						titulo={el.titulo}
						max={el.valorMax}
						valor={el.valor}
						colores={el.colores}
					/>
				</Grid>
			))}
		</Grid>
	);
};

export default IndicadoresDelPedidoActual;
