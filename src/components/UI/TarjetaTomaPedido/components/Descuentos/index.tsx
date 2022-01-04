import React from 'react';
import {TProductoPedido, TStateInfoDescuentos, TStateInputFocus} from 'models';
import Box from '@mui/material/Box';
import InputConIcono from 'components/UI/InputConIcono';
import {StateFocusID} from '../..';

interface Props {
	stateInfoDescuento: TStateInfoDescuentos;
	obtenerCalculoDescuentoProducto: any;
	producto: TProductoPedido;
	stateInputFocus: TStateInputFocus;
	stateFocusId: StateFocusID;
}

const Descuentos: React.FC<Props> = ({
	stateInfoDescuento,
	obtenerCalculoDescuentoProducto,
	stateInputFocus,
	stateFocusId,
	producto,
}) => {
	const {infoDescuento} = stateInfoDescuento;

	const {focusId, setFocusId} = stateFocusId;
	const {inputFocus, setInputFocus} = stateInputFocus;
	const [inputValue, setInputValue] = React.useState<string>(
		infoDescuento.inputPolarizado === 0
			? ''
			: infoDescuento.inputPolarizado.toString()
	);

	React.useEffect(() => {
		if (infoDescuento.inputPolarizado > 0) {
			obtenerCalculoDescuentoProducto(
				{inputPolarizado: Number(inputValue), unidades: 0, subUnidades: 0},
				stateInfoDescuento
			);
		}
	}, []);

	const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (Number(e.target.value) >= 0) {
			setInputValue(e.target.value.replace(/[^0-9,.]/g, ''));
		}
	};

	const onBlurHandler = () => {
		obtenerCalculoDescuentoProducto(
			{
				inputPolarizado: Number(inputValue),
				unidades: 0,
				subUnidades: 0,
			},
			stateInfoDescuento
		);
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === 'Enter') {
			obtenerCalculoDescuentoProducto(
				{
					inputPolarizado: Number(inputValue),
					unidades: 0,
					subUnidades: 0,
				},
				stateInfoDescuento
			);
			setInputFocus('productoABuscar');
		}
	};

	const mostrarInputPolarizado =
		infoDescuento.tipo === 'polarizado'
			? producto.unidades > 0 || producto.subUnidades > 0
				? true
				: false
			: false;

	if (!infoDescuento.tipo) return null;

	return (
		<>
			<Box display='flex' flexDirection='column'>
				<Box
					marginBottom={mostrarInputPolarizado ? '16px' : '0'}
					sx={{
						opacity: mostrarInputPolarizado ? 1 : 0,
						transition: 'opacity 0.3s ease-in-out',
					}}
				>
					{mostrarInputPolarizado && (
						<InputConIcono
							onBlur={onBlurHandler}
							valid={false}
							value={inputValue}
							onChange={onChangeInput}
							onKeyPress={handleKeyPress}
							onFocus={(e) => e.target.select()}
							onClick={() => {
								setInputFocus('descuento');
								setFocusId(producto.codigoProducto);
							}}
							label='Ingresar precio de venta al consumidor'
							margin='0'
							simboloMoneda
							inputRef={(input) => {
								if (
									inputFocus === 'descuento' &&
									focusId === producto.codigoProducto
								) {
									input?.focus();
								}
							}}
						/>
					)}
				</Box>
			</Box>
		</>
	);
};

export default Descuentos;
