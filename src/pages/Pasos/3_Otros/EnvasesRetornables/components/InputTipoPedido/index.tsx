import {TarjetaColapsable} from 'components/UI';
import {FunctionComponent, useState} from 'react';
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
};

type Envases = {
	tipoEnvase: string;
	unidades: number;
	subUnidades: number;
};

const InputTipoPedido: FunctionComponent<Props> = (props) => {
	const {tipoPedido, stateTipoEnvases} = props;
	const {valoresEnvase, setValoresEnvase} = stateTipoEnvases;
	/* 	const [envase, setEnvase] = useState<{
		tipoEnvase: string;
		unidades: number;
		subUnidades: number;
	}>({tipoEnvase: '', unidades: 0, subUnidades: 0}); */

	let envase: Envases = {tipoEnvase: '', unidades: 0, subUnidades: 0};

	if (tipoPedido) {
		let envaseActual = valoresEnvase.find(
			(envase: any) => tipoPedido.descripcionCorta === envase.tipoEnvase
		);

		envase = envaseActual;
	}

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
					<Typography fontFamily='Open Sans' variant={'caption'}>
						{`${tipoPedido?.descripcionCorta}:`}
					</Typography>
				</Grid>
				<Grid item xs={3}>
					{tipoPedido && (
						<InputStyled
							inputProps={{style: {textAlign: 'center'}}}
							value={envase?.unidades}
							disableUnderline
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
							onFocus={(e) => e.target.select()}
						/>
					)}
				</Grid>
			</Grid>
		</>
	);
};

export default InputTipoPedido;
