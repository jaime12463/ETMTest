import React from 'react';
import {TProductoPedido, TStateInfoDescuentos, TStateInputFocus} from 'models';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import {AvisoIcon, PromocionColor, QuitarRellenoIcon} from 'assests/iconos';
import {formatearNumero} from 'utils/methods';
import {useTranslation} from 'react-i18next';
import theme from 'theme';
import {styled} from '@mui/material/styles';
import InputConIcono from 'components/UI/InputConIcono';
import {StateFocusID} from '../..';
import {useMostrarAviso} from 'hooks';
import {useAppDispatch} from 'redux/hooks';
import {borrarDescuentoDelProducto} from 'redux/features/visitaActual/visitaActualSlice';

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
	stateAviso: any;
}

const Descuentos = ({
	stateInfoDescuento,
	obtenerCalculoDescuentoProducto,
	stateInputFocus,
	stateFocusId,
	producto,
	stateAviso,
}: Props) => {
	const {infoDescuento, setInfoDescuento} = stateInfoDescuento;

	const {focusId, setFocusId} = stateFocusId;
	const {setAlerta, setConfigAlerta} = stateAviso;
	const {inputFocus, setInputFocus} = stateInputFocus;
	const [mostrarInfo, setMostrarinfo] = React.useState<boolean>(false);
	const [inputValue, setInputValue] = React.useState<string>(
		infoDescuento.inputPolarizado === 0
			? ''
			: infoDescuento.inputPolarizado.toString()
	);
	const dispatch = useAppDispatch();

	const {t} = useTranslation();
	const mostrarAviso = useMostrarAviso();

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
			} else {
				setInputValue('');
				obtenerCalculoDescuentoProducto(
					{
						inputPolarizado: 0,
						unidades: 0,
						subUnidades: 0,
					},
					stateInfoDescuento
				);
				setMostrarinfo(false);
			}
		} else {
			setMostrarinfo(false);
		}
	}, [producto, infoDescuento]);

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

	const eliminarDescuento = () => {
		setInfoDescuento({
			tipo: 'eliminado',
			porcentajeDescuento: null,
			inputPolarizado: 0,
			codigoDescuento: '',
		});
		dispatch(
			borrarDescuentoDelProducto({
				codigoProducto: producto.codigoProducto,
			})
		);
		mostrarAviso(
			'success',
			t('advertencias.descuentoEscalonadoEliminado'),
			undefined,
			undefined,
			'descuentoEscalonadoEliminado'
		);
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
										onClick={() => {
											setConfigAlerta({
												titulo: t('advertencias.borrarDescuento'),
												mensaje: t('mensajes.borrarDescuento'),
												tituloBotonAceptar: 'Eliminar',
												tituloBotonCancelar: 'Cancelar',
												callbackAceptar: () => eliminarDescuento(),
												iconoMensaje: <AvisoIcon />,
											});
											setAlerta(true);
										}}
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
