import React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import {
	AgregarRedondoIcon,
	AvisoIcon,
	BotellaIcon,
	CajaIcon,
	QuitarRellenoIcon,
} from 'assests/iconos';
import useEstilos from './useEstilos';
import theme from 'theme';
import {useAppDispatch, useObtenerVisitaActual} from 'redux/hooks';
import {
	ETiposDePago,
	TCodigoCantidad,
	TDetalleBonificacionesCliente,
	TPrecioProducto,
	TProducto,
	TProductosPromoOngoingAplicadas,
	TPromoOngoingBeneficiosSecuencia,
} from 'models';
import Modal from 'components/UI/Modal';
import {useMostrarAviso} from 'hooks';
import {TPromoOngoingAplicables} from 'utils/procesos/promociones/PromocionesOngoing';

interface Props {
	producto: {
		cantidad: number;
		codigoProducto: number;
		tope: number;
		tipoPago: ETiposDePago;
		unidadMedida: string;
	};
	unidadMedida: string;
	statefocusId: any;
	stateBeneficiosParaAgregar: any;
	promocionAplicada: boolean;
	promocionAutomatica: boolean;
	grupoYSecuenciaActual: {
		grupo: number;
		secuencia: number;
	};
}

export const Controles: React.FC<Props> = ({
	producto,
	unidadMedida,
	statefocusId,
	stateBeneficiosParaAgregar,
	promocionAplicada,
	promocionAutomatica,
	grupoYSecuenciaActual,
}) => {
	const mostrarAviso = useMostrarAviso();
	const {focusId, setFocusId} = statefocusId;
	const {beneficiosParaAgregar, setBeneficiosParaAgregar} =
		stateBeneficiosParaAgregar;
	const [productoOriginal, setProductoOriginal] = React.useState<any>();
	const [cantidadActual, setCantidadActual] = React.useState<number>(0);
	const [puedeVerBotones, setPuedeVerBotones] = React.useState<boolean>(false);
	const [puedeAgregar, setPuedeAgregar] = React.useState<boolean>(false);
	const [classes, setClasses] = React.useState<any>(
		useEstilos({errorAplicacionTotal: false, puedeVerBotones})
	);

	const totalProductos = beneficiosParaAgregar?.beneficios[
		grupoYSecuenciaActual.grupo
	]?.secuencias[grupoYSecuenciaActual.secuencia]?.materialesBeneficio.reduce(
		(a: number, v: TCodigoCantidad) => a + v.cantidad,
		0
	);

	React.useEffect(() => {
		if (beneficiosParaAgregar && puedeAgregar) {
			setPuedeAgregar(false);
			const productoActualizar = beneficiosParaAgregar.beneficios[
				grupoYSecuenciaActual.grupo
			].secuencias[
				grupoYSecuenciaActual.secuencia
			].materialesBeneficio.findIndex(
				(productoEnPromocion: TCodigoCantidad) =>
					productoEnPromocion.codigo === producto.codigoProducto
			);
			let promocion: any = {...beneficiosParaAgregar};

			promocion.beneficios[grupoYSecuenciaActual.grupo].secuencias[
				grupoYSecuenciaActual.secuencia
			].materialesBeneficio[productoActualizar].cantidad = cantidadActual;

			setBeneficiosParaAgregar(
				(prevState: TPromoOngoingBeneficiosSecuencia) => ({
					...promocion,
				})
			);
		}
	}, [cantidadActual]);

	React.useEffect(() => {
		if (promocionAplicada || promocionAutomatica) {
			setPuedeVerBotones(false);
		} else {
			setPuedeVerBotones(true);
		}
	}, [promocionAutomatica, promocionAplicada]);

	React.useEffect(() => {
		if (producto && beneficiosParaAgregar) {
			const productoActual = beneficiosParaAgregar.beneficios[
				grupoYSecuenciaActual.grupo
			].secuencias[grupoYSecuenciaActual.secuencia].materialesBeneficio.find(
				(productoEnPromocion: TCodigoCantidad) =>
					productoEnPromocion.codigo === producto.codigoProducto
			);

			setCantidadActual(productoActual.cantidad);
			setProductoOriginal(producto);
		}
	}, []);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (Number(e.target.value) + totalProductos > producto.tope) {
			mostrarAviso(
				'error',
				'Aplicación máxima incompleta',
				'La cantidad es mayor al disponible permitido'
			);
		} else {
			setCantidadActual(Number(e.target.value.replace(/[^0-9]/g, '')));
			setPuedeAgregar(true);
		}
	};

	const handleButtons = (e: React.MouseEvent<HTMLButtonElement>) => {
		const {name} = e.currentTarget;

		if (name === '-') {
			setCantidadActual((prevCantidad) => {
				return prevCantidad - 1;
			});
		}
		if (name === '+') {
			setCantidadActual((prevCantidad) => {
				return prevCantidad + 1;
			});
		}
		setPuedeAgregar(true);
	};

	return (
		<>
			{productoOriginal && (
				<Box flex='1' padding='19px 14px 8px 0' sx={{background: '#F5F0EF'}}>
					<Box
						alignItems='center'
						display='flex'
						justifyContent='center'
						gap='2px'
					>
						{unidadMedida === 'Unidad' ? (
							<CajaIcon height='18px' width='18px' />
						) : (
							<BotellaIcon height='18px' width='18px' />
						)}
						{puedeVerBotones && (
							<IconButton
								sx={{marginLeft: '2px', padding: 0}}
								name='-'
								onClick={handleButtons}
								disabled={cantidadActual === 0}
							>
								<QuitarRellenoIcon
									height='18px'
									width='18px'
									disabled={cantidadActual === 0}
								/>
							</IconButton>
						)}
						<Input
							autoComplete='off'
							className={classes.input}
							value={cantidadActual}
							onChange={handleChange}
							disableUnderline
							name='unidades'
							id='unidades_producto'
							//onBlur={handleBlur}
							//onKeyDown={handleKeyPress}
							onFocus={(e) => {
								e.target.select();
								setFocusId(productoOriginal.codigoProducto.toString());
							}}
							inputProps={{
								style: {textAlign: 'center'},
								inputMode: 'numeric',
							}}
						/>
						{puedeVerBotones && (
							<IconButton
								sx={{padding: '0'}}
								size='small'
								name='+'
								onClick={handleButtons}
								disabled={totalProductos >= producto.tope}
							>
								<AgregarRedondoIcon
									width='18px'
									height='18px'
									disabled={totalProductos >= producto.tope}
								/>
							</IconButton>
						)}
					</Box>
				</Box>
			)}
		</>
	);
};
