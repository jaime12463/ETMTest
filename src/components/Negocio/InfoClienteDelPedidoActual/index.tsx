import {Grid, Typography} from '@mui/material';
import {TClienteActual} from 'models';
import {FunctionComponent} from 'react';
import {useObtenerClienteActual} from 'redux/hooks';

type Props = {};

const InfoClienteDelPedidoActual: FunctionComponent<Props> = (props) => {
	const clienteActual: TClienteActual = useObtenerClienteActual();
	const {codigoCliente, razonSocial} = clienteActual;
	return (
		<Grid container>
			<Grid item xs={12}>
				<Typography
					variant='body2'
					component='h5'
					style={{color: 'white'}}
					align='center'
				>
					{codigoCliente}
				</Typography>
			</Grid>
			<Grid item xs={12}>
				<Typography
					variant='body2'
					component='h5'
					style={{color: 'white'}}
					align='center'
				>
					{razonSocial}
				</Typography>
			</Grid>
		</Grid>
	);
};

export default InfoClienteDelPedidoActual;
