import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import {TDetalleBonificacionesCliente} from 'models';
import {useObtenerProductoPorCodigo} from 'hooks/useObtenerProductoPorCodigo';
import {BotellaIcon, CajaIcon} from 'assests/iconos';
import {useTranslation} from 'react-i18next';
import theme from 'theme';
import {useObtenerDatos} from 'redux/hooks';

export interface BonificacionesProps {
	bonificaciones: {
		id: number | null;
		nombre: string;
		detalle: TDetalleBonificacionesCliente[];
	}[];
}

export const Bonificaciones: React.FC<BonificacionesProps> = ({
	bonificaciones,
}) => {
	const {t} = useTranslation();
	const {envases, medidas} = useObtenerDatos();
	const obtenerProductoPorCodigo = useObtenerProductoPorCodigo();

	return (
		<Box border={`1px solid ${theme.palette.secondary.main}`}>
			{bonificaciones.map((bonificacion, index) => {
				if (bonificacion.detalle.length === 0) {
					return;
				}

				return (
					<Box key={bonificacion.id}>
						<Box
							display='flex'
							flexDirection='column'
							padding='10px 14px'
							gap='2px'
							sx={{background: theme.palette.secondary.light}}
						>
							<Typography
								variant='subtitle3'
								color='#fff'
								fontFamily='Open Sans'
							>
								{bonificacion.id}
							</Typography>
							<Typography variant='subtitle3' color='#fff'>
								{bonificacion.nombre}
							</Typography>
						</Box>
						<Box display='flex' flex='1' flexDirection='column'>
							{bonificacion.detalle.map((detalle, index) => {
								const producto = obtenerProductoPorCodigo(
									detalle.codigoProducto
								);
								if (!producto) return null;

								return (
									<Box key={`${detalle.idGrupo}${index}`}>
										<Box display='flex'>
											<Box display='flex' flexDirection='column' flex='1'>
												<Box
													display='flex'
													flexDirection='column'
													padding='8px 8px 8px 14px'
												>
													<Typography
														variant='subtitle3'
														fontFamily='Open Sans'
													>
														{producto.codigoProducto}
													</Typography>
													<Typography
														variant='subtitle3'
														marginBottom={producto.atributos ? 0 : '8px'}
													>
														{producto.nombreProducto}
													</Typography>
													{producto.atributos && (
														<Typography
															margin='4px 0 8px 0'
															variant='caption'
															color={theme.palette.secondary.main}
														>
															{`${
																medidas[producto.atributos?.medida].descripcion
															} | ${
																envases[producto.atributos?.envase].descripcion
															}`}
														</Typography>
													)}
													<Box alignItems='center' display='flex' gap='4px'>
														{detalle.unidadMedida === 'Unidad' ? (
															<CajaIcon height='14px' width='14px' />
														) : (
															<BotellaIcon height='12px' width='12px' />
														)}
														<Typography
															variant='caption'
															color='secondary'
															fontFamily='Open Sans'
														>
															x{producto.presentacion}
														</Typography>
													</Box>
												</Box>
											</Box>
											<Box
												display='flex'
												flexBasis='143px'
												flexDirection='column'
												gap='4px'
												justifyContent='space-between'
												sx={{background: '#F5F0EF'}}
											>
												<Box
													alignItems='center'
													display='flex'
													gap='4px'
													padding='8px'
												>
													<Typography
														variant='caption'
														color='secondary'
														fontFamily='Open Sans'
													>
														{detalle.cantidad}
													</Typography>
													{detalle.unidadMedida === 'Unidad' ? (
														<CajaIcon height='18px' width='18px' />
													) : (
														<BotellaIcon height='18px' width='18px' />
													)}
												</Box>
												<Typography
													variant='subtitle3'
													padding='8px'
													sx={{background: '#F5F0EF', mixBlendMode: 'multiply'}}
												>
													{t('general.bonificacion')}
												</Typography>
											</Box>
										</Box>
										{index !== bonificacion.detalle.length - 1 && (
											<Divider
												sx={{borderColor: theme.palette.secondary.main}}
											/>
										)}
									</Box>
								);
							})}
						</Box>

						{index !== bonificaciones.length - 1 &&
							bonificaciones[index + 1].detalle.length > 0 && (
								<Divider sx={{borderColor: theme.palette.secondary.main}} />
							)}
					</Box>
				);
			})}
		</Box>
	);
};
