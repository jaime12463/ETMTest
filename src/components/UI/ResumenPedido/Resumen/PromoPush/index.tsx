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
	const {productos, envases, medidas} = useObtenerDatos();

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
					<Box display='flex' flexDirection='column' flex='1' gap='8px'>
						<Typography variant='caption' fontFamily='Open Sans' color='#fff'>
							{`${t('general.promocionesAplicadas')}:`}
						</Typography>
						<Box alignItems='center' display='flex' gap='6px'>
							<PromocionesRellenoIcon height='14px' width='13px' />
							<Typography variant='subtitle3' color='#fff' fontWeight={700}>
								{promocion.unidades}
							</Typography>
						</Box>
					</Box>
					<Box display='flex' flexDirection='column' gap='6px' flex='1'>
						<Box
							alignItems='center'
							display='flex'
							justifyContent='flex-end'
							paddingLeft='8px'
							marginTop='4px'
						>
							<Typography variant='caption' fontFamily='Open Sans' color='#fff'>
								{`${t('general.precioUnitario')}: ${formatearNumero(
									promocion.precioConImpuestoUnidad +
										promocion.descuentoPromoPush!,
									t
								)}`}
							</Typography>
						</Box>
						<Box display='flex' justifyContent='flex-end'>
							<Typography variant='caption' fontFamily='Open Sans' color='#fff'>
								{`${t('general.ahorroTotal')}: ${formatearNumero(
									promocion.descuentoPromoPush!,
									t
								)}`}
							</Typography>
						</Box>
						<Box alignItems='center' display='flex' justifyContent='flex-end'>
							<Typography
								variant='subtitle3'
								fontFamily='Open Sans'
								sx={{background: theme.palette.primary.main}}
								color='#fff'
								padding='2px 12px'
								borderRadius='50px'
							>
								{`${t('general.subTotal')}: ${formatearNumero(
									promocion.total,
									t
								)}`}
							</Typography>
						</Box>
					</Box>
				</Box>
			</Box>
			<Box border={`1px solid ${theme.palette.secondary.light}`}>
				<Box display='flex' flexDirection='row'>
					<Box flex='1' padding='8px 14px 12px 14px'>
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
					<Box
						flexBasis='143px'
						sx={{background: '#F5F0EF'}}
						padding='8px 14px'
					/>
				</Box>
				<Box>
					{promocion.componentes?.map((componente, index) => {
						return (
							<Box key={`${componente.codigoProducto}${index}`}>
								<Box display='flex'>
									<Box
										display='flex'
										flexDirection='column'
										flex='1'
										padding='6px 14px'
									>
										<Typography variant='subtitle3' fontFamily='Open Sans'>
											{componente.codigoProducto}
										</Typography>
										<Typography variant='subtitle3'>
											{productos[componente.codigoProducto].nombre}
										</Typography>
										{productos[componente.codigoProducto].atributos && (
											<Typography
												marginTop='4px'
												variant='caption'
												fontFamily='Open Sans'
												color='secondary'
											>
												{`${
													medidas[
														productos[componente.codigoProducto].atributos
															?.medida!
													].descripcion
												} | ${
													envases[
														productos[componente.codigoProducto].atributos
															?.envase!
													].descripcion
												}`}
											</Typography>
										)}
										<Box
											alignItems='center'
											display='flex'
											gap='4px'
											marginTop={
												productos[componente.codigoProducto].atributos
													? '8px'
													: '20px'
											}
										>
											<Box alignItems='center' display='flex' gap='2px'>
												{promocion.promoPush?.componentes[index]
													.unidadMedida === 'CAJ' ? (
													<CajaIcon height='18px' width='18px' />
												) : (
													<BotellaIcon height='18px' width='18px' />
												)}
												{promocion.promoPush?.componentes[index]
													.unidadMedida === 'CAJ' && (
													<Typography
														variant='caption'
														fontFamily='Open Sans'
														color='secondary'
													>
														x{productos[componente.codigoProducto].presentacion}
													</Typography>
												)}
											</Box>
											<Typography
												variant='caption'
												fontFamily='Open Sans'
												color='secondary'
												fontWeight={600}
											>
												{formatearNumero(componente.precioBase, t)}
											</Typography>
										</Box>
									</Box>
									<Box
										display='flex'
										flexDirection='column'
										justifyContent='space-between'
										flexBasis='143px'
										sx={{background: '#F5F0EF'}}
									>
										<Box
											display='flex'
											flexDirection='column'
											gap='8px'
											padding='6px 14px 8px 8px'
										>
											<Box
												alignItems='center'
												display='flex'
												justifyContent='space-between'
												gap='2px'
											>
												<Box alignItems='center' display='flex' gap='4px'>
													<Typography variant='caption' color='secondary'>
														{promocion.promoPush?.componentes[index].cantidad}
													</Typography>
													{promocion.promoPush?.componentes[index]
														.unidadMedida === 'CAJ' ? (
														<CajaIcon height='18px' width='18px' />
													) : (
														<BotellaIcon height='18px' width='18px' />
													)}
												</Box>
												<Typography
													variant='caption'
													fontFamily='Open Sans'
													color='#000'
												>
													{formatearNumero(
														componente.precioBase *
															promocion.promoPush?.componentes[index].cantidad!,
														t
													)}
												</Typography>
											</Box>
											<Box display='flex' justifyContent='space-between'>
												<Typography
													variant='caption'
													color='primary'
													fontWeight={600}
												>
													{`${t('general.ahorras')}:`}
												</Typography>
												<Typography
													variant='caption'
													color='primary'
													fontWeight={600}
												>
													-
													{formatearNumero(
														componente.descuento *
															promocion.promoPush?.componentes[index].cantidad!,
														t
													)}
												</Typography>
											</Box>
										</Box>
										<Box
											display='flex'
											justifyContent='space-between'
											padding='10px 14px 6px 8px'
											sx={{background: '#F5F0EF', mixBlendMode: 'multiply'}}
										>
											<Typography
												variant='caption'
												color='#000'
												fontWeight={700}
											>
												{`${t('general.subTotal')}:`}
											</Typography>
											<Typography variant='subtitle3' color='#000'>
												{formatearNumero(
													componente.precioFinal *
														promocion.promoPush?.componentes[index].cantidad!,
													t
												)}
											</Typography>
										</Box>
									</Box>
								</Box>
								{promocion.promoPush?.componentes &&
									promocion.promoPush.componentes.length - 1 !== index && (
										<Divider
											sx={{borderColor: theme.palette.secondary.light}}
										/>
									)}
							</Box>
						);
					})}
				</Box>
			</Box>
		</Box>
	);
};
