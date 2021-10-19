import {Box, Typography, TextField, Grid, Input} from '@mui/material';
import {
	TConsolidadoImplicitos,
	TStateSubUnidadesEnvases,
	TPrecioProducto,
	TPedido,
	TProductoPedido,
} from 'models';
import {Dialogo, TarjetaDoble} from 'components/UI';
import {formatearNumero} from 'utils/methods';
import Chip from '@mui/material/Chip';
import botella from 'assests/iconos/botella.svg';
import caja from 'assests/iconos/caja.svg';

import {ETiposDePago} from 'models';
import {useTranslation} from 'react-i18next';
import {styled} from '@mui/material/styles';
import {Dispatch, SetStateAction, useState} from 'react';
import {
	useMostrarAdvertenciaEnDialogo,
	useInicializarPreciosProductosDelClienteActual,
} from 'hooks';
import {useObtenerConfiguracion, useObtenerVisitaActual} from 'redux/hooks';
import {useAgregarProductoAlPedidoActual} from '../../hooks/useAgregarProductoAlPedidoActual';
import {InputTipoPedido} from '..';

const InputStyled = styled(Input)(({theme}) => ({
	borderRadius: '4px',
	border: 'none',
	width: '28px',
	height: '22px',
	backgroundColor: 'white',
	fontWeight: 600,
	lineHeight: '12px',
	fontSize: '12px',
}));

const ChipStyled = styled(Chip)(({theme}) => ({
	textAlign: 'center',
	fontFamily: 'Open Sans',
	width: '70px',
	height: '18px',
	padding: 0,
}));

