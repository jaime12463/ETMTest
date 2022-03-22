import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {BotellaIcon, CajaIcon} from 'assests/iconos';
import {formatearNumero} from 'utils/methods';
import {useTranslation} from 'react-i18next';
import {TProductoPedido} from 'models';
import theme from 'theme';
import {useObtenerDatos} from 'redux/hooks';
import {useCalularPruductoEnPromoOnGoing} from 'hooks';

export interface TarjetaProps {
	producto: TProductoPedido;
}

export const Tarjeta: React.FC<TarjetaProps> = ({producto}) => {
	const {t} = useTranslation();
	const {
		codigoProducto,
		nombreProducto,
		unidades,
		subUnidades,
		esVentaSubunidades,
		precioConImpuestoUnidad,
		precioConImpuestoSubunidad,
		atributos,
		presentacion,
		tipoPago,
	} = producto;

	const calularPruductoEnPromoOnGoing = useCalularPruductoEnPromoOnGoing();

	const infoBeneficio = calularPruductoEnPromoOnGoing(codigoProducto);

	let unidadesFinales = unidades;
	let subUnidadesFinales = subUnidades;

	if (infoBeneficio.cantidad) {
		if (tipoPago === infoBeneficio.tipoPago) {
			if (infoBeneficio.unidadMedida === 'Unidad') {
				unidadesFinales = unidades - infoBeneficio.cantidad;
			} else {
				subUnidadesFinales = subUnidades - infoBeneficio.cantidad;
			}
		}
	}

	let precioFinal =
		producto.precioConImpuestoUnidad * unidadesFinales +
		producto.precioConImpuestoSubunidad * subUnidadesFinales;

	const {envases, medidas} = useObtenerDatos();

	return (
		<Box display='flex'>
			<Box
				display='flex'
				flexDirection='column'
				flex='1'
				padding='6px 8px 6px 14px'
			>
				<Typography variant='subtitle3' fontFamily='Open Sans'>
					{codigoProducto}
				</Typography>
				<Typography
					variant='subtitle3'
					marginBottom={atributos ? '2px' : '6px'}
				>
					{nombreProducto}
				</Typography>
				{atributos && (
					<Typography
						marginBottom='8px'
						variant='caption'
						color={theme.palette.secondary.main}
					>
						{`${medidas[producto.atributos?.medida ?? 0].descripcion} | ${
							envases[producto.atributos?.envase ?? 0].descripcion
						}`}
					</Typography>
				)}
				<Box alignItems='center' display='flex' gap='4px'>
					<Box alignItems='center' display='flex' gap='2px'>
						<CajaIcon height='14px' width='14px' />
						<Typography
							variant='caption'
							fontFamily='Open Sans'
							color='secondary'
						>
							x{presentacion}
						</Typography>
						<Typography
							variant='caption'
							fontFamily='Open Sans'
							color='secondary'
							fontWeight={600}
						>
							{formatearNumero(precioConImpuestoUnidad, t)}
						</Typography>
					</Box>
					{esVentaSubunidades && (
						<Box alignItems='center' display='flex'>
							<BotellaIcon height='12px' width='12px' />
							<Typography
								variant='caption'
								fontFamily='Open Sans'
								color='secondary'
								fontWeight={600}
							>
								{formatearNumero(precioConImpuestoSubunidad, t)}
							</Typography>
						</Box>
					)}
				</Box>
			</Box>
			<Box
				display='flex'
				flexDirection='column'
				justifyContent='space-between'
				flexBasis='143px'
				sx={{background: '#F5F0EF'}}
			>
				<Box display='flex' flexDirection='column' padding='6px 14px 4px 8px'>
					{unidadesFinales > 0 && (
						<Box
							alignItems='center'
							display='flex'
							justifyContent='space-between'
							marginBottom='2px'
						>
							<Box alignItems='center' display='flex' gap='4px'>
								<Typography
									variant='caption'
									fontFamily='Open Sans'
									color='#000'
								>
									{unidadesFinales}
								</Typography>
								<CajaIcon height='18px' width='18px' />
							</Box>
							<Typography variant='caption' fontFamily='Open Sans' color='#000'>
								{formatearNumero(precioConImpuestoUnidad * unidadesFinales, t)}
							</Typography>
						</Box>
					)}
					{subUnidadesFinales > 0 && (
						<Box
							alignItems='center'
							display='flex'
							justifyContent='space-between'
						>
							<Box alignItems='center' display='flex' gap='4px'>
								<Typography
									variant='caption'
									fontFamily='Open Sans'
									color='#000'
								>
									{subUnidadesFinales}
								</Typography>
								<BotellaIcon height='18px' width='18px' />
							</Box>
							<Typography variant='caption' fontFamily='Open Sans' color='#000'>
								{formatearNumero(
									precioConImpuestoSubunidad * subUnidadesFinales,
									t
								)}
							</Typography>
						</Box>
					)}
				</Box>
				<Box
					alignItems='center'
					display='flex'
					justifyContent='space-between'
					padding='10px 14px 4px 8px'
					sx={{background: '#F5F0EF', mixBlendMode: 'multiply'}}
				>
					<Typography
						variant='caption'
						fontFamily='Open Sans'
						color='#000'
						fontWeight={700}
					>
						{t('general.subTotal')}
					</Typography>
					<Typography variant='subtitle3' color='#000'>
						{formatearNumero(precioFinal, t)}
					</Typography>
				</Box>
			</Box>
		</Box>
	);
};
