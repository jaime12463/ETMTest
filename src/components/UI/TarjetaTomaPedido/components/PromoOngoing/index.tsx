import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {CajaIcon, PromocionColor} from 'assests/iconos';
import {useTranslation} from 'react-i18next';
import {ETipoDescuento, TInfoDescuentos, TProductoPedido} from 'models';
import {TInfoBeneficioProductoPromoOngoing} from 'hooks/useCalularPruductoEnPromoOnGoing';

interface Props {
	producto: TProductoPedido;
	infoDescuento: TInfoDescuentos;
	infoBeneficio: TInfoBeneficioProductoPromoOngoing;
}

const PromoOngoing: React.FC<Props> = ({
	infoDescuento,
	infoBeneficio: {cantidad},
	producto: {unidades},
}) => {
	const {t} = useTranslation();

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
			{cantidad > 0 && (
				<Box
					alignItems='center'
					display='flex'
					padding={
						tipoDescuento === t('descuentos.polarizado') &&
						cantidad !== unidades
							? '8px 14px'
							: cantidad && cantidad === unidades
							? '8px 14px 12px 14px'
							: '12px 14px'
					}
					gap='4px'
				>
					{cantidad === unidades &&
					(tipoDescuento !== '' ||
						tipoDescuento === t('descuentos.escalonado')) ? (
						<>
							<PromocionColor height='18px' width='18px' />
							<Typography variant='caption' color='primary'>
								{t('descuentos.descuentoSustituido', {tipo: tipoDescuento})}
							</Typography>
						</>
					) : (
						<>
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
						</>
					)}
				</Box>
			)}
		</>
	);
};

export default PromoOngoing;
