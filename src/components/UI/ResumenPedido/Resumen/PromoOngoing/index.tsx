import React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import {BotellaIcon, CajaIcon} from 'assests/iconos';
import {useTranslation} from 'react-i18next';
import theme from 'theme';
import {TPromoOngoingAplicables} from 'utils/procesos/promociones/PromocionesOngoing';
import {EFormaBeneficio, TCodigoCantidad} from 'models/server';
import {useObtenerDatosProducto} from 'pages/Pasos/3_Otros/EnvasesRetornables/components/ContenedorEnvasesRetornables/hooks';
import {useObtenerDatos, useObtenerVisitaActual} from 'redux/hooks';
import {formatearNumero} from 'utils/methods';

export interface PromoOngoingProps {
	promocion: TPromoOngoingAplicables;
}

export const PromoOngoing: React.FC<PromoOngoingProps> = ({promocion}) => {
	const {t} = useTranslation();
	const {promocionID, beneficios, descripcion} = promocion;
	const obtenerDatosProducto = useObtenerDatosProducto();
	const secuencias = beneficios[0].secuencias;
	const {venta} = useObtenerVisitaActual().pedidos;

	const {envases, medidas} = useObtenerDatos();

	return (
		<Box border={`1px solid ${theme.palette.secondary.light}`}>
			<Box
				alignItems='center'
				display='flex'
				sx={{background: theme.palette.secondary.light}}
			>
				<Box
					flex='1'
					display='flex'
					flexDirection='column'
					gap='2px'
					padding='10px 8px 10px 14px'
				>
					<Typography variant='subtitle3' fontFamily='Open Sans' color='#fff'>
						{promocionID}
					</Typography>
					<Typography variant='subtitle3' color='#fff'>
						{descripcion}
					</Typography>
				</Box>
			</Box>
			{secuencias?.map((secuencia) => {
				const materialesBeneficio =
					secuencia.materialesBeneficio as TCodigoCantidad[];

				const beneficiosFiltrados = materialesBeneficio
					.filter((beneficio) => beneficio.cantidad > 0)
					.sort((a, b) => (a.codigo > b.codigo ? 1 : -1));

				return beneficiosFiltrados.map((beneficio) => {
					const {cantidad, codigo} = beneficio as TCodigoCantidad;

					const {nombre, atributos, presentacion} = obtenerDatosProducto(
						Number(codigo)
					);
					const producto = venta.productos.find(
						(p) => p.codigoProducto === Number(codigo)
					);

					return (
						<Box key={codigo}>
							<Divider sx={{borderColor: theme.palette.secondary.light}} />
							<Box>
								<Box display='flex'>
									<Box
										display='flex'
										flexDirection='column'
										gap='4px'
										flex='1'
										padding='8px 8px 8px 14px'
									>
										<Box display='flex' flexDirection='column'>
											<Typography variant='subtitle3' fontFamily='Open Sans'>
												{codigo}
											</Typography>
											<Typography variant='subtitle3'>{nombre}</Typography>
											{atributos && (
												<Typography
													margin='2px 0 8px 0'
													variant='caption'
													fontFamily='Open Sans'
													color='secondary'
												>{`${medidas[atributos?.medida].descripcion} | ${
													envases[atributos?.envase].descripcion
												}`}</Typography>
											)}
											<Box
												alignItems='center'
												display='flex'
												marginTop={atributos ? '' : '20px'}
												gap='6px'
											>
												{secuencia.unidadMedida === 'Unidad' ? (
													<>
														<Box alignItems='center' display='flex' gap='2px'>
															<CajaIcon height='18px' width='18px' />
															<Typography
																variant='caption'
																fontFamily='Open Sans'
																color='secondary'
															>
																x{presentacion}
															</Typography>
														</Box>
														{producto && (
															<Typography
																color='secondary'
																variant='caption'
																fontFamily='Open Sans'
																fontWeight={600}
															>
																{secuencia.formaBeneficio ===
																EFormaBeneficio.Precio
																	? formatearNumero(
																			producto.preciosPromo.unidad,
																			t
																	  )
																	: formatearNumero(
																			producto.precioConImpuestoUnidad,
																			t
																	  )}
															</Typography>
														)}
													</>
												) : (
													<BotellaIcon height='18px' width='18px' />
												)}
											</Box>
										</Box>
									</Box>
									<Box
										display='flex'
										flexBasis='143px'
										flexDirection='column'
										justifyContent='space-between'
										minHeight='100%'
										sx={{background: '#F5F0EF'}}
									>
										<Box
											display='flex'
											flexDirection='column'
											padding='8px 14px 8px 8px'
											gap='8px'
										>
											<Box
												alignItems='center'
												display='flex'
												justifyContent='space-between'
											>
												<Box alignItems='center' display='flex' gap='4px'>
													<Typography
														variant='caption'
														color='secondary'
														fontFamily='Open Sans'
													>
														{cantidad}
													</Typography>
													{secuencia.unidadMedida === 'Unidad' ? (
														<CajaIcon height='18px' width='18px' />
													) : (
														<BotellaIcon height='18px' width='18px' />
													)}
												</Box>
												{producto &&
													secuencia.formaBeneficio !==
														EFormaBeneficio.Obsequio && (
														<>
															<Typography
																variant='caption'
																fontFamily='Open Sans'
																color='#000'
															>
																{secuencia.formaBeneficio ===
																EFormaBeneficio.Precio
																	? secuencia.unidadMedida === 'Unidad'
																		? formatearNumero(
																				producto.preciosPromo.unidad * cantidad,
																				t
																		  )
																		: formatearNumero(
																				producto.preciosPromo.subUnidad *
																					cantidad,
																				t
																		  )
																	: secuencia.unidadMedida === 'Unidad'
																	? formatearNumero(
																			producto.precioConImpuestoUnidad *
																				cantidad,
																			t
																	  )
																	: formatearNumero(
																			producto.precioConImpuestoSubunidad *
																				cantidad,
																			t
																	  )}
															</Typography>
														</>
													)}
											</Box>
											{producto &&
												producto.preciosPromo &&
												secuencia.formaBeneficio !== EFormaBeneficio.Precio &&
												secuencia.formaBeneficio !==
													EFormaBeneficio.Obsequio && (
													<Box
														alignItems='center'
														display='flex'
														justifyContent='space-between'
													>
														<Typography
															variant='caption'
															color='primary'
															fontWeight={600}
														>
															{`${t('general.ahorraste')}:`}
														</Typography>
														<Typography
															variant='caption'
															color='primary'
															fontWeight={600}
														>
															{formatearNumero(
																producto.precioConImpuestoUnidad * cantidad -
																	producto?.preciosPromo.unidad * cantidad,
																t
															)}
														</Typography>
													</Box>
												)}
										</Box>
										{secuencia.formaBeneficio === EFormaBeneficio.Obsequio ? (
											<Typography
												variant='subtitle3'
												sx={{
													background: '#F5F0EF',
													padding: '8px 14px 8px 8px',
													width: '100%',
													mixBlendMode: 'multiply',
												}}
											>
												{t('general.obsequio')}
											</Typography>
										) : (
											<Box
												alignItems='center'
												display='flex'
												justifyContent='space-between'
												padding='8px 14px 8px 8px'
												sx={{background: '#F5F0EF', mixBlendMode: 'multiply'}}
											>
												<Typography
													variant='caption'
													color='#000'
													fontFamily='Open Sans'
													fontWeight={700}
												>
													{t('general.subTotal')}
												</Typography>
												{producto && producto.preciosNeto && (
													<Typography variant='subtitle3'>
														{formatearNumero(
															producto?.preciosPromo.unidad * cantidad,
															t
														)}
													</Typography>
												)}
											</Box>
										)}
									</Box>
								</Box>
							</Box>
						</Box>
					);
				});
			})}
		</Box>
	);
};
