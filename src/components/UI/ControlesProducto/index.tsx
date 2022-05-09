import React from 'react';
import {Box, IconButton} from '@mui/material';
import {
	CajaIcon,
	QuitarRellenoIcon,
	AgregarRedondoIcon,
	BotellaIcon,
} from 'assests/iconos';
import {InputCantidades, InputPropsEstilos} from 'components/UI';
import {
	GetValueProps,
	StateFocusID,
	TProductoPedido,
	TStateInputFocus,
} from 'models';
import {useObtenerDatosCliente, useValidacionPermiteSubUnidades} from 'hooks';
import {useObtenerClienteActual} from 'redux/hooks';

interface Props {
	getValues: GetValueProps;
	handleButtons: (e: React.MouseEvent<HTMLButtonElement>) => void;
	inputValueUnidades?: number;
	intpuValueSubUnidades?: number;
	onBlur: () => void;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
	producto: TProductoPedido;
	stateFocusId: StateFocusID;
	stateInputFocus: TStateInputFocus;
	useEstilosProps: InputPropsEstilos;
}

export const ControlesProducto: React.VFC<Props> = ({
	getValues,
	handleButtons,
	inputValueUnidades,
	intpuValueSubUnidades,
	onBlur,
	onChange,
	onKeyPress,
	producto,
	stateFocusId: {focusId, setFocusId},
	stateInputFocus: {inputFocus, setInputFocus},
	useEstilosProps,
}) => {
	const permiteSubUnidades = useValidacionPermiteSubUnidades(producto);
	const clienteActual = useObtenerClienteActual();
	const {obtenerDatosCliente} = useObtenerDatosCliente();
	const datosCliente = obtenerDatosCliente(clienteActual.codigoCliente)!;
	const {cantidadMaximaUnidades} = datosCliente.configuracionPedido;

	return (
		<Box
			alignItems='center'
			display='flex'
			flexDirection='column'
			gap='12px'
			padding='22px 12px 12px 8px'
			width='125px'
		>
			<Box alignItems='center' display='flex' justifyContent='center'>
				<CajaIcon height={18} style={{marginRight: '4px'}} width={18} />
				{!useEstilosProps.disabled && (
					<IconButton
						disabled={getValues.unidades === 0}
						name='unidades'
						onClick={handleButtons}
						size='small'
						sx={{marginRight: '2px', padding: 0}}
						value='-'
					>
						<QuitarRellenoIcon
							disabled={getValues.unidades === 0}
							height={18}
							width={18}
						/>
					</IconButton>
				)}
				<InputCantidades
					data-cy={`cantidad-producto-unidades-${producto.codigoProducto}`}
					id='unidades_producto'
					inputRef={(input) => {
						if (
							inputFocus === 'unidades' &&
							focusId === producto.codigoProducto
						) {
							input?.focus();
						}
					}}
					name='unidades'
					onChange={onChange}
					onClick={() => {
						setInputFocus('unidades');
						setFocusId(producto.codigoProducto);
					}}
					onFocus={(e) => e.target.select()}
					onKeyPress={onKeyPress}
					useEstilosProps={useEstilosProps}
					value={inputValueUnidades ?? getValues.unidades}
				/>
				{!useEstilosProps.disabled && (
					<IconButton
						disabled={
							producto.unidadesDisponibles
								? producto.unidades >= producto.unidadesDisponibles
									? true
									: false
								: !!cantidadMaximaUnidades &&
								  producto.unidades >= cantidadMaximaUnidades
								? true
								: false
						}
						name='unidades'
						onClick={handleButtons}
						size='small'
						sx={{marginLeft: '2px', padding: 0}}
						value='+'
					>
						<AgregarRedondoIcon
							disabled={
								producto.unidadesDisponibles
									? producto.unidades >= producto.unidadesDisponibles
										? true
										: false
									: !!cantidadMaximaUnidades &&
									  producto.unidades >= cantidadMaximaUnidades
									? true
									: false
							}
							height={18}
							width={18}
						/>
					</IconButton>
				)}
			</Box>
			{permiteSubUnidades && (
				<Box alignItems='center' display='flex' justifyContent='center'>
					<BotellaIcon height={18} style={{marginRight: '4px'}} width={18} />
					{!useEstilosProps.disabled && (
						<IconButton
							disabled={getValues.subUnidades === 0}
							name='subUnidades'
							onClick={handleButtons}
							size='small'
							sx={{marginRight: '2px', padding: 0}}
							value='-'
						>
							<QuitarRellenoIcon
								disabled={getValues.subUnidades === 0}
								height={18}
								width={18}
							/>
						</IconButton>
					)}
					<InputCantidades
						useEstilosProps={useEstilosProps}
						data-cy={`cantidad-producto-subUnidades-${producto.codigoProducto}`}
						id='subUnidades_producto'
						inputRef={(input) => {
							if (
								inputFocus === 'subUnidades' &&
								focusId === producto.codigoProducto
							) {
								input?.focus();
							}
						}}
						name='subUnidades'
						onChange={onChange}
						onKeyPress={onKeyPress}
						onBlur={onBlur}
						onClick={() => {
							setInputFocus('subUnidades');
							setFocusId(producto.codigoProducto);
						}}
						onFocus={(e) => e.target.select()}
						value={intpuValueSubUnidades ?? getValues.subUnidades}
					/>
					{!useEstilosProps.disabled && (
						<IconButton
							disabled={
								getValues.subUnidades >=
								producto.presentacion - producto.subunidadesVentaMinima
							}
							name='subUnidades'
							onClick={handleButtons}
							size='small'
							sx={{marginLeft: '2px', padding: 0}}
							value='+'
						>
							<AgregarRedondoIcon
								disabled={
									getValues.subUnidades >=
									producto.presentacion - producto.subunidadesVentaMinima
								}
								height={18}
								width={18}
							/>
						</IconButton>
					)}
				</Box>
			)}
		</Box>
	);
};
