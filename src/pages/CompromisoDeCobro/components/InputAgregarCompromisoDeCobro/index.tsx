import {FormInput, Dialogo} from 'components/UI';
import {TInputsCompromisoDeCobro} from 'models';
import useEstilos from './useEstilos';
import {useMostrarAdvertenciaEnDialogo} from 'hooks';
import {useAgregarCompromisoDeCobro} from '../../hooks';
import {useForm} from 'react-hook-form';

const InputAgregarCompromisoDeCobro = () => {
	const estilos = useEstilos();

	const defaultValues: TInputsCompromisoDeCobro = {
		monto: '',
	};

	const {control, handleSubmit} = useForm<TInputsCompromisoDeCobro>({
		defaultValues,
	});

	const {
		mostrarAdvertenciaEnDialogo,
		mostarDialogo,
		parametrosDialogo,
	} = useMostrarAdvertenciaEnDialogo();

	const agregarCompromisoDeCobro = useAgregarCompromisoDeCobro(
		mostrarAdvertenciaEnDialogo
	);

	return (
		<div className={estilos.container}>
			{mostarDialogo && <Dialogo {...parametrosDialogo} />}
			<FormInput
				onSubmitForm={handleSubmit(agregarCompromisoDeCobro)}
				name='monto'
				type='number'
				control={control}
				inputDataCY='compromiso-cobro'
				autoFocus={true}
			/>
		</div>
	);
};
export default InputAgregarCompromisoDeCobro;
