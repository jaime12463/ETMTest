import {Grid, Typography} from '@material-ui/core';
import {useObtenerClienteActual} from '../../hooks';
import {TClienteActual} from '../../models';
import useEstilos from './useEstilos';

const DatosClientes = () => {
	const clienteActual: TClienteActual = useObtenerClienteActual();
	const estilos = useEstilos();
	return (
		<>
			<Grid item xs={12}>
				<Typography
					className={estilos.margin}
					variant='body2'
					component='p'
					data-cy='info'
				>
					{`Cliente ${clienteActual.codigoCliente}`}
				</Typography>
				<Typography variant='body2' component='p' data-cy='info'>
					{`${clienteActual.razonSocial}`}
				</Typography>
			</Grid>
		</>
	);
};

export default DatosClientes;
