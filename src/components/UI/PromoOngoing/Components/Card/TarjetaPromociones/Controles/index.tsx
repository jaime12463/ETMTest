import React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import {
	AgregarRedondoIcon,
	BotellaIcon,
	CajaIcon,
	QuitarRellenoIcon,
} from 'assests/iconos';
import useEstilos from './useEstilos';

import {ETiposDePago, TCodigoCantidad} from 'models';

import {useMostrarAviso} from 'hooks';

interface Props {
	producto: {
		cantidad: number;
		codigoProducto: number;
		tope: number;
		tipoPago: ETiposDePago;
		unidadMedida: string;
		topeSecuencia: number;
	};
	unidadMedida: string;
	statefocusId: any;
	stateBeneficiosParaAgregar: any;
	promocionAplicada: boolean;
	promocionAutomatica: boolean;
	promocionSinDisponible: boolean;
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
	promocionSinDisponible,
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
	const [superaTope, setSuperaTope] = React.useState<boolean>(false);

	const [classes, setClasses] = React.useState<any>(
		useEstilos({errorAplicacionTotal: false, puedeVerBotones})
	);
	const [totalProductos, setTotalProductos] = React.useState<number>(0);

	React.useEffect(() => {
		if (beneficiosParaAgregar) {
			const totalProductosActual = beneficiosParaAgregar?.beneficios[
				grupoYSecuenciaActual.grupo
			]?.secuencias[
				grupoYSecuenciaActual.secuencia
			]?.materialesBeneficio.reduce(
				(a: number, v: TCodigoCantidad) => a + v.cantidad,
				0
			);
			setTotalProductos(totalProductosActual);

			const topeTotal =
				cantidadActual >= producto.tope
					? true
					: totalProductosActual >= producto.topeSecuencia
					? true
					: false;

			setSuperaTope(topeTotal);
		}
	}, [beneficiosParaAgregar, cantidadActual]);

	React.useEffect(() => {
		return () => {
			setCantidadActual(producto.cantidad);
		};
	}, []);

	React.useEffect(() => {
		if (beneficiosParaAgregar && puedeAgregar) {
			setPuedeAgregar(false);
			const materialesBeneficio = [
				...beneficiosParaAgregar.beneficios[grupoYSecuenciaActual.grupo]
					.secuencias[grupoYSecuenciaActual.secuencia].materialesBeneficio,
			];

			let productoActualizar = materialesBeneficio.findIndex(
				(productoEnPromocion: TCodigoCantidad) =>
					productoEnPromocion.codigo === producto.codigoProducto
			);

			if (productoActualizar !== -1) {
				let promocionEditada: any = {...beneficiosParaAgregar};

				promocionEditada.beneficios[grupoYSecuenciaActual.grupo].secuencias[
					grupoYSecuenciaActual.secuencia
				].materialesBeneficio[productoActualizar].cantidad = cantidadActual;

				setBeneficiosParaAgregar({...promocionEditada});
			}
		}
	}, [cantidadActual]);

	React.useEffect(() => {
		if (promocionAplicada || promocionAutomatica || promocionSinDisponible) {
			setPuedeVerBotones(false);
		} else {
			setPuedeVerBotones(true);
		}
	}, [promocionAutomatica, promocionAplicada, promocionSinDisponible]);

	React.useEffect(() => {
		if (producto && beneficiosParaAgregar) {
			setCantidadActual(producto.cantidad);
			setProductoOriginal(producto);
		}
	}, []);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const topeTotal =
			Number(e.target.value) > producto.tope
				? true
				: Number(e.target.value) + totalProductos - cantidadActual >
				  producto.topeSecuencia
				? true
				: false;
		console.log(Number(e.target.value) + totalProductos - cantidadActual);
		if (topeTotal) {
			mostrarAviso('error', 'La cantidad es mayor al disponible permitido');
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
								disabled={superaTope}
							>
								<AgregarRedondoIcon
									width='18px'
									height='18px'
									disabled={superaTope}
								/>
							</IconButton>
						)}
					</Box>
				</Box>
			)}
		</>
	);
};
