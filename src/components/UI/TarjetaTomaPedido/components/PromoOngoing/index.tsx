import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {PromocionColor} from 'assests/iconos';
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

export const PromoOngoing: React.VFC<Props> = ({
	infoDescuento,
	infoBeneficio: {cantidad, formaBeneficio, unidadMedida},
	producto: {unidades, subUnidades, preciosBase, preciosNeto},
}) => {
	const {t} = useTranslation();

	const hayDescuentoAplicado =
		preciosBase.unidad === preciosNeto.unidad &&
		preciosBase.subUnidad === preciosNeto.subUnidad;

	return (
		<>
			{cantidad > 0 &&
				formaBeneficio !== EFormaBeneficio.Obsequio &&
				infoDescuento.tipo === ETipoDescuento.automatico &&
				((unidadMedida === 'Unidad' && cantidad === unidades) ||
					(unidadMedida !== 'Unidad' && cantidad === subUnidades)) &&
				!hayDescuentoAplicado && (
					<Box
						alignItems='center'
						display='flex'
						gap='4px'
						padding='8px 14px 12px 14px'
						sx={{background: '#fff'}}
					>
						<PromocionColor height='20px' width='20px' />
						<Typography variant='caption' color='primary'>
							{t('descuentos.descuentoSustituido', {
								tipo: t('descuentos.automatico'),
							})}
							<span style={{fontWeight: 500}}>
								{` ${t('descuentos.promocionOngoing').toLowerCase()}`}
							</span>
						</Typography>
					</Box>
				)}
		</>
	);
};
