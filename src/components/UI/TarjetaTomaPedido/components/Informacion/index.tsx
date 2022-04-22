import React from 'react';
import {
	EFormaBeneficio,
	ETipoDescuento,
	TProductoPedido,
	TStateInfoDescuentos,
	TStateInputFocus,
} from 'models';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import {
	AvisoIcon,
	BotellaIcon,
	CajaIcon,
	PromocionColor,
	QuitarRellenoIcon,
	SimboloMoneda,
} from 'assests/iconos';
import {formatearNumero} from 'utils/methods';
import {useTranslation} from 'react-i18next';
import theme from 'theme';
import {useAppDispatch, useObtenerDatos} from 'redux/hooks';
import {borrarDescuentoDelProducto} from 'redux/features/visitaActual/visitaActualSlice';
import {useMostrarAviso, useValidacionPermiteSubUnidades} from 'hooks';
import {TInfoBeneficioProductoPromoOngoing} from 'hooks/useCalularPruductoEnPromoOnGoing';
import {StateFocusID} from '../..';

interface Props {
	conSwitch?: boolean;
	infoBeneficio: TInfoBeneficioProductoPromoOngoing;
	obtenerCalculoDescuentoProducto: (
		valoresIngresados: {
			inputPolarizado: number | undefined;
			unidades: number;
			subUnidades: number;
		},
		stateInfoDescuento: TStateInfoDescuentos
	) => void;
	producto: TProductoPedido;
	stateAviso: any;
	stateFocusId: StateFocusID;
	stateInfoDescuento: TStateInfoDescuentos;
	stateInputFocus: TStateInputFocus;
}

