import React from 'react';
import {
	TPrecioProducto,
	TProductoPedido,
	TStateInfoDescuentos,
	TStateInputFocus,
} from 'models';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import {PromocionColor, QuitarRellenoIcon} from 'assests/iconos';
import {formatearNumero} from 'utils/methods';
import {useTranslation} from 'react-i18next';
import theme from 'theme';
import {styled} from '@mui/material/styles';
import InputConIcono from 'components/UI/InputConIcono';
import {StateFocusID} from '../..';

const ChipStyled = styled(Chip)(() => ({
	'&.MuiChip-root': {
		background: 'transparent',
		border: `1px solid ${theme.palette.primary.main}`,
		cursor: 'pointer',
		borderRadius: '50px',
		height: ' 18px',
		marginBottom: '12px',
		padding: '4px, 12px',
		width: '133px',
	},
}));

interface Props {
	stateInfoDescuento: TStateInfoDescuentos;
	obtenerCalculoDescuentoProducto: any;
	producto: TProductoPedido;
	stateInputFocus: TStateInputFocus;
	stateFocusId: StateFocusID;
}

const Descuentos = ({
	stateInfoDescuento,
	obtenerCalculoDescuentoProducto,
	stateInputFocus,
	stateFocusId,
	producto,
}: Props) => {
	const {infoDescuento, setInfoDescuento} = stateInfoDescuento;
	const {focusId, setFocusId} = stateFocusId;
	const {inputFocus, setInputFocus} = stateInputFocus;
	const [mostrarInfo, setMostrarinfo] = React.useState<boolean>(false);
	const [inputValue, setInputValue] = React.useState<string>(
		infoDescuento.inputPolarizado.toString() ?? ''
	);

	const {t} = useTranslation();

	React.useEffect(() => {
		if (infoDescuento.inputPolarizado > 0) {
			obtenerCalculoDescuentoProducto(
				{inputPolarizado: Number(inputValue), unidades: 0, subUnidades: 0},
				stateInfoDescuento
			);
		}
	}, []);

	React.useEffect(() => {
		if (
			infoDescuento.porcentajeDescuento !== null &&
			infoDescuento.porcentajeDescuento > 0
		) {
			if (producto.unidades > 0 || producto.subUnidades > 0) {
				setMostrarinfo(true);
			}
		} else {
			setMostrarinfo(false);
		}
	}, [producto, infoDescuento]);

	const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value.replace(/[^0-9]/g, ''));
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

	if (!infoDescuento.tipo) return null;

	return (
		<Box display='flex' flexDirection='column'>
			{mostrarInfo && (
				<Box display='flex'>
					<Box
						display='flex'
						flexDirection='column'
						width='179px'
						padding='0 5px 0 14px'
						gap='6px'
					>
						<Typography
							variant='caption'
							fontFamily='Open Sans'
							color={theme.palette.primary.main}
						>
							{infoDescuento.tipo === 'polarizado'
								? `Descuento polarizado del -${infoDescuento.porcentajeDescuento}%`
								: `Descuento escalonado del -${infoDescuento.porcentajeDescuento}%`}
						</Typography>
						<Box
							display='flex'
							alignItems='center'
							justifyContent='space-between'
							width='145px'
							marginBottom={infoDescuento.tipo === 'polarizado' ? '6px' : '0'}
						>
							<PromocionColor height='20px' width='20px' />
							<Typography
								variant='subtitle3'
								fontFamily='Open Sans'
								color={theme.palette.primary.main}
							>
								{formatearNumero(producto.preciosNeto.unidad, t)}
							</Typography>
							<Typography
								variant='subtitle3'
								fontFamily='Open Sans'
								color={theme.palette.primary.main}
							>
								{formatearNumero(producto.preciosNeto.subUnidad, t)}
							</Typography>
						</Box>
						{(infoDescuento.tipo === 'escalonado' ||
							infoDescuento.tipo === 'automatico') && (
							<Box alignSelf='start'>
								<ChipStyled
									label={
										<Typography
											variant='caption'
											color={theme.palette.primary.main}
										>
											Eliminar descuento
										</Typography>
									}
									icon={
										<QuitarRellenoIcon
											height='9px'
											width='9px'
											fill={theme.palette.primary.main}
										/>
									}
								/>
							</Box>
						)}
					</Box>
					<Box width='125px' sx={{background: '#F5F0EF'}} />
				</Box>
			)}
			{infoDescuento.tipo === 'polarizado' && (
				<Box marginBottom='16px'>
					<InputConIcono
						onBlur={onBlurHandler}
						valid={false}
						value={inputValue}
						onChange={onChangeInput}
						onKeyPress={handleKeyPress}
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
				</Box>
			)}
		</Box>
	);
};

export default Descuentos;
