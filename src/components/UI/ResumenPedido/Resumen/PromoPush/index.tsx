import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import theme from 'theme';
import {formatearNumero} from 'utils/methods';
import {useTranslation} from 'react-i18next';
import {TProductoPedido} from 'models';
import {useObtenerDatos} from 'redux/hooks';
import {BotellaIcon, CajaIcon, PromocionesRellenoIcon} from 'assests/iconos';
export interface PromoPushProps {
	promocion: TProductoPedido;
}

export const PromoPush: React.FC<PromoPushProps> = ({promocion}) => {
	const {t} = useTranslation();
	const datos = useObtenerDatos();
	const {productos} = datos;

	return (
		<Box>
			<Box
				alignItems='center'
				display='flex'
				padding='12px 14px 8px 14px'
				sx={{background: theme.palette.secondary.light}}
			>
				<Box display='flex' flexWrap='wrap'>
					<Box
						display='flex'
						flexDirection='column'
						gap='2px'
						marginBottom='8px'
						width='100%'
					>
						<Typography variant='subtitle3' fontFamily='Open Sans' color='#fff'>
							{promocion.codigoProducto}
						</Typography>
						<Typography variant='subtitle3' color='#fff'>
							{promocion.nombreProducto}
						</Typography>
					</Box>
					<Box display='flex' flexDirection='column' flex='2' gap='8px'>
						<Typography variant='caption' fontFamily='Open Sans' color='#fff'>
							{`${t('general.promocionesAplicadas')}:`}
						</Typography>
						<Box alignItems='center' display='flex' gap='6px'>
							<PromocionesRellenoIcon height='14px' width='13px' />
							<Typography variant='subtitle3' color='#fff' fontWeight={700}>
								{promocion.componentes?.length ?? 0}
							</Typography>
						</Box>
					</Box>
					<Box display='flex' flexDirection='column' gap='6px' flex='1.5'>
						<Box
							alignItems='center'
							display='flex'
							justifyContent='end'
							paddingLeft='8px'
							marginTop='4px'
						>
							<Typography variant='caption' fontFamily='Open Sans' color='#fff'>
								{t('general.precioUnitario', {
									precioUnitario: formatearNumero(
										promocion.precioConImpuestoUnidad,
										t
									),
								})}
							</Typography>
						</Box>
						<Box display='flex' justifyContent='end'>
							<Typography variant='caption' fontFamily='Open Sans' color='#fff'>
								{t('general.ahorroTotal', {
									ahorroTotal: formatearNumero(
										promocion.descuentoPromoPush ?? 0,
										t
									),
								})}
							</Typography>
						</Box>
						<Box alignItems='center' display='flex' justifyContent='end'>
							<Typography
								variant='subtitle3'
								fontFamily='Open Sans'
								sx={{background: theme.palette.primary.main}}
								color='#fff'
								padding='2px 12px'
								borderRadius={9999}
							>
								{t('general.subTotal', {
									subTotal: formatearNumero(promocion.total, t),
								})}
							</Typography>
						</Box>
					</Box>
				</Box>
			</Box>
			<Box display='flex' flexDirection='row'>
				<Box flex='2' padding='8px 14px 12px 14px'>
					<Typography
						fontSize='12px'
						lineHeight='14px'
						fontFamily='Open Sans'
						fontWeight='700'
						color='#000'
						letterSpacing='-0.4px'
					>
						{`${t('general.paquetes')} ${t('general.cadaUno')}`}
					</Typography>
				</Box>
				<Box flex='1.5' sx={{background: '#F5F0EF'}} padding='8px 14px' />
			</Box>
			<Box>
				{promocion.componentes?.map((componente, index) => {
					return (
						<Box key={`${componente.codigoProducto}${index}`}>
							<Box display='flex'>
								<Box
									display='flex'
									flexDirection='column'
									flex='2'
									padding='6px 14px'
								>
									<Typography variant='subtitle3' fontFamily='Open Sans'>
										{componente.codigoProducto}
									</Typography>
									<Typography variant='subtitle3'>
										{productos[componente.codigoProducto].nombre}
									</Typography>
									<Typography
										marginTop='4px'
										variant='caption'
										color={theme.palette.secondary.main}
									>
										355 ml | Vidrio | Retornable{' '}
										{/* TODO REEMPLAZAR VALORES ACA */}
									</Typography>
								</Box>
								<Box
									display='flex'
									flexDirection='column'
									flex='1.5'
									padding='6px 14px'
									sx={{background: '#F5F0EF'}}
								>
									<Box
										alignItems='center'
										display='flex'
										justifyContent='end'
										gap='2px'
										marginBottom='2px'
									>
										{promocion.promoPush?.componentes[index].unidadMedida ===
										'CAJ' ? (
											<CajaIcon height='18px' width='18px' />
										) : (
											<BotellaIcon height='15px' width='15px' />
										)}
										<Typography
											variant='caption'
											color={theme.palette.secondary.main}
											marginRight='2px'
										>
											x{promocion.promoPush?.componentes[index].cantidad}
										</Typography>
										<Typography
											variant='caption'
											fontFamily='Open Sans'
											color='#000'
										>
											{formatearNumero(componente.precioBase, t)}
										</Typography>
									</Box>
									<Box
										display='flex'
										gap='4px'
										justifyContent='end'
										marginBottom='12px'
									>
										<Typography
											variant='caption'
											color={theme.palette.primary.main}
										>
											{t('general.ahorras', {
												ahorras: formatearNumero(componente.descuento, t),
											})}
										</Typography>
									</Box>
									<Box display='flex' gap='4px' justifyContent='end'>
										<Typography variant='subtitle3' color='#000'>
											{t('general.total')}
										</Typography>
										<Typography variant='subtitle3' color='#000'>
											{formatearNumero(componente.descuento, t)}
										</Typography>
									</Box>
								</Box>
							</Box>
							{promocion.promoPush?.componentes &&
								index < promocion.promoPush.componentes.length - 1 && (
									<Divider />
								)}
						</Box>
					);
				})}
			</Box>
		</Box>
	);
};
