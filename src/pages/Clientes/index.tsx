import {Grid, Typography} from '@material-ui/core';
import {Input, Estructura} from '../../components';
import {TInputsCodigoCliente} from '../../models';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import { useState } from 'react';
import {useMostrarAdvertenciaEnDialogo} from 'hooks'
import {useAsignarPedidoActual} from './hooks'
import Dialogo, {Props as PropsDialogo} from 'components/Dialogo';

const Clientes = () => {
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

    const asignarPedidoActual = useAsignarPedidoActual(
		mostrarAdvertenciaEnDialogo,
	);

	return (
		<Estructura titulo={'titulos.clientes'}>
            {mostarDialogo && <Dialogo {...parametrosDialogo} />}
			<Grid item xs={6} sm={6}>
				<form onSubmit={handleSubmit(asignarPedidoActual)}>
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
