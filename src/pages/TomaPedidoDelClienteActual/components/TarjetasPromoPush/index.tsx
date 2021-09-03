import {List} from 'components/UI';
import {Box} from '@material-ui/core';
import {THeader} from 'models';
import {useTranslation} from 'react-i18next';
import {ItemTarjetaPromoPush} from '..';
import {useObtenerDeudasDelClienteActual} from 'hooks';
import React, {useState} from 'react';
import {StringLiteralLike} from 'typescript';

const TarjetasPromoPush = () => {
	const {t} = useTranslation();
	const documentosClienteActual = useObtenerDeudasDelClienteActual();

	const [expanded, setExpanded] = useState<string>('');

	const handleChange = (panel: string) => (event: React.ChangeEvent<{}>) => {
		setExpanded(panel);
	};

	return (
		<List
			headers={[]}
			items={['1', '2']}
			ItemComponent={ItemTarjetaPromoPush}
			onClickItem={handleChange}
			estado={expanded}
			dataCY='listado-promoPush'
		/>
	);
};

export default TarjetasPromoPush;
