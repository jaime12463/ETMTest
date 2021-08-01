import {Box, Grid} from '@material-ui/core';
import useEstilos from './useEstilos';
import {Input, Estructura, Dialogo} from 'components/UI';
import {TInputsCodigoCliente} from 'models';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {useMostrarAdvertenciaEnDialogo} from 'hooks';
import {useInicializarClienteActual} from './hooks';

const Clientes = () => {
	const estilos = useEstilos();

	const {t} = useTranslation();

	const defaultValues: TInputsCodigoCliente = {
		codigoCliente: '',
	};

	const {control, handleSubmit} = useForm<TInputsCodigoCliente>({
		defaultValues,
	});

	const {
		mostrarAdvertenciaEnDialogo,
		mostarDialogo,
		parametrosDialogo,
	} = useMostrarAdvertenciaEnDialogo();

	const asignarClienteActual = useInicializarClienteActual(
		mostrarAdvertenciaEnDialogo
	);

	return (
		<Estructura titulo={t('titulos.clientes')}>
			<Estructura.Cuerpo>
				{mostarDialogo && <Dialogo {...parametrosDialogo} />}
				<Box mt={4}>
					<Grid item xs={4} sm={4}>
						<form onSubmit={handleSubmit(asignarClienteActual)}>
							<Input
								label={t('general.cliente')}
								name='codigoCliente'
								control={control}
								inputDataCY='codigo-cliente'
								autoFocus={true}
							/>
						</form>
					</Grid>
				</Box>
			</Estructura.Cuerpo>
		</Estructura>
	);
};

export default Clientes;
