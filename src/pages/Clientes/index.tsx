import {Grid} from '@material-ui/core';
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

	const {control, handleSubmit} = useForm<TInputsCodigoCliente>();

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
				<Grid item xs={6} sm={6} className={estilos.margin}>
					<form onSubmit={handleSubmit(asignarClienteActual)}>
						<Input
							label={t('general.cliente')}
							name='codigoCliente'
							control={control}
							inputDataCY='codigo-cliente'
							//TODO: Hacer mas pequeño este input
						/>
					</form>
				</Grid>
			</Estructura.Cuerpo>
		</Estructura>
	);
};

export default Clientes;
