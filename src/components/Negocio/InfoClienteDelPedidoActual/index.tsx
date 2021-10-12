import {Grid, Stack, Typography} from '@mui/material';
import {TClienteActual} from 'models';
import {FunctionComponent} from 'react';
import {useObtenerClienteActual} from 'redux/hooks';

type Props = {};

// font-family: Poppins;
// font-style: normal;
// font-weight: bold;
// font-size: 16px;
// line - height: 16px;

const InfoClienteDelPedidoActual: FunctionComponent<Props> = (props) => {
	const clienteActual: TClienteActual = useObtenerClienteActual();
	const {codigoCliente, razonSocial} = clienteActual;
	return <>{razonSocial}</>;
};

export default InfoClienteDelPedidoActual;
