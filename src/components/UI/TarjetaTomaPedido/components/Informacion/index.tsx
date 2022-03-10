import React from 'react';
import {ETipoDescuento, TProductoPedido, TStateInfoDescuentos} from 'models';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {styled} from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import {
	AvisoIcon,
	BotellaIcon,
	CajaIcon,
	PromocionColor,
	QuitarRellenoIcon,
} from 'assests/iconos';
import {formatearNumero} from 'utils/methods';
import {useTranslation} from 'react-i18next';
import theme from 'theme';
import {useAppDispatch, useObtenerDatos} from 'redux/hooks';
import {borrarDescuentoDelProducto} from 'redux/features/visitaActual/visitaActualSlice';
import {useMostrarAviso, useValidacionPermiteSubUnidades} from 'hooks';

const ChipStyled = styled(Chip)(() => ({
	'&.MuiChip-root': {
		background: 'transparent',
		border: `1px solid ${theme.palette.primary.main}`,
		cursor: 'pointer',
		borderRadius: '50px',
		height: ' 18px',
		padding: '4px, 12px',
		width: '133px',
	},
}));

interface Props {
	producto: TProductoPedido;
	conSwitch?: boolean;
	stateAviso: any;
	stateInfoDescuento: TStateInfoDescuentos;
	obtenerCalculoDescuentoProducto: any;
}

const Informacion: React.FC<Props> = ({
	producto,
	conSwitch,
	stateInfoDescuento,
	stateAviso,
	obtenerCalculoDescuentoProducto,
}) => {
	const {t} = useTranslation();

	const {
		codigoProducto,
		nombreProducto,
		presentacion,
		precioConImpuestoUnidad,
		precioConImpuestoSubunidad,
		preciosNeto,
		unidades,
		subUnidades,
		precioConDescuentoUnidad,
		precioConDescuentoSubunidad,
		esVentaSubunidades,
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

	const eliminarDescuento = () => {
		setInfoDescuento({
			tipo: ETipoDescuento.eliminado,
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

	const validacionPermiteSubUnidades =
		useValidacionPermiteSubUnidades(producto);

	React.useEffect(() => {
		if (
			(infoDescuento.porcentajeDescuento !== null &&
				infoDescuento.porcentajeDescuento > 0) ||
			infoDescuento.tipo === ETipoDescuento.automatico
		) {
			if (
				producto.unidades > 0 ||
				producto.subUnidades > 0 ||
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

	return (
		<Box
			display='flex'
			flexDirection='column'
			padding={conSwitch ? '10px 0 12px 14px' : '12px 0 12px 14px'}
			justifyContent='center'
			width='179px'
		>
			<Typography variant='subtitle3' fontFamily='Open Sans'>
				{codigoProducto}
			</Typography>
			<Typography
				variant='subtitle3'
				noWrap
				width='150px'
				marginBottom={producto.atributos ? 0 : '6px'}
			>
				{nombreProducto}
			</Typography>
			{producto.atributos && (
				<Typography
					margin='4px 0 6px 0'
					variant='caption'
					color={theme.palette.secondary.main}
				>
					{`${medidas[producto.atributos?.medida ?? 0].descripcion} | ${
						envases[producto.atributos?.envase ?? 0].descripcion
					}`}
				</Typography>
			)}
			<Box
				alignItems='center'
				display='grid'
				gridTemplateColumns='20px min-content min-content 14px min-content'
				gridTemplateRows={
					infoDescuento.tipo === ETipoDescuento.automatico
						? 'auto auto'
						: 'auto auto auto'
				}
				gridTemplateAreas={
					infoDescuento.tipo === ETipoDescuento.automatico
						? `"Caja Presentacion PrecioUnidad Botella PrecioSubUnidad"
						"Promo Vacio DescuentoUnidad Vacio2 DescuentoSubUnidad"`
						: `"Caja Presentacion PrecioUnidad Botella PrecioSubUnidad"
						"Descuento Descuento Descuento Descuento Descuento"
						"Promo Vacio DescuentoUnidad Vacio2 DescuentoSubUnidad"
						`
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
					style={{gridArea: 'Caja', marginBottom: mostrarInfo ? '8px' : '0'}}
				/>
				<Typography
					variant='caption'
					fontFamily='Open Sans'
					sx={{
						gridArea: 'Presentacion',
						marginBottom: mostrarInfo ? '8px' : '0',
					}}
				>
					x{presentacion}
				</Typography>
				<Typography
					variant='subtitle3'
					fontFamily='Open Sans'
					sx={{
						gridArea: 'PrecioUnidad',
						marginBottom: mostrarInfo ? '8px' : '0',
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
								marginBottom: mostrarInfo ? '8px' : '0',
							}}
						/>
						<Typography
							variant='subtitle3'
							fontFamily='Open Sans'
							sx={{
								gridArea: 'PrecioSubUnidad',
								marginBottom: mostrarInfo ? '8px' : '0',
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
						{mostrarInfo && (
							<Typography
								variant='subtitle3'
								fontFamily='Open Sans'
								color={theme.palette.primary.main}
								sx={{gridArea: 'DescuentoSubUnidad'}}
							>
								{formatearNumero(
									producto.precioConDescuentoSubunidad ??
										producto.preciosNeto.subUnidad,
									t
								)}
							</Typography>
						)}
					</>
				)}
				{mostrarInfo && (
					<>
						<Typography
							variant='caption'
							fontFamily='Open Sans'
							color={theme.palette.primary.main}
							sx={{
								gridArea:
									infoDescuento.tipo !== ETipoDescuento.automatico
										? 'Descuento'
										: '',
								marginBottom: '8px',
							}}
						>
							{infoDescuento.tipo === ETipoDescuento.polarizado ||
							infoDescuento.tipo === ETipoDescuento.escalonado
								? `Descuento ${infoDescuento.tipo} del -${infoDescuento.porcentajeDescuento}%`
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
							color={theme.palette.primary.main}
							sx={{gridArea: 'DescuentoUnidad', justifySelf: 'start'}}
						>
							{formatearNumero(
								producto.precioConDescuentoUnidad ??
									producto.preciosNeto.unidad,
								t
							)}
						</Typography>
					</>
				)}
			</Box>
			{mostrarInfo && infoDescuento.tipo === ETipoDescuento.escalonado && (
				<Box marginTop='8px'>
					<ChipStyled
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
						label={
							<Typography variant='caption' color={theme.palette.primary.main}>
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
	);
};

export default Informacion;
