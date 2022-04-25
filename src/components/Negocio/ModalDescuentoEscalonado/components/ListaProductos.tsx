import React from 'react';
import {TPrecioProducto} from 'models';
import {Box, Typography, Divider} from '@mui/material';
import {CajaIcon, AgregarIcon} from 'assests/iconos';
import {formatearNumero} from 'utils/methods';
import {useObtenerDatos} from 'redux/hooks';
import theme from 'theme';
import {useTranslation} from 'react-i18next';
import {BotonSmall} from 'components/UI';

interface Props {
	agregarProductoAlPedido: (producto: TPrecioProducto) => void;
	productosParaMostrar: TPrecioProducto[];
}

export const ListaProductos: React.VFC<Props> = ({
	agregarProductoAlPedido,
	productosParaMostrar,
}) => {
	const {t} = useTranslation();
	const {envases, medidas} = useObtenerDatos();

	return (
		<>
			{!!productosParaMostrar.length && (
				<Box marginTop='36px'>
					<Divider />
					{productosParaMostrar?.map((producto, index) => {
						return (
							<Box key={producto.codigoProducto}>
								<Box
									alignItems='center'
									display='flex'
									gap='10px'
									justifyContent='space-between'
									margin='4px 0 10px 0'
								>
									<Box display='flex' flex='1' flexDirection='column'>
										<Typography
											color='#000'
											fontFamily='Open Sans'
											variant='subtitle3'
										>
											{producto.codigoProducto}
										</Typography>
										<Typography color='#000' variant='subtitle3'>
											{producto.nombreProducto}
										</Typography>
										{producto.atributos && (
											<Typography
												color='secondary'
												fontFamily='Open Sans'
												marginTop='4px'
												variant='caption'
											>
												{`${
													medidas[producto.atributos?.medida].descripcion
												} | ${envases[producto.atributos?.envase].descripcion}`}
											</Typography>
										)}
										<Box
											alignItems='center'
											display='flex'
											gap='2px'
											marginTop='6px'
										>
											<CajaIcon height={18} width={18} />
											<Typography
												color='secondary'
												fontFamily='Open Sans'
												variant='caption'
											>
												x{producto.presentacion}
											</Typography>
											<Typography
												color='#000'
												fontFamily='Open Sans'
												variant='subtitle3'
											>
												{formatearNumero(producto.precioConImpuestoUnidad, t)}
											</Typography>
										</Box>
									</Box>
									<BotonSmall onClick={() => agregarProductoAlPedido(producto)}>
										<AgregarIcon
											fill={theme.palette.secondary.main}
											height={10}
											width={10}
										/>
										<Typography
											color='secondary'
											fontFamily='Open Sans'
											variant='caption'
										>
											{t('general.agregarSKU')}
										</Typography>
									</BotonSmall>
								</Box>
								{index !== productosParaMostrar.length - 1 && <Divider />}
							</Box>
						);
					})}
				</Box>
			)}
		</>
	);
};
