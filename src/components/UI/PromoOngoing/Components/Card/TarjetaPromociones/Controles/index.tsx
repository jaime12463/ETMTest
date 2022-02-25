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
	TDetalleBonificacionesCliente,
	TPrecioProducto,
	TProducto,
} from 'models';
import Modal from 'components/UI/Modal';
import {useMostrarAviso} from 'hooks';

interface Props {
	producto: TProducto;
	unidadMedida: string;
	statefocusId: any;
	stateBeneficiosProductos: any;
	promocionAplicada: boolean;
}

export const Controles: React.FC<Props> = ({
	producto,
	unidadMedida,
	statefocusId,
	stateBeneficiosProductos,
	promocionAplicada,
}) => {
	//const classes = useEstilos({errorAplicacionTotal: false, promocionAplicada});

	const [classes, setClasses] = React.useState<any>(
		useEstilos({errorAplicacionTotal: false, promocionAplicada})
	);
	const {focusId, setFocusId} = statefocusId;
	const {beneficiosProductos, setBeneficiosProductos} =
		stateBeneficiosProductos;
	const [productoOriginal, setProductoOriginal] = React.useState<any>();
	const [cantidad, setCantidad] = React.useState<number>(0);

	React.useEffect(() => {
		if (beneficiosProductos) {
			let productoEnBeneficio = beneficiosProductos.find(
				(productoBeneficio: any) =>
					productoBeneficio.codigoProducto === producto.codigoProducto
			);

			setCantidad(productoEnBeneficio.cantidad);
			setProductoOriginal(productoEnBeneficio);
		}
	}, [stateBeneficiosProductos]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCantidad(Number(e.target.value.replace(/[^0-9]/g, '')));
	};

	const handleButtons = (e: React.MouseEvent<HTMLButtonElement>) => {
		const {name} = e.currentTarget;

		if (name === '-') {
			setCantidad((prevCantidad) => {
				return prevCantidad - 1;
			});
		}
		if (name === '+') {
			setCantidad((prevCantidad) => {
				return prevCantidad + 1;
			});
		}

		//setFocusId(productoOriginal.codigoProducto.toString());
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
						{!promocionAplicada && (
							<IconButton
								sx={{marginLeft: '2px', padding: 0}}
								name='-'
								onClick={handleButtons}
								disabled={cantidad === 0}
							>
								<QuitarRellenoIcon
									height='18px'
									width='18px'
									disabled={cantidad === 0}
								/>
							</IconButton>
						)}
						<Input
							autoComplete='off'
							className={classes.input}
							value={cantidad}
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
						{!promocionAplicada && (
							<IconButton
								sx={{padding: '0'}}
								size='small'
								name='+'
								onClick={handleButtons}
								disabled={cantidad >= productoOriginal.cantidad}
							>
								<AgregarRedondoIcon
									width='18px'
									height='18px'
									disabled={cantidad >= productoOriginal.cantidad}
								/>
							</IconButton>
						)}
					</Box>
				</Box>
			)}
		</>
	);
};
