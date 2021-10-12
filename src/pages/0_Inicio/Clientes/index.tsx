import {Box, Grid} from '@mui/material';
import useEstilos from './useEstilos';
import {Estructura, Dialogo, FormInput} from 'components/UI';
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
					<Grid container>
						<Grid item xs={4} sm={4}>
							<FormInput
								onSubmitForm={handleSubmit(asignarClienteActual)}
								label={t('general.cliente')}
								name='codigoCliente'
								control={control}
								inputDataCY='codigo-cliente'
								autoFocus={true}
							/>
						</Grid>
					</Grid>
				</Box>
			</Estructura.Cuerpo>
		</Estructura>
	);
};

export default Clientes;