const TarjetaEnvasesRetornables = ({
	envase,
}: {
	envase: TConsolidadoImplicitos;
}) => {
	const [preciosProductos, setPreciosProductos] = useState<TPrecioProducto[]>(
		[]
	);

	useInicializarPreciosProductosDelClienteActual(setPreciosProductos);
	const visitaActual = useObtenerVisitaActual();

	const productoEnPedidos = Object.values(visitaActual.pedidos).map(
		(pedido: TPedido) =>
			pedido.productos.find(
				(producto: TProductoPedido) =>
					producto.codigoProducto === envase.codigoImplicito
			)
	);

	const {t} = useTranslation();

	const {unidades, subUnidades} = envase;

	const unidadesIniciales = unidades;
	const subUnidadesIniciales = subUnidades;

	const [retorno, setRetorno] = useState<{
		unidades: number;
		subUnidades: number;
	}>({
		unidades: unidadesIniciales,
		subUnidades: subUnidadesIniciales,
	});

	/* 	const [unidadesVenta, setUnidadesVenta] = useState(
		productoEnPedidos[2] ? productoEnPedidos[2].unidades : 0
	);
	const [subUnidadesVenta, setSubUnidadesVenta] = useState(
		productoEnPedidos[2] ? productoEnPedidos[2].subUnidades : 0
	);

	const [unidadesPrestamo, setUnidadesPrestamo] = useState(
		productoEnPedidos[3] ? productoEnPedidos[3].unidades : 0
	);
	const [subUnidadesPrestamo, setSubUnidadesPrestamo] = useState(
		productoEnPedidos[3] ? productoEnPedidos[3].subUnidades : 0
	);

	const [unidadesRetorno, setUnidadesRetorno] = useState(
		unidadesIniciales - unidadesVenta - unidadesPrestamo
	);
	const [subUnidadesRetorno, setSubUnidadesRetorno] = useState(
		subUnidadesIniciales - subUnidadesVenta - subUnidadesPrestamo
	); */

	const {mostrarAdvertenciaEnDialogo, mostarDialogo, parametrosDialogo} =
		useMostrarAdvertenciaEnDialogo();

	const configuracion = useObtenerConfiguracion();

	const agregarProductoAlPedidoActual = useAgregarProductoAlPedidoActual();
	const productoEnvase = preciosProductos.find(
		(producto: TPrecioProducto) =>
			producto.codigoProducto === envase.codigoImplicito
	);

	const pedidosEnvasesHabilitados =
		configuracion.tipoPedidoEnvasesHabilitados.map((tipoEnvases) =>
			configuracion.tipoPedidos.find(
				(tipoPedidos) => tipoPedidos.codigo === tipoEnvases
			)
		);

	const buscarPedidoValorizado = configuracion.tipoPedidoEnvasesHabilitados.map(
		(tipoEnvases) =>
			configuracion.tipoPedidos.find(
				(tipoPedidos) => tipoPedidos.codigo === tipoEnvases
			)?.esValorizado === true
	);

	const tipoPedidosEnvases = pedidosEnvasesHabilitados.map((tipoEnvases) => ({
		tipoEnvase: tipoEnvases?.descripcionCorta,
		unidades: 0,
		subUnidades: 0,
	}));

	const envasesDefault = tipoPedidosEnvases;

	const [valoresEnvase, setValoresEnvase] = useState(envasesDefault);

	let tieneTipoPedidoValorizado = buscarPedidoValorizado.includes(true);

	const cambioSubUnidadesPorTipoPedido = (
		subUnidadesIngresadas: number,
		tipoEnvase: string,
		totalSubUnidadesTiposEnvase: any,
		codigoTipoPedidoActual: string | undefined
	): boolean => {
		let unidadesPermitidas = false;

		let envaseActual = valoresEnvase.find(
			(envase: any) => envase.tipoEnvase === tipoEnvase
		);

		if (!Number.isNaN(subUnidadesIngresadas) && envaseActual && tipoEnvase)
			if (
				subUnidadesIngresadas <=
				retorno.subUnidades + envaseActual?.subUnidades
			) {
				setRetorno({
					...retorno,
					subUnidades: Number(
						unidadesIniciales -
							totalSubUnidadesTiposEnvase.subUnidades -
							subUnidadesIngresadas
					),
				});

				let newEnvases = valoresEnvase.filter(
					(envase: any) => envase.tipoEnvase !== tipoEnvase
				);

				newEnvases.push({
					tipoEnvase: tipoEnvase,
					unidades: envaseActual.unidades,
					subUnidades: Number(subUnidadesIngresadas),
				});

				//console.log(newEnvases);

				setValoresEnvase(newEnvases);

				unidadesPermitidas = true;

				agregarProductoAlPedidoActual(
					productoEnvase,
					envaseActual.unidades,
					subUnidadesIngresadas,
					envase.tipoPago,
					codigoTipoPedidoActual
				);
			} else
				mostrarAdvertenciaEnDialogo(
					t('advertencias.cantidadSuperiorEnvases'),
					'supera-cantidad-en-envases'
				);

		return unidadesPermitidas;
	};

	const cambioUnidadesPorTipoPedido = (
		unidadesIngresadas: number,
		tipoEnvase: string,
		totalUnidadesTiposEnvase: any,
		codigoTipoPedidoActual: string | undefined
	): boolean => {
		let unidadesPermitidas = false;

		let envaseActual = valoresEnvase.find(
			(envase: any) => envase.tipoEnvase === tipoEnvase
		);

		if (!Number.isNaN(unidadesIngresadas) && envaseActual && tipoEnvase)
			if (unidadesIngresadas <= retorno.unidades + envaseActual?.unidades) {
				setRetorno({
					...retorno,
					unidades: Number(
						unidadesIniciales -
							totalUnidadesTiposEnvase.unidades -
							unidadesIngresadas
					),
				});

				let newEnvases = valoresEnvase.filter(
					(envase: any) => envase.tipoEnvase !== tipoEnvase
				);

				console.log(retorno);

				newEnvases.push({
					tipoEnvase: tipoEnvase,
					unidades: Number(unidadesIngresadas),
					subUnidades: envaseActual.subUnidades,
				});

				//console.log(newEnvases);

				setValoresEnvase(newEnvases);

				unidadesPermitidas = true;

				agregarProductoAlPedidoActual(
					productoEnvase,
					unidadesIngresadas,
					envaseActual.subUnidades,
					envase.tipoPago,
					codigoTipoPedidoActual
				);
			} else
				mostrarAdvertenciaEnDialogo(
					t('advertencias.cantidadSuperiorEnvases'),
					'supera-cantidad-en-envases'
				);

		return unidadesPermitidas;
	};

	return (
		<>
			{mostarDialogo && <Dialogo {...parametrosDialogo} />}
			<TarjetaDoble
				derecha={
					<Grid
						container
						p={1}
						spacing={1}
						maxWidth={'180px'}
						maxHeight={'125px'}
					>
						<Grid
							item
							display='flex'
							alignItems='center'
							justifyContent='flex-end'
							xs={12}
							ml={4}
						>
							<Grid
								item
								xs={4}
								display='flex'
								alignItems='center'
								justifyContent='flex-start'
								mr={-0.4}
							>
								<img style={{width: '19px'}} src={caja} alt='icono caja' />
							</Grid>
							<Grid
								item
								xs={5}
								display='flex'
								alignItems='center'
								justifyContent='center'
							>
								<img
									style={{width: '19px'}}
									src={botella}
									alt='icono botella'
								/>
							</Grid>
						</Grid>
						<Grid
							item
							display='flex'
							alignItems='center'
							justifyContent='space-between'
							xs={12}
						>
							<Grid item xs={4}>
								<Typography fontFamily='Open Sans' variant={'caption'}>
									{'Retorno:'}
								</Typography>
							</Grid>

							<Grid item xs={3}>
								<InputStyled
									inputProps={{style: {textAlign: 'center'}}}
									disableUnderline
									value={retorno.unidades}
									readOnly
								/>
							</Grid>

							<Grid item xs={3}>
								<InputStyled
									inputProps={{style: {textAlign: 'center'}}}
									disableUnderline
									value={retorno.subUnidades}
									readOnly
								/>
							</Grid>
						</Grid>

						{pedidosEnvasesHabilitados?.map((tipoPedido) => (
							<InputTipoPedido
								tipoPedido={tipoPedido}
								stateTipoEnvases={{valoresEnvase, setValoresEnvase}}
								cambioUnidadesPorTipoPedido={cambioUnidadesPorTipoPedido}
								cambioSubUnidadesPorTipoPedido={cambioSubUnidadesPorTipoPedido}
							/>
						))}
					</Grid>
				}
				izquierda={
					<Box p={1.5} pb={0} minWidth={'304px'} minHeight={'125px'}>
						<Box
							style={{
								visibility:
									envase.tipoPago === undefined ? 'hidden' : 'visible',
							}}
							sx={{
								width: '80px',
								height: '16px',
								marginBottom: 2,
							}}
						>
							{envase.tipoPago !== undefined && (
								<ChipStyled
									label={
										<Typography
											variant={'caption'}
											color='white'
											textAlign='center'
											p={0}
										>
											{ETiposDePago[envase.tipoPago]}
										</Typography>
									}
									color={envase.tipoPago === 1 ? 'success' : 'primary'}
								/>
							)}
						</Box>
						<Typography fontFamily='Open Sans' variant={'subtitle2'}>
							{envase.codigoImplicito}
						</Typography>
						<Typography variant={'subtitle2'}>
							{envase.nombreImplicito}
						</Typography>
						<br />
						<Box
							display='flex'
							width={'60%'}
							alignItems='center'
							justifyContent='space-between'
						>
							{tieneTipoPedidoValorizado && (
								<>
									<img style={{width: '19px'}} src={caja} alt='icono caja' />
									<Typography variant={'caption'}>
										{`x${envase.presentacion} `}
									</Typography>
									<Typography variant={'subtitle3'}>
										{envase.precioConImpuestoUnidad &&
											formatearNumero(envase.precioConImpuestoUnidad, t)}
									</Typography>

									<img
										style={{width: '19px'}}
										src={botella}
										alt='icono botella'
									/>
									<Typography variant={'subtitle3'}>
										{envase.precioConImpuestoSubunidad &&
											formatearNumero(envase.precioConImpuestoSubunidad, t)}
									</Typography>
								</>
							)}
						</Box>
					</Box>
				}
			></TarjetaDoble>
		</>
	);
};

export default TarjetaEnvasesRetornables;
