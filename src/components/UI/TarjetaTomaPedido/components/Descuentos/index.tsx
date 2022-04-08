import React from 'react';
import {
	ETipoDescuento,
	TProductoPedido,
	TStateInfoDescuentos,
	TStateInputFocus,
} from 'models';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import {StateFocusID} from '../..';
import {TInfoBeneficioProductoPromoOngoing} from 'hooks/useCalularPruductoEnPromoOnGoing';
import {SimboloMoneda} from 'assests/iconos';

interface Props {
	stateInfoDescuento: TStateInfoDescuentos;
	obtenerCalculoDescuentoProducto: (
		valoresIngresados: {
			inputPolarizado: number | undefined;
			unidades: number;
			subUnidades: number;
		},
		stateInfoDescuento: TStateInfoDescuentos
	) => void;
	producto: TProductoPedido;
	stateInputFocus: TStateInputFocus;
	stateFocusId: StateFocusID;
	infoBeneficio: TInfoBeneficioProductoPromoOngoing;
}

const Descuentos: React.FC<Props> = ({
	stateInfoDescuento,
	obtenerCalculoDescuentoProducto,
	stateInputFocus,
	stateFocusId,
	producto,
	infoBeneficio: {cantidad},
}) => {
	const {infoDescuento} = stateInfoDescuento;

	const {focusId, setFocusId} = stateFocusId;
	const {inputFocus, setInputFocus} = stateInputFocus;
	const [cambioValor, setCambioValor] = React.useState<boolean>(false);
	const [inputValue, setInputValue] = React.useState<string>(
		infoDescuento.inputPolarizado === 0
			? ''
			: infoDescuento.inputPolarizado.toString()
	);
	const [inputClicked, setInputClicked] = React.useState<boolean>(false);

	React.useEffect(() => {
		if (infoDescuento.inputPolarizado > 0) {
			obtenerCalculoDescuentoProducto(
				{inputPolarizado: Number(inputValue), unidades: 0, subUnidades: 0},
				stateInfoDescuento
			);
		}
	}, []);

	const obtenerDescuento = () => {
		if (cambioValor) {
			setCambioValor(false);
			obtenerCalculoDescuentoProducto(
				{
					inputPolarizado: Number(inputValue),
					unidades: 0,
					subUnidades: 0,
				},
				stateInfoDescuento
			);
		}
		setInputFocus('productoABuscar');
	};

	const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (Number(e.target.value) >= 0) {
			setInputValue(e.target.value.replace(/[^0-9,.]/g, ''));
			setCambioValor(true);
		}
	};

	const onBlurHandler = () => obtenerDescuento();

	const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === 'Enter') {
			obtenerDescuento();
		}
	};

	const mostrarInputPolarizado =
		infoDescuento.tipo === ETipoDescuento.polarizado
			? producto.unidades > 0 || producto.subUnidades > 0
				? true
				: false
			: false;

	if (!infoDescuento.tipo) return null;

	return (
		<Box display='flex' flexDirection='column' padding='0 14px'>
			<Box
				marginBottom='12px'
				sx={{
					opacity: mostrarInputPolarizado ? 1 : 0,
					transition: 'opacity 0.3s ease-in-out',
				}}
			>
				{mostrarInputPolarizado && (
					<Box position='relative'>
						{!inputValue && !inputClicked && (
							<Typography
								fontFamily='Open Sans'
								left='12px'
								position='absolute'
								sx={{transform: 'translateY(-50%)'}}
								top='50%'
								variant='body3'
							>
								Ingresar precio venta
							</Typography>
						)}
						{(inputClicked || inputValue) && (
							<SimboloMoneda
								style={{
									left: '12px',
									position: 'absolute',
									top: '50%',
									transform: 'translateY(-50%)',
								}}
							/>
						)}
						<TextField
							variant='standard'
							InputProps={{
								disableUnderline: true,
							}}
							inputProps={{
								style: {
									borderRadius: '20px',
									boxShadow: '0px 2px 15px rgba(0, 0, 0, 0.15)',
									boxSizing: 'border-box',
									fontFamily: 'Open Sans',
									fontSize: '14px',
									fontWeight: 600,
									height: '32px',
									padding: '4px 12px 4px 32px',
									width: '145px',
								},
							}}
							onBlur={() => {
								onBlurHandler();
								setInputClicked(false);
							}}
							value={inputValue}
							onChange={onChangeInput}
							onKeyPress={handleKeyPress}
							onFocus={(e) => {
								e.target.select();
								setInputClicked(true);
							}}
							onClick={() => {
								setInputFocus('descuento');
								setFocusId(producto.codigoProducto);
								setInputClicked(true);
							}}
							inputRef={(input) => {
								if (
									inputFocus === 'descuento' &&
									focusId === producto.codigoProducto
								) {
									input?.focus();
								}
							}}
						/>
					</Box>
				)}
			</Box>
		</Box>
	);
};

export default Descuentos;
