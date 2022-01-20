import {FunctionComponent, useEffect, useState} from 'react';
import {TEnvasesPedidos, TTipoPedido} from 'models';
import {Grid, Input, styled, Typography} from '@mui/material';
import {TConsolidadoImplicitos} from 'models';
import {useObtenerVisitaActual, useAppDispatch} from 'redux/hooks';
import {useMostrarAviso} from 'hooks';
import { useAgregarProductoAlPedidoActual } from '../../hooks/useAgregarProductoAlPedidoActual';
import { useTranslation } from 'react-i18next';
import useEstilos from './useEstilos';
import {modificarEnvasesConError, restablecerEnvasesConError} from 'redux/features/visitaActual/visitaActualSlice';

const InputStyled = styled(Input)(({theme}) => ({
	borderRadius: '4px',
	width: '28px',
	height: '22px',
	backgroundColor: 'white',
	fontWeight: 600,
	lineHeight: '12px',
	fontSize: '12px',
}));

type Props = {
	tipoPedido: TTipoPedido | undefined;
	stateTipoEnvases: any;
	productoEnvase: any;
	stateRetorno: any;
	datosEnvase: TConsolidadoImplicitos;
};

const InputTipoPedido: FunctionComponent<Props> = (props) => {
	const {
		tipoPedido,
		stateTipoEnvases,
		productoEnvase,
		stateRetorno,
		datosEnvase,
	} = props;

	const {t} = useTranslation();
	const dispatch = useAppDispatch();
	const mostrarAviso = useMostrarAviso();
	const agregarProductoAlPedidoActual = useAgregarProductoAlPedidoActual();

	const {valoresEnvase, setValoresEnvase} = stateTipoEnvases;

	const [envase, setEnvase] = useState({
		tipoEnvase: '',
		unidades: 0,
		subUnidades: 0,
	});

	const [otrosTiposEnvase, setOtrosTiposEnvase] = useState();
	const {retorno, setRetorno} = stateRetorno;

	const visitaActual = useObtenerVisitaActual();
	if (!tipoPedido) return <></>;
	const pedidoActual = visitaActual.pedidos[tipoPedido.codigo];

	const productoActual = pedidoActual?.productos.find(
		(producto) =>
			producto?.codigoProducto === productoEnvase?.codigoProducto &&
			producto?.tipoPago === datosEnvase.tipoPago
	);

	const calcularUnidades = () => {
		if (tipoPedido) {
			const envaseActual = valoresEnvase.find(
				(envase: any) => tipoPedido.descripcionCorta === envase.tipoEnvase
			);

			if (productoActual) {
				setEnvase({
					...envaseActual,
					unidades: Number(productoActual.unidades),
					subUnidades: Number(productoActual.subUnidades),
				});
			} else {
				setEnvase(envaseActual);
			}

			let otros = valoresEnvase.find(
				(envase: any) => tipoPedido.descripcionCorta !== envase.tipoEnvase
			);

			setOtrosTiposEnvase(otros);
		}
	};

	useEffect(() => {
		calcularUnidades();
	}, [visitaActual, valoresEnvase, tipoPedido, retorno]);

	const obtenerEnvasesActual = (tipoPedido: any, productoEnvase: any, datosEnvase: any) => {
		const pedidoActual = visitaActual.pedidos[tipoPedido.codigo];
	
		const productoActual = pedidoActual?.productos.find(
			(producto) =>
				producto?.codigoProducto === datosEnvase?.codigoImplicito &&
				producto?.tipoPago === datosEnvase.tipoPago
		);

		setDatosIngresados({
			unidadesIngresadas: productoActual ? productoActual.unidades : 0,
			estadoUnidades: true,
			subUnidadesIngresadas: productoActual ? productoActual.subUnidades : 0,
			estadoSubUnidades: true,
		});
	}

	useEffect(() => {
		dispatch(restablecerEnvasesConError());
		obtenerEnvasesActual(tipoPedido, productoEnvase, datosEnvase);
	}, []);

	const [datosIngresados, setDatosIngresados] = useState<TEnvasesPedidos>({
		unidadesIngresadas: 0,
		estadoUnidades: true,
		subUnidadesIngresadas: 0,
		estadoSubUnidades: true,
	});

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
						retorno.unidades -
							totalUnidadesTiposEnvase.unidades -
							unidadesIngresadas
					),
				});

				let newEnvases = valoresEnvase.filter(
					(envase: any) => envase.tipoEnvase !== tipoEnvase
				);

				newEnvases.push({
					tipoEnvase: tipoEnvase,
					unidades: Number(unidadesIngresadas),
					subUnidades: envaseActual.subUnidades,
				});

				setValoresEnvase(newEnvases);

				unidadesPermitidas = true;

				agregarProductoAlPedidoActual(
					productoEnvase,
					Number(unidadesIngresadas),
					envaseActual.subUnidades,
					datosEnvase.tipoPago, //
					codigoTipoPedidoActual
				);

				if (!datosIngresados.estadoUnidades) {
					dispatch(modificarEnvasesConError({operacion: '-'}));
				}

				setDatosIngresados({
					...datosIngresados,
					estadoUnidades: true,
					unidadesIngresadas: unidadesIngresadas,
				});

			} else {
				setDatosIngresados({
					...datosIngresados,
					estadoUnidades: false,
					unidadesIngresadas: unidadesIngresadas,
				});

				if (datosIngresados.estadoUnidades)
					dispatch(modificarEnvasesConError({operacion: '+'}));

				agregarProductoAlPedidoActual(
					productoEnvase,
					0,
					envaseActual.subUnidades,
					datosEnvase.tipoPago, //
					codigoTipoPedidoActual
				);

				mostrarAviso(
					'error', 
					t('advertencias.cantidadSuperiorEnvases'),
					t('mensajes.cantidadSuperiorEnvases'),
					undefined,
					'cantidad-superior-envases'
				);
			}

		return unidadesPermitidas;
	};

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
						retorno.subUnidades -
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

				setValoresEnvase(newEnvases);

				unidadesPermitidas = true;

				agregarProductoAlPedidoActual(
					productoEnvase,
					envaseActual.unidades,
					Number(subUnidadesIngresadas),
					datosEnvase.tipoPago, //
					codigoTipoPedidoActual
				);

				if (!datosIngresados.estadoSubUnidades) {
					dispatch(modificarEnvasesConError({operacion: '-'}));
				}

				setDatosIngresados({
					...datosIngresados,
					estadoSubUnidades: true,
					subUnidadesIngresadas: subUnidadesIngresadas,
				});

			} else {
				setDatosIngresados({
					...datosIngresados,
					estadoSubUnidades: false,
					subUnidadesIngresadas: subUnidadesIngresadas,
				});

				if (datosIngresados.estadoSubUnidades)
					dispatch(modificarEnvasesConError({operacion: '+'}));

				agregarProductoAlPedidoActual(
					productoEnvase,
					envaseActual.unidades,
					0,
					datosEnvase.tipoPago, //
					codigoTipoPedidoActual
				);

				mostrarAviso(
					'error', 
					t('advertencias.cantidadSuperiorEnvases'),
					t('mensajes.cantidadSuperiorEnvases'),
					undefined,
					'cantidad-superior-envases'
				);
			}

		return unidadesPermitidas;
	};

	const classes = useEstilos({
		estadoUnidad: datosIngresados.estadoUnidades ? 'celdaOk' : 'celdaError',
		estadoSubUnidad: datosIngresados.estadoSubUnidades ? 'celdaOk' : 'celdaError',
	});

	return (
		<>
			<Grid
				item
				display='flex'
				alignItems='center'
				justifyContent='space-between'
				xs={12}
				key={tipoPedido?.descripcionCorta}
			>
				<Grid item xs={4}>
					<Typography
						fontFamily='Open Sans'
						variant={'caption'}
						style={{textTransform: 'capitalize'}}
					>
						{`${tipoPedido?.descripcionCorta}:`}
					</Typography>
				</Grid>
				<Grid item xs={3}>
					{tipoPedido && (
						<InputStyled
							inputProps={{style: {textAlign: 'center'}}}
							value={datosIngresados.unidadesIngresadas}
							disableUnderline
							onChange={(e) => {
								setDatosIngresados({
									...datosIngresados,
									unidadesIngresadas: Number(e.target.value)
								});
								cambioUnidadesPorTipoPedido(
									Number(e.target.value),
									envase?.tipoEnvase,
									otrosTiposEnvase,
									tipoPedido.codigo
								);
							}}
							onFocus={(e) => e.target.select()}
							type="number"
							className={classes.celdaUnidad}
							id="inputUnidades"
						/>
					)}
				</Grid>
				<Grid item xs={3}>
					{tipoPedido && (
						<InputStyled
							inputProps={{style: {textAlign: 'center'}}}
							value={datosIngresados.subUnidadesIngresadas}
							disableUnderline
							onChange={(e) => {
								setDatosIngresados({
									...datosIngresados,
									subUnidadesIngresadas: Number(e.target.value)
								});
								cambioSubUnidadesPorTipoPedido(
									Number(e.target.value),
									envase?.tipoEnvase,
									otrosTiposEnvase,
									tipoPedido.codigo
								);
							}}
							onFocus={(e) => e.target.select()}
							type="number"
							className={classes.celdaSubUnidad}
							id="inputSubunidades"
						/>
					)}
				</Grid>
			</Grid>
		</>
	);
};

export default InputTipoPedido;
