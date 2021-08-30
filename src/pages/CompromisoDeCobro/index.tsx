import {FunctionComponent} from 'react';
import {TCliente, TClienteActual} from 'models';
import {useObtenerDatosCliente} from 'hooks';
import {useObtenerClienteActual} from 'redux/hooks';
import {Box, Grid, Paper} from '@material-ui/core';
import {
	ListadoDocumentos,
	InputAgregarCompromisoDeCobro,
	TarjetasPromoPush,
} from './components';
import {useObtenerMontoTotalDocumentos} from './hooks/useObtenerMontoTotalDocumentos';
import {Numero} from 'components/UI';

type Props = {};

const CompromisoDeCobro: FunctionComponent<Props> = (props) => {
	const {obtenerDatosCliente} = useObtenerDatosCliente();
	const totalDocumentos = useObtenerMontoTotalDocumentos();
	const clienteActual: TClienteActual = useObtenerClienteActual();
	const datosCliente: TCliente | undefined = obtenerDatosCliente(
		clienteActual.codigoCliente
	);
	const limiteDeCredito: number | undefined =
		datosCliente?.informacionCrediticia.limite;

	return (
		<>
			<Box my={2}>
				<Grid container>
					<Grid item xs={6}>
						{`Limite de Credito:`}
					</Grid>
					<Grid item xs={3}>
						<Numero valor={limiteDeCredito ? limiteDeCredito : 0} />
					</Grid>
				</Grid>
			</Box>
			<Box my={2}>
				<Grid container>
					<Grid item xs={6}>
						{`Disponible:`}
					</Grid>
					<Grid item xs={3}>
						<Numero
							valor={limiteDeCredito ? limiteDeCredito - totalDocumentos : 0}
						/>
					</Grid>
				</Grid>
			</Box>
			<Box my={2}>
				<Box>
					<Grid container>
						<Grid item xs={6}>
							{`Compromiso de Cobro:`}
						</Grid>
						<Grid item xs={4}>
							<Box my={-1.5}>
								<InputAgregarCompromisoDeCobro />
							</Box>
						</Grid>
					</Grid>
				</Box>
			</Box>
			<Box my={2}>
				{/* <ListadoDocumentos /> */}
				<TarjetasPromoPush />
			</Box>
		</>
	);
};

export default CompromisoDeCobro;
