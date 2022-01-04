import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useEstilos from './useEstilos';
import {
	useObtenerCompromisoDeCobroActual,
	useObtenerVisitaActual,
} from 'redux/hooks';
import {useObtenerBonificacionesHabilitadas} from 'hooks';

interface Props {
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const BotonResumenPedido: React.FC<Props> = ({setOpen}) => {
	const [botonHabilitado, setBotonHabilitado] = React.useState<boolean>(false);
	const visitaActual = useObtenerVisitaActual();
	const compromisoDeCobro = useObtenerCompromisoDeCobroActual();
	const {venta, prestamoenvase, ventaenvase, canje} = visitaActual.pedidos;
	const bonificacionesEjecutadas = visitaActual.bonificaciones.filter(
		(bonificacion) => {
			if (bonificacion.detalle.length > 0) {
				return bonificacion;
			}
		}
	);

	const ordenDeCompra = visitaActual.ordenDeCompra === '' ? false : true;

	const classes = useEstilos({botonHabilitado});

	React.useEffect(() => {
		if (
			venta?.productos?.some(
				(producto) => producto.unidades > 0 || producto.subUnidades > 0
			) ||
			prestamoenvase?.productos?.some(
				(producto) => producto.unidades > 0 || producto.subUnidades > 0
			) ||
			ventaenvase?.productos?.some(
				(producto) => producto.unidades > 0 || producto.subUnidades > 0
			) ||
			canje?.productos?.some(
				(producto) => producto.unidades > 0 || producto.subUnidades > 0
			) ||
			bonificacionesEjecutadas?.length > 0 ||
			ordenDeCompra ||
			compromisoDeCobro.monto > 0
		) {
			return setBotonHabilitado(true);
		}

		setBotonHabilitado(false);
	}, [
		venta?.productos,
		prestamoenvase?.productos,
		ventaenvase?.productos,
		canje?.productos,
		bonificacionesEjecutadas,
	]);

	return (
		<Box
			className={classes.container}
			onClick={() => setOpen((prevState) => !prevState)}
		>
			<Typography variant='caption' fontFamily='Open Sans' color='#fff'>
				Ver resumen del pedido
			</Typography>
		</Box>
	);
};

export default BotonResumenPedido;
