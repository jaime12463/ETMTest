import {FormEventHandler, FunctionComponent} from 'react';
import Input, {PropsInput} from 'components/UI/Input';

export type Props = {
	onChangeForm?: FormEventHandler<HTMLFormElement> | undefined;
	onSubmitForm?: FormEventHandler<HTMLFormElement> | undefined;
};

const FormInput: FunctionComponent<Props & PropsInput> = (props) => {
	const {onChangeForm, onSubmitForm, ...other} = props;
	const defaultFunction = (e: React.FormEvent<HTMLFormElement>) =>
		e.preventDefault();
	return (
		<form
			onChange={onChangeForm ?? defaultFunction}
			onSubmit={onSubmitForm ?? defaultFunction}
		>
			<Input
				{...other}
				inputProps={{
					autoComplete: 'off',
				}}
			/>
		</form>
	);
};

export default FormInput;
