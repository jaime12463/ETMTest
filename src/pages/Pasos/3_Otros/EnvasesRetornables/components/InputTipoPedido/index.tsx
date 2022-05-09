import {FunctionComponent, useEffect, useState} from 'react';
import {TEnvases, TEnvasesPedidos, TTipoPedido} from 'models';
import {Input, styled, Typography} from '@mui/material';
import {TConsolidadoImplicitos} from 'models';
import {useObtenerVisitaActual, useAppDispatch} from 'redux/hooks';
import {useMostrarAviso} from 'hooks';
import {useAgregarProductoAlPedidoActual} from '../../hooks/useAgregarProductoAlPedidoActual';
import {useTranslation} from 'react-i18next';
import useEstilos from './useEstilos';
import {modificarEnvasesConError} from 'redux/features/visitaActual/visitaActualSlice';

const InputStyled = styled(Input)(() => ({
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
	habilitaSubUnidadesVenta: boolean;
	habilitaSubUnidadesPrestamo: boolean;
};

const InputTipoPedido: FunctionComponent<Props> = ({
	tipoPedido,
	stateTipoEnvases,
	productoEnvase,
	stateRetorno,
	datosEnvase,
	habilitaSubUnidadesVenta,
	habilitaSubUnidadesPrestamo,
}) => {
	const {t} = useTranslation();
	const dispatch = useAppDispatch();
	const mostrarAviso = useMostrarAviso();
	const agregarProductoAlPedidoActual = useAgregarProductoAlPedidoActual();

	const {valoresEnvase, setValoresEnvase} = stateTipoEnvases;

	const [envase, setEnvase] = useState<TEnvases>({
		tipoEnvase: '',
		unidades: 0,
		subUnidades: 0,
	});

	const [otrosTiposEnvase, setOtrosTiposEnvase] = useState<TEnvases>({
		tipoEnvase: '',
		unidades: 0,
		subUnidades: 0,
	});
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

	const obtenerEnvasesActual = (
		tipoPedido: any,
		productoEnvase: any,
		datosEnvase: any
	) => {
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
	};

	useEffect(() => {
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
		totalUnidadesTiposEnvase: TEnvases,
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
							(totalUnidadesTiposEnvase
								? totalUnidadesTiposEnvase.unidades
								: 0) -
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
					t('toast.cantidadSuperiorEnvasesTitulo'),
					t('toast.cantidadSuperiorEnvasesMensaje'),
					undefined,
					'cantidad-superior-envases'
				);
			}

		return unidadesPermitidas;
	};

	const cambioSubUnidadesPorTipoPedido = (
		subUnidadesIngresadas: number,
		tipoEnvase: string,
		totalSubUnidadesTiposEnvase: TEnvases,
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
							(totalSubUnidadesTiposEnvase
								? totalSubUnidadesTiposEnvase.subUnidades
								: 0) -
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
					`${t('toast.cantidadSuperiorEnvasesMensaje')}`,
					`${t('toast.cantidadSuperiorEnvasesTitulo')}`);
			}

		return unidadesPermitidas;
	};

	const classes = useEstilos({
		estadoUnidad: datosIngresados.estadoUnidades ? 'celdaOk' : 'celdaError',
		estadoSubUnidad: datosIngresados.estadoSubUnidades
			? 'celdaOk'
			: 'celdaError',
	});

	return (
		<>
			<Typography
				fontFamily='Open Sans'
				justifySelf='flex-end'
				marginRight='4px'
				sx={{
					gridArea:
						tipoPedido?.descripcionCorta === 'venta' ? 'Venta' : 'Prestamo',
					textTransform: 'capitalize',
				}}
				variant='caption'
			>
				{`${tipoPedido?.descripcionCorta}:`}
			</Typography>

			{tipoPedido && (
				<InputStyled
					className={classes.celdaUnidad}
					disableUnderline
					id='inputUnidades'
					inputProps={{style: {textAlign: 'center'}}}
					onChange={(e) => {
						setDatosIngresados({
							...datosIngresados,
							unidadesIngresadas: isNaN(Number(e.target.value))
								? 0
								: Number(e.target.value),
						});
						cambioUnidadesPorTipoPedido(
							isNaN(Number(e.target.value)) ? 0 : Number(e.target.value),
							envase?.tipoEnvase,
							otrosTiposEnvase,
							tipoPedido.codigo
						);
					}}
					onFocus={(e) => e.target.select()}
					sx={{
						gridArea:
							tipoPedido?.descripcionCorta === 'venta' ? 'VUnidad' : 'PUnidad',
						marginRight:
							habilitaSubUnidadesVenta || habilitaSubUnidadesPrestamo
								? '8px'
								: '0',
					}}
					type='tel'
					value={datosIngresados.unidadesIngresadas}
				/>
			)}

			{tipoPedido.codigo === 'ventaenvase' && habilitaSubUnidadesVenta && (
				<InputStyled
					className={classes.celdaSubUnidad}
					disableUnderline
					id='inputSubunidades'
					inputProps={{style: {textAlign: 'center'}}}
					onChange={(e) => {
						setDatosIngresados({
							...datosIngresados,
							subUnidadesIngresadas: isNaN(Number(e.target.value))
								? 0
								: Number(e.target.value),
						});
						cambioSubUnidadesPorTipoPedido(
							isNaN(Number(e.target.value)) ? 0 : Number(e.target.value),
							envase?.tipoEnvase,
							otrosTiposEnvase,
							tipoPedido.codigo
						);
					}}
					onFocus={(e) => e.target.select()}
					sx={{
						gridArea:
							tipoPedido?.descripcionCorta === 'venta'
								? 'VSubUnidad'
								: 'PSubUnidad',
					}}
					type='tel'
					value={datosIngresados.subUnidadesIngresadas}
				/>
			)}
			{tipoPedido.codigo === 'prestamoenvase' && habilitaSubUnidadesPrestamo && (
				<InputStyled
					className={classes.celdaSubUnidad}
					disableUnderline
					id='inputSubunidades'
					inputProps={{style: {textAlign: 'center'}}}
					onChange={(e) => {
						setDatosIngresados({
							...datosIngresados,
							subUnidadesIngresadas: isNaN(Number(e.target.value))
								? 0
								: Number(e.target.value),
						});
						cambioSubUnidadesPorTipoPedido(
							isNaN(Number(e.target.value)) ? 0 : Number(e.target.value),
							envase?.tipoEnvase,
							otrosTiposEnvase,
							tipoPedido.codigo
						);
					}}
					onFocus={(e) => e.target.select()}
					sx={{
						gridArea:
							tipoPedido?.descripcionCorta === 'venta'
								? 'VSubUnidad'
								: 'PSubUnidad',
					}}
					type='tel'
					value={datosIngresados.subUnidadesIngresadas}
				/>
			)}
		</>
	);
};

export default InputTipoPedido;
