import {Grid, Typography} from '@material-ui/core';
import {Input, Estructura} from '../../components';
import {TInputsCodigoCliente} from '../../models';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {useState} from 'react';
import {useMostrarAdvertenciaEnDialogo} from 'hooks';
import {useAsignarClienteActual} from './hooks';
import Dialogo, {Props as PropsDialogo} from 'components/Dialogo';
import useEstilos from './useEstilos';

const Clientes = () => {
	const estilos = useEstilos();
	const {t} = useTranslation();

	const {control, handleSubmit, setValue, getValues} =
		useForm<TInputsCodigoCliente>();

	const [mostarDialogo, setMostarDialogo] = useState<boolean>(false);

	const [parametrosDialogo, setParametrosDialogo] = useState<PropsDialogo>({
		mensaje: '',
		manejadorClick: () => {},
		conBotonCancelar: false,
		dataCy: '',
	});

	const mostrarAdvertenciaEnDialogo = useMostrarAdvertenciaEnDialogo(
		setMostarDialogo,
		setParametrosDialogo
	);

	const asignarClienteActual = useAsignarClienteActual(
		mostrarAdvertenciaEnDialogo
	);

	return (
		<Estructura titulo={'titulos.clientes'}>
			{mostarDialogo && <Dialogo {...parametrosDialogo} />}
			<Grid item xs={6} sm={6} className={estilos.margin}>
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
