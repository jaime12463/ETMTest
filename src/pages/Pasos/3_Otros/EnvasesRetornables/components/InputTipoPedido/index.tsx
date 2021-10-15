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
};

const InputTipoPedido: FunctionComponent<Props> = (props) => {
	const {tipoPedido} = props;

	const [unidadesTipoPedido, setUnidadesTipoPedido] = useState(
		/*productoEnPedidos[2] ? productoEnPedidos[2].unidades :*/ 0
	);
	const [subUnidadesTipoPedido, setSubUnidadesTipoPedido] = useState(
		/*productoEnPedidos[2] ? productoEnPedidos[2].subUnidades :*/ 0
	);

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
					<InputStyled
						inputProps={{style: {textAlign: 'center'}}}
						value={unidadesTipoPedido}
						disableUnderline
					/>
				</Grid>
				<Grid item xs={3}>
					<InputStyled
						inputProps={{style: {textAlign: 'center'}}}
						value={subUnidadesTipoPedido}
						disableUnderline
					/>
				</Grid>
			</Grid>
		</>
	);
};

export default InputTipoPedido;
