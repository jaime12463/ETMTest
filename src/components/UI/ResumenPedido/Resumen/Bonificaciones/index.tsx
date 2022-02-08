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

	return (
		<>
			{bonificaciones.map((bonificacion, index) => {
				if (bonificacion.detalle.length === 0) {
					return;
				}

				return (
					<Box key={bonificacion.id}>
						<Box display='flex' flex='1' flexDirection='column'>
							{bonificacion.detalle.map((detalle, index) => {
								const producto = useObtenerProductoPorCodigo(
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
														marginBottom={producto.atributos ? 0 : '6px'}
													>
														{producto.nombreProducto}
													</Typography>
													{producto.atributos && (
														<Typography
															margin='4px 0 6px 0'
															variant='caption'
															color={theme.palette.secondary.main}
														>
															{`${
																medidas[producto.atributos?.medida ?? 0]
																	.descripcion
															} | ${
																envases[producto.atributos?.envase ?? 0]
																	.descripcion
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
															variant='subtitle3'
															fontFamily='Open Sans'
														>
															{detalle.cantidad}
														</Typography>
													</Box>
												</Box>
											</Box>
											<Box
												display='flex'
												flexBasis='143px'
												flexDirection='column'
												gap='4px'
												justifyContent='center'
												padding='8px '
												sx={{background: '#F5F0EF'}}
											>
												<Typography
													variant='caption'
													fontFamily='Open Sans'
													color='#000'
												>
													{`${t('general.tipo')}:`}
												</Typography>
												<Typography variant='subtitle3'>
													{t('general.bonificacion')}
												</Typography>
											</Box>
										</Box>
										{index < bonificacion.detalle.length - 1 && <Divider />}
									</Box>
								);
							})}
						</Box>

						{index < bonificaciones.length - 1 &&
							bonificaciones[index + 1].detalle.length > 0 && <Divider />}
					</Box>
				);
			})}
		</>
	);
};
