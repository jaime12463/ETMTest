import React from 'react';
import {Box, IconButton} from '@mui/material';
import {
	AgregarRedondoIcon,
	BotellaIcon,
	CajaIcon,
	QuitarRellenoIcon,
} from 'assests/iconos';
import {ETiposDePago, TCodigoCantidad} from 'models';
import {useMostrarAviso} from 'hooks';
import {useTranslation} from 'react-i18next';
import {
	InputCantidades,
	InputPropsEstilos,
} from 'components/UI/InputCantidades';

interface Props {
	cantidadesPedido: {[codigo: number]: number};
	grupoYSecuenciaActual: {
		grupo: number;
		secuencia: number;
	};
	producto: {
		cantidad: number;
		codigoProducto: number;
		tope: number;
		tipoPago: ETiposDePago;
		unidadMedida: string;
		topeSecuencia: number;
	};
	promocionAplicada: boolean;
	promocionAutomatica: boolean;
	promocionSinDisponible: boolean;
	stateBeneficiosParaAgregar: any;
	statefocusId: any;
	setCantidadesPedido: React.Dispatch<
		React.SetStateAction<{[codigo: number]: number}>
	>;
	unidadMedida: string;
}

export const Controles: React.VFC<Props> = ({
	cantidadesPedido,
	grupoYSecuenciaActual,
	producto,
	promocionAplicada,
	promocionAutomatica,
	promocionSinDisponible,
	setCantidadesPedido,
	stateBeneficiosParaAgregar,
	statefocusId,
	unidadMedida,
}) => {
	const mostrarAviso = useMostrarAviso();
	const {focusId, setFocusId} = statefocusId;
	const {beneficiosParaAgregar, setBeneficiosParaAgregar} =
		stateBeneficiosParaAgregar;
	const [puedeVerBotones, setPuedeVerBotones] = React.useState<boolean>(false);
	const [puedeAgregar, setPuedeAgregar] = React.useState<boolean>(false);
	const [superaTope, setSuperaTope] = React.useState<boolean>(false);
	const [errorLimiteDisponible, setErrorLimiteDisponible] =
		React.useState<boolean>(false);

	const cantidadInicial = React.useMemo(
		() => cantidadesPedido[producto.codigoProducto],
		[]
	);

	const [totalProductos, setTotalProductos] = React.useState<number>(0);
	const {t} = useTranslation();

	const useEstilosProps: InputPropsEstilos = {
		disabled: !puedeVerBotones,
		bordeError: errorLimiteDisponible,
		cantidadMaximaConfig: 0,
		unidades: cantidadesPedido[producto.codigoProducto],
	};

	React.useEffect(() => {
		errorLimiteDisponible &&
			mostrarAviso('error', t('toast.cantidadMayorDisponiblePromocionOngoing'));
	}, [errorLimiteDisponible]);

	React.useEffect(() => {
		if (beneficiosParaAgregar) {
			const totalProductosActual = beneficiosParaAgregar?.beneficios[
				grupoYSecuenciaActual.grupo
			]?.secuencias[
				grupoYSecuenciaActual.secuencia
			]?.materialesBeneficio.reduce(
				(a: number, v: TCodigoCantidad) => a + cantidadesPedido[+v.codigo],
				0
			);
			setTotalProductos(totalProductosActual);

			const topeTotal =
				cantidadesPedido[producto.codigoProducto] >= producto.tope
					? true
					: totalProductosActual >= producto.topeSecuencia
					? true
					: false;

			setSuperaTope(topeTotal);
		}
	}, [beneficiosParaAgregar, cantidadesPedido[producto.codigoProducto]]);

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
				].materialesBeneficio[productoActualizar].cantidad =
					cantidadesPedido[producto.codigoProducto];

				setBeneficiosParaAgregar({...promocionEditada});
			}
		}

		return () => {
			if (errorLimiteDisponible) {
				setCantidadesPedido((state) => ({
					...state,
					[producto.codigoProducto]: cantidadInicial,
				}));
				setErrorLimiteDisponible(false);
			}
		};
	}, [cantidadesPedido[producto.codigoProducto]]);

	React.useEffect(() => {
		if (promocionAplicada || promocionAutomatica || promocionSinDisponible) {
			setPuedeVerBotones(false);
		} else {
			setPuedeVerBotones(true);
		}
	}, [promocionAutomatica, promocionAplicada, promocionSinDisponible]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const topeTotal =
			Number(e.target.value) > producto.tope
				? true
				: Number(e.target.value) +
						totalProductos -
						cantidadesPedido[producto.codigoProducto] >
				  producto.topeSecuencia
				? true
				: false;

		if (topeTotal) {
			setErrorLimiteDisponible(true);
			setCantidadesPedido((state) => ({
				...state,
				[producto.codigoProducto]: Number(
					e.target.value.replace(/[^0-9]/g, '')
				),
			}));
			setPuedeAgregar(true);
		} else {
			setCantidadesPedido((state) => ({
				...state,
				[producto.codigoProducto]: Number(
					e.target.value.replace(/[^0-9]/g, '')
				),
			}));
			setPuedeAgregar(true);
			setErrorLimiteDisponible(false);
		}
	};

	const handleButtons = (e: React.MouseEvent<HTMLButtonElement>) => {
		const {name} = e.currentTarget;

		if (name === '-') {
			setCantidadesPedido((state) => ({
				...state,
				[producto.codigoProducto]: state[producto.codigoProducto] - 1,
			}));
		}
		if (name === '+') {
			setCantidadesPedido((state) => ({
				...state,
				[producto.codigoProducto]: state[producto.codigoProducto] + 1,
			}));
		}
		setPuedeAgregar(true);
	};
	return (
		<>
			{!!producto && (
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
								disabled={cantidadesPedido[producto.codigoProducto] === 0}
							>
								<QuitarRellenoIcon
									height='18px'
									width='18px'
									disabled={cantidadesPedido[producto.codigoProducto] === 0}
								/>
							</IconButton>
						)}
						<InputCantidades
							id='unidades_producto'
							name='unidades'
							onChange={handleChange}
							onFocus={(e) => {
								e.target.select();
								setFocusId(producto.codigoProducto.toString());
							}}
							useEstilosProps={useEstilosProps}
							value={cantidadesPedido[producto.codigoProducto]}
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
