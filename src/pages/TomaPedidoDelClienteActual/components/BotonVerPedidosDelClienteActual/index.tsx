import {FunctionComponent} from 'react';
import AssignmentIcon from '@material-ui/icons/Assignment';
import {IconButton} from '@material-ui/core';
import nombresRutas from 'routes/nombresRutas';
import {useRouteMatch, useHistory} from 'react-router-dom';

type Props = {};

const BotonVerPedidosDelClienteActual: FunctionComponent<Props> = (props) => {
	const history = useHistory();
	let {path} = useRouteMatch();
	return (
		<IconButton
			size='small'
			onClick={() => history.push(`${path}${nombresRutas.pedidosCliente}`)}
		>
			<AssignmentIcon style={{color: 'white'}} />
		</IconButton>
	);
};

export default BotonVerPedidosDelClienteActual;
