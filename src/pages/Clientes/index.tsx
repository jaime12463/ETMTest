import {Grid} from '@material-ui/core';
import {Input, Estructura, Dialogo} from 'components';
import {TInputsCodigoCliente} from 'models';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {useMostrarAdvertenciaEnDialogo} from 'hooks';
import {useAsignarClienteActual} from './hooks';

const Clientes = () => {
	const {t} = useTranslation();

	const {control, handleSubmit} = useForm<TInputsCodigoCliente>();

	const {
		mostrarAdvertenciaEnDialogo,
		mostarDialogo,
		parametrosDialogo,
	} = useMostrarAdvertenciaEnDialogo();

	const asignarClienteActual = useAsignarClienteActual(
		mostrarAdvertenciaEnDialogo
	);

	return (
		<Estructura titulo={'titulos.clientes'}>
			{mostarDialogo && <Dialogo {...parametrosDialogo} />}
			<Grid item xs={6} sm={6}>
				<form onSubmit={handleSubmit(asignarClienteActual)}>
					<Input
						label={t('general.cliente')}
						name='codigoCliente'
						control={control}
						inputDataCY='codigo-cliente'
					/>
				</form>
			</Grid>
		</Estructura>
	);
};

export default Clientes;
