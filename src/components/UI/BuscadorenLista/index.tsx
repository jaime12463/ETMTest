import React, {useState} from 'react';
import {Grid, Box} from '@material-ui/core';
import {FormInput, List, Center} from 'components/UI';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';

const BuscadorenLista = ({
	lista,
	itemComponent,
	onClick,
	manejadorInput,
}: any) => {
	const {t} = useTranslation();
	const defaultValues = {
		buscador: '',
	};
	const {control, handleSubmit, setValue, getValues} = useForm({defaultValues});

	return (
		<>
			<Grid container>
				<Box m='auto' width={'90%'} mb={2} mt={1}>
					<Grid item xs>
						<FormInput
							onChangeForm={handleSubmit(manejadorInput)}
							control={control}
							name='buscador'
							inputDataCY='item-a-buscar'
							id='item-a-buscar'
							label={t('general.buscar')}
							autoFocus
						/>
					</Grid>
				</Box>
				<Grid item xs={12}>
					<List
						headers={[]}
						ItemComponent={itemComponent}
						items={lista}
						onClickItem={onClick}
						dataCY='listado-buscador'
					/>
				</Grid>
			</Grid>
		</>
	);
};

export default BuscadorenLista;
