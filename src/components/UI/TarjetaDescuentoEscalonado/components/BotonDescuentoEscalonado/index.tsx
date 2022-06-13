import {Box, Typography} from '@mui/material';
import {AvisoIcon, PromocionColor} from 'assests/iconos';
import {BotonSmall} from 'components/UI/BotonSmall';
import {useTranslation} from 'react-i18next';
import {ETipoDescuento, TProductoPedido, TStateInfoDescuentos} from 'models';
import {formatearNumero} from 'utils/methods';
import {useAppDispatch} from 'redux/hooks';
import {borrarDescuentoDelProducto} from 'redux/features/visitaActual/visitaActualSlice';
import {useMostrarAviso} from 'hooks';

interface Props {
	offsetPrecioSubUnidad: number;
	offsetPrecioUnidad: number;
	producto: TProductoPedido;
	setDescEliminado: React.Dispatch<React.SetStateAction<boolean>>;
	stateAviso: any;
	stateInfoDescuento: TStateInfoDescuentos;
}

export const BotonDescuentoEscalonado: React.VFC<Props> = ({
	offsetPrecioSubUnidad,
	offsetPrecioUnidad,
	producto: {codigoProducto, precioConImpuestoUnidad, preciosNeto},
	setDescEliminado,
	stateAviso: {setAlerta, setConfigAlerta},
	stateInfoDescuento: {infoDescuento, setInfoDescuento},
}) => {
	const {t} = useTranslation();
	const dispatch = useAppDispatch();
	const mostrarAviso = useMostrarAviso();

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
		setDescEliminado(true);
	};

	return (
		<>
			{preciosNeto.unidad !== precioConImpuestoUnidad && (
				<Box
					alignItems='center'
					display='flex'
					justifyContent='space-between'
					padding='8px 12px 6px 14px'
					sx={{gridArea: 'DescuentoEscalonado'}}
				>
					<Box display='flex' flexDirection='column' gap='6px'>
						<Typography
							color='primary'
							fontFamily='Open Sans'
							variant='caption'
						>
							{t('descuentos.descuentoMensaje', {
								tipo: t('descuentos.escalonado'),
								descuento: infoDescuento.porcentajeDescuento,
							})}
						</Typography>
						<Box alignItems='center' display='flex' gap='18px'>
							<PromocionColor height={20} width={20} />
							<Typography
								color='primary'
								fontFamily='Open Sans'
								variant='subtitle3'
								position='absolute'
								left={`${offsetPrecioUnidad}px`}
							>
								{formatearNumero(preciosNeto.unidad, t)}
							</Typography>
							<Typography
								color='primary'
								fontFamily='Open Sans'
								variant='subtitle3'
								position='absolute'
								left={`${offsetPrecioSubUnidad}px`}
							>
								{formatearNumero(preciosNeto.subUnidad, t)}
							</Typography>
						</Box>
					</Box>
					<BotonSmall
						color='primary'
						onClick={() => {
							setConfigAlerta({
								titulo: t('advertencias.borrarDescuento'),
								mensaje: t('modal.borrarDescuento', {
									codigo: codigoProducto,
								}),
								tituloBotonAceptar: t('general.eliminar'),
								tituloBotonCancelar: t('general.cancelar'),
								callbackAceptar: () => eliminarDescuento(),
								iconoMensaje: <AvisoIcon />,
							});
							setAlerta(true);
						}}
						padding='4px 8px'
						sx={{background: 'transparent'}}
					>
						<Typography
							color='primary'
							fontFamily='Open Sans'
							variant='caption'
						>
							{t('descuentos.eliminarDescuento')}
						</Typography>
					</BotonSmall>
				</Box>
			)}
		</>
	);
};