export const Informacion: React.VFC<Props> = ({
	conSwitch,
	infoBeneficio: {cantidad, formaBeneficio, unidadMedida},
	obtenerCalculoDescuentoProducto,
	producto,
	stateAviso,
	stateFocusId,
	stateInfoDescuento,
	stateInputFocus,
}) => {
	const {t} = useTranslation();

	const {
		atributos,
		codigoProducto,
		nombreProducto,
		precioConDescuentoSubunidad,
		precioConDescuentoUnidad,
		precioConImpuestoSubunidad,
		precioConImpuestoUnidad,
		preciosNeto,
		presentacion,
		subUnidades,
		unidades,
	} = producto;

	const {unidad, subUnidad} = preciosNeto;

	const {setAlerta, setConfigAlerta} = stateAviso;

	const {infoDescuento, setInfoDescuento} = stateInfoDescuento;

	const dispatch = useAppDispatch();

	const mostrarAviso = useMostrarAviso();

	const [mostrarInfo, setMostrarinfo] = React.useState<boolean>(false);
	const [inputValue, setInputValue] = React.useState<string>(
		infoDescuento.inputPolarizado === 0
			? ''
			: infoDescuento.inputPolarizado.toString()
	);

	const tipoDescuento =
		infoDescuento.tipo === ETipoDescuento.automatico
			? t('descuentos.automatico')
			: infoDescuento.tipo === ETipoDescuento.polarizado
			? t('descuentos.polarizado')
			: infoDescuento.tipo === ETipoDescuento.escalonado
			? t('descuentos.escalonado')
			: '';

	const eliminarDescuento = () => {
		setInfoDescuento({
			tipo: ETipoDescuento.eliminado,
			porcentajeDescuento: 0,
			inputPolarizado: 0,
			codigoDescuento: '',
		});
		dispatch(
			borrarDescuentoDelProducto({
				codigoProducto: codigoProducto,
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

	const validacionPermiteSubUnidades =
		useValidacionPermiteSubUnidades(producto);

	React.useEffect(() => {
		if (
			infoDescuento.porcentajeDescuento > 0 ||
			infoDescuento.tipo === ETipoDescuento.automatico
		) {
			if (
				unidades > 0 ||
				subUnidades > 0 ||
				infoDescuento.tipo === ETipoDescuento.automatico
			) {
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

	const {envases, medidas} = useObtenerDatos();

	const {focusId, setFocusId} = stateFocusId;
	const {inputFocus, setInputFocus} = stateInputFocus;
	const [cambioValor, setCambioValor] = React.useState<boolean>(false);

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
			? unidades > 0 || subUnidades > 0
				? true
				: false
			: false;

	return (
		<Box
			display='flex'
			flex='1'
			flexDirection='column'
			padding={
				conSwitch && (cantidad === 0 || !cantidad)
					? '10px 8px 12px 14px'
					: formaBeneficio === EFormaBeneficio.Obsequio
					? '12px 8px 12px 14px'
					: tipoDescuento === t('descuentos.polarizado') ||
					  (tipoDescuento === t('descuentos.automatico') &&
							((unidadMedida === 'Unidad' && cantidad !== unidades) ||
								(unidadMedida !== 'Unidad' && cantidad !== subUnidades)))
					? '12px 8px 12px 14px'
					: '12px 8px 0 14px'
			}
		>
			<Typography variant='subtitle3' fontFamily='Open Sans'>
				{codigoProducto}
			</Typography>
			<Typography
				marginBottom={atributos ? 0 : '6px'}
				noWrap
				variant='subtitle3'
				width='150px'
			>
				{nombreProducto}
			</Typography>
			{atributos && (
				<Typography
					color='secondary'
					fontFamily='Open Sans'
					margin='4px 0 6px 0'
					variant='caption'
				>
					{`${medidas[atributos?.medida].descripcion} | ${
						envases[atributos?.envase].descripcion
					}`}
				</Typography>
			)}
			<Box
				alignItems='center'
				display='grid'
				gridTemplateColumns='20px min-content min-content 14px min-content'
				gridTemplateRows={
					infoDescuento.tipo === ETipoDescuento.polarizado ||
					(infoDescuento.tipo === ETipoDescuento.automatico &&
						cantidad &&
						cantidad !== unidades)
						? 'auto auto auto'
						: 'auto auto'
				}
				gridTemplateAreas={
					infoDescuento.tipo !== ETipoDescuento.automatico ||
					(infoDescuento.tipo === ETipoDescuento.automatico &&
						cantidad &&
						cantidad !== unidades)
						? `"Caja Presentacion PrecioUnidad Botella PrecioSubUnidad"
						"Descuento Descuento Descuento Descuento Descuento"
						"Promo Vacio DescuentoUnidad Vacio2 DescuentoSubUnidad"
						`
						: `"Caja Presentacion PrecioUnidad Botella PrecioSubUnidad"
						"Promo Vacio DescuentoUnidad Vacio2 DescuentoSubUnidad"`
				}
				justifyItems='start'
				sx={{
					whiteSpace: 'nowrap',
					gridColumnGap: '2px',
				}}
			>
				<CajaIcon
					height='18px'
					width='18px'
					style={{
						gridArea: 'Caja',
						marginBottom:
							mostrarInfo &&
							(cantidad !== unidades ||
								(cantidad === unidades &&
									tipoDescuento === t('descuentos.polarizado')))
								? '8px'
								: '0',
					}}
				/>
				<Typography
					variant='caption'
					fontFamily='Open Sans'
					sx={{
						gridArea: 'Presentacion',
						marginBottom:
							mostrarInfo &&
							(cantidad !== unidades ||
								(cantidad === unidades &&
									tipoDescuento === t('descuentos.polarizado')))
								? '8px'
								: '0',
					}}
				>
					x{presentacion}
				</Typography>
				<Typography
					variant='subtitle3'
					fontFamily='Open Sans'
					sx={{
						gridArea: 'PrecioUnidad',
						marginBottom:
							mostrarInfo &&
							(cantidad !== unidades ||
								(cantidad === unidades &&
									tipoDescuento === t('descuentos.polarizado')))
								? '8px'
								: '0',
						textDecoration:
							unidades > 0
								? unidad !== precioConImpuestoUnidad
									? 'line-through'
									: 'none'
								: precioConDescuentoUnidad
								? 'line-through'
								: 'none',
					}}
				>
					{formatearNumero(precioConImpuestoUnidad, t)}
				</Typography>
				{validacionPermiteSubUnidades && (
					<>
						<BotellaIcon
							height='14px'
							width='14px'
							style={{
								gridArea: 'Botella',
								marginBottom:
									mostrarInfo &&
									(cantidad !== unidades ||
										(cantidad === unidades &&
											tipoDescuento === t('descuentos.polarizado')))
										? '8px'
										: '0',
							}}
						/>
						<Typography
							variant='subtitle3'
							fontFamily='Open Sans'
							sx={{
								gridArea: 'PrecioSubUnidad',
								marginBottom:
									mostrarInfo &&
									(cantidad !== unidades ||
										(cantidad === unidades &&
											tipoDescuento === t('descuentos.polarizado')))
										? '8px'
										: '0',
								textDecoration:
									unidades > 0
										? subUnidad !== precioConImpuestoSubunidad
											? 'line-through'
											: 'none'
										: precioConDescuentoSubunidad
										? 'line-through'
										: 'none',
							}}
						>
							{formatearNumero(precioConImpuestoSubunidad, t)}
						</Typography>
						{mostrarInfo &&
							(cantidad !== unidades ||
								(cantidad === unidades &&
									tipoDescuento === t('descuentos.polarizado'))) && (
								<Typography
									variant='subtitle3'
									fontFamily='Open Sans'
									color='primary'
									sx={{gridArea: 'DescuentoSubUnidad'}}
								>
									{formatearNumero(
										precioConDescuentoSubunidad ?? preciosNeto.subUnidad,
										t
									)}
								</Typography>
							)}
					</>
				)}
				{mostrarInfo &&
					(cantidad !== unidades ||
						(cantidad === unidades &&
							tipoDescuento === t('descuentos.polarizado'))) && (
						<>
							<Typography
								variant='caption'
								fontFamily='Open Sans'
								color='primary'
								sx={{
									gridArea:
										infoDescuento.tipo !== ETipoDescuento.automatico ||
										(infoDescuento.tipo === ETipoDescuento.automatico &&
											cantidad &&
											cantidad !== unidades)
											? 'Descuento'
											: '',
									marginBottom: '8px',
								}}
							>
								{infoDescuento.tipo === ETipoDescuento.polarizado ||
								infoDescuento.tipo === ETipoDescuento.escalonado
									? t('descuentos.descuentoMensaje', {
											tipo: tipoDescuento,
											descuento: infoDescuento.porcentajeDescuento,
									  })
									: cantidad && cantidad !== unidades
									? t('descuentos.descuentoAutomatico')
									: null}
							</Typography>
							<PromocionColor
								height='20px'
								width='20px'
								style={{gridArea: 'Promo'}}
							/>
							<Typography
								variant='subtitle3'
								fontFamily='Open Sans'
								color='primary'
								sx={{gridArea: 'DescuentoUnidad', justifySelf: 'start'}}
							>
								{formatearNumero(
									precioConDescuentoUnidad ?? preciosNeto.unidad,
									t
								)}
							</Typography>
						</>
					)}
			</Box>
			{mostrarInputPolarizado && (
				<Box display='flex' flexDirection='column' marginTop='12px'>
					<Box
						sx={{
							opacity: mostrarInputPolarizado ? 1 : 0,
							transition: 'opacity 0.3s ease-in-out',
						}}
					>
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
									setFocusId(codigoProducto);
									setInputClicked(true);
								}}
								inputRef={(input) => {
									if (
										inputFocus === 'descuento' &&
										focusId === codigoProducto
									) {
										input?.focus();
									}
								}}
							/>
						</Box>
					</Box>
				</Box>
			)}
			{mostrarInfo && infoDescuento.tipo === ETipoDescuento.escalonado && (
				<Box
					alignItems='center'
					border={`1px solid ${theme.palette.primary.main}`}
					borderRadius='50px'
					display='flex'
					gap='4px'
					marginTop='8px'
					padding='4px 12px'
					sx={{cursor: 'pointer'}}
					width='fit-content'
					onClick={() => {
						setConfigAlerta({
							titulo: t('advertencias.borrarDescuento'),
							mensaje: t('mensajes.borrarDescuento', {
								codigo: codigoProducto,
							}),
							tituloBotonAceptar: 'Eliminar',
							tituloBotonCancelar: 'Cancelar',
							callbackAceptar: () => eliminarDescuento(),
							iconoMensaje: <AvisoIcon />,
						});
						setAlerta(true);
					}}
				>
					<QuitarRellenoIcon
						height='10px'
						width='10px'
						fill={theme.palette.primary.main}
					/>
					<Typography variant='caption' color='primary' fontFamily='Open Sans'>
						{t('descuentos.eliminarDescuento')}
					</Typography>
				</Box>
			)}
		</Box>
	);
};
