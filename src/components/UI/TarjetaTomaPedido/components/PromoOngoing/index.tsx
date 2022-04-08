import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {CajaIcon, PromocionColor} from 'assests/iconos';
import {useTranslation} from 'react-i18next';
import {
	EFormaBeneficio,
	ETipoDescuento,
	TInfoDescuentos,
	TProductoPedido,
} from 'models';
import {TInfoBeneficioProductoPromoOngoing} from 'hooks/useCalularPruductoEnPromoOnGoing';

interface Props {
	producto: TProductoPedido;
	infoDescuento: TInfoDescuentos;
	infoBeneficio: TInfoBeneficioProductoPromoOngoing;
}

const PromoOngoing: React.FC<Props> = ({
	infoDescuento,
	infoBeneficio: {cantidad, formaBeneficio, unidadMedida},
	producto: {unidades, subUnidades, preciosBase, preciosNeto},
}) => {
	const {t} = useTranslation();

	const hayDescuentoAplicado =
		preciosBase.unidad === preciosNeto.unidad &&
		preciosBase.subUnidad === preciosNeto.subUnidad;

	const tipoDescuento =
		infoDescuento.tipo === ETipoDescuento.automatico
			? t('descuentos.automatico')
			: infoDescuento.tipo === ETipoDescuento.polarizado
			? t('descuentos.polarizado')
			: infoDescuento.tipo === ETipoDescuento.escalonado
			? t('descuentos.escalonado')
			: '';

	return (
		<>
			{cantidad > 0 && formaBeneficio !== EFormaBeneficio.Obsequio && (
				<>
					{((unidadMedida === 'Unidad' && cantidad === unidades) ||
						(unidadMedida !== 'Unidad' && cantidad === subUnidades)) &&
						tipoDescuento !== t('descuentos.polarizado') &&
						!hayDescuentoAplicado && (
							<Box
								alignItems='center'
								display='flex'
								gap='4px'
								padding={
									tipoDescuento === t('descuentos.polarizado')
										? '8px 14px'
										: cantidad &&
										  ((unidadMedida === 'Unidad' && cantidad === unidades) ||
												(unidadMedida !== 'Unidad' && cantidad === subUnidades))
										? '8px 14px 12px 14px'
										: '12px 14px'
								}
								sx={{background: '#fff'}}
							>
								<PromocionColor height='20px' width='20px' />
								<Typography variant='caption' color='primary'>
									{t('descuentos.descuentoSustituido', {tipo: tipoDescuento})}
								</Typography>
							</Box>
						)}

					{tipoDescuento !== t('descuentos.automatico') &&
						tipoDescuento !== t('descuentos.polarizado') && (
							<Box
								alignItems='center'
								display='flex'
								gap='4px'
								padding={
									tipoDescuento === t('descuentos.polarizado')
										? '8px 14px'
										: cantidad &&
										  ((unidadMedida === 'Unidad' && cantidad === unidades) ||
												(unidadMedida !== 'Unidad' && cantidad === subUnidades))
										? '8px 14px 12px 14px'
										: '12px 14px'
								}
								sx={{background: '#fff'}}
							>
								<Box alignItems='center' display='flex' gap='2px'>
									<Typography
										variant='caption'
										fontFamily='Open Sans'
										color='secondary'
									>
										{cantidad}
									</Typography>
									<CajaIcon height='18px' width='18px' />
								</Box>
								<Typography variant='subtitle3' fontFamily='Open Sans'>
									{t('descuentos.vieneConPromoOngoing')}
								</Typography>
							</Box>
						)}
				</>
			)}
		</>
	);
};

export default PromoOngoing;
