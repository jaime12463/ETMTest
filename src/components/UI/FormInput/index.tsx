import {FormEventHandler} from 'react';
import {Input, PropsInput} from 'components/UI';
import {Box, InputLabel, Typography} from '@mui/material';

interface Props {
	labelForm?: string;
	onChangeForm?: FormEventHandler<HTMLFormElement>;
	onSubmitForm?: FormEventHandler<HTMLFormElement>;
}

export const FormInput: React.FC<Props & PropsInput> = ({
	onChangeForm,
	onSubmitForm,
	labelForm,
	...other
}) => {
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
						min: '0',
					}}
				/>
			</form>
		</>
	);
};
