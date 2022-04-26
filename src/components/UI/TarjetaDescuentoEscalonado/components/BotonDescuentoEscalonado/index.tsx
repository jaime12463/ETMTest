import React from 'react';
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
	producto: TProductoPedido;
	stateAviso: any;
	stateInfoDescuento: TStateInfoDescuentos;
}

export const BotonDescuentoEscalonado: React.VFC<Props> = ({
	producto: {codigoProducto, precioConImpuestoUnidad, preciosNeto},
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
							>
								{formatearNumero(preciosNeto.unidad, t)}
							</Typography>
						</Box>
					</Box>
					<BotonSmall
						color='primary'
						onClick={() => {
							setConfigAlerta({
								titulo: t('advertencias.borrarDescuento'),
								mensaje: t('mensajes.borrarDescuento', {
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
