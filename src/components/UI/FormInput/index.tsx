import {FormEventHandler, FunctionComponent} from 'react';
import Input, {PropsInput} from 'components/UI/Input';

export type Props = {
	onChangeForm: FormEventHandler<HTMLFormElement> | undefined;
	onSubmitForm: FormEventHandler<HTMLFormElement> | undefined;
};

const FormInput: FunctionComponent<Props & PropsInput> = (props) => {
	const {onChangeForm, onSubmitForm, ...other} = props;
	return (
		<form onChange={onChangeForm} onSubmit={onSubmitForm}>
			<Input {...other} />
		</form>
	);
};

export default FormInput;
