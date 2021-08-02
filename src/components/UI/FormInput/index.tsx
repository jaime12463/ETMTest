import {FormEventHandler, FunctionComponent} from 'react';
import Input, {PropsInput} from 'components/UI/Input';
import {Box, InputLabel, Typography} from '@material-ui/core';

export type Props = {
	onChangeForm?: FormEventHandler<HTMLFormElement> | undefined;
	onSubmitForm?: FormEventHandler<HTMLFormElement> | undefined;
	labelForm?: string;
};

const FormInput: FunctionComponent<Props & PropsInput> = (props) => {
	const {onChangeForm, onSubmitForm, labelForm, ...other} = props;
	const defaultFunction = (e: React.FormEvent<HTMLFormElement>) =>
		e.preventDefault();
	return (
		<>
			<Box pb={1}>
				<InputLabel htmlFor={other.id}>
					<Typography variant='body2'>{labelForm}</Typography>
				</InputLabel>
			</Box>
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
		</>
	);
};

export default FormInput;
