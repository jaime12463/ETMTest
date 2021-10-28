import {TarjetaColapsable} from 'components/UI';
import React, {FunctionComponent, useEffect, useState} from 'react';
import {TProductoPedido, ETiposDePago, TTipoPedido} from 'models';
import {Grid, Input, styled, Typography} from '@mui/material';
import {TConsolidadoImplicitos} from 'models';
import {useObtenerVisitaActual, useObtenerConfiguracion} from 'redux/hooks';
import {Dispatch, SetStateAction} from 'react';

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

type Props = {
	tipoPedido: TTipoPedido | undefined;
	stateTipoEnvases: any;
	cambioUnidadesPorTipoPedido: any;
	cambioSubUnidadesPorTipoPedido: any;
	productoEnvase: any;
	stateRetorno: any;
};

type Envases = {
	tipoEnvase: string;
	unidades: number;
	subUnidades: number;
};

const InputTipoPedido: FunctionComponent<Props> = (props) => {
	const {
		tipoPedido,
		stateTipoEnvases,
		cambioUnidadesPorTipoPedido,
		cambioSubUnidadesPorTipoPedido,
		productoEnvase,
		stateRetorno,
	} = props;
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
		(producto) => producto?.codigoProducto === productoEnvase?.codigoProducto
	);

	const calcularUnidades = () => {
		if (tipoPedido) {
			let envaseActual = valoresEnvase.find(
				(envase: any) => tipoPedido.descripcionCorta === envase.tipoEnvase
			);
			if (productoActual) {
				setEnvase({
					...envaseActual,
					unidades: Number(productoActual.unidades),
					subUnidades: Number(productoActual.subUnidades),
				});

				setRetorno({
					unidades: Number(
						retorno.unidades - productoActual.unidades < 0
							? 0
							: retorno.unidades - productoActual.unidades
					),
					subUnidades: Number(
						retorno.subUnidades - productoActual.subUnidades < 0
							? 0
							: retorno.subUnidades - productoActual.subUnidades
					),
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
	}, [visitaActual, valoresEnvase, tipoPedido]);

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
							value={envase?.unidades}
							disableUnderline
							onChange={(e) => {
								cambioUnidadesPorTipoPedido(
									e.target.value,
									envase?.tipoEnvase,
									otrosTiposEnvase,
									tipoPedido.codigo
								);
							}}
							onFocus={(e) => e.target.select()}
						/>
					)}
				</Grid>
				<Grid item xs={3}>
					{tipoPedido && (
						<InputStyled
							inputProps={{style: {textAlign: 'center'}}}
							value={envase?.subUnidades}
							disableUnderline
							onChange={(e) => {
								cambioSubUnidadesPorTipoPedido(
									e.target.value,
									envase?.tipoEnvase,
									otrosTiposEnvase,
									tipoPedido.codigo
								);
							}}
							onFocus={(e) => e.target.select()}
						/>
					)}
				</Grid>
			</Grid>
		</>
	);
};

export default InputTipoPedido;
