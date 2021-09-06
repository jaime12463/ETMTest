import {List} from 'components/UI';
import {ItemTarjetaPromoPush} from '..';
import {useObtenerPromoPushDelCliente} from 'hooks';
import React, {useState} from 'react';

const TarjetasPromoPush = () => {
	const obtenerPromoPushDelCliente = useObtenerPromoPushDelCliente();
	const [expanded, setExpanded] = useState<string>('');

	const handleChange = (panel: string) => (event: React.ChangeEvent<{}>) => {
		setExpanded(panel);
	};

	return (
		<List
			headers={[]}
			items={
				obtenerPromoPushDelCliente !== undefined
					? obtenerPromoPushDelCliente
					: []
			}
			ItemComponent={ItemTarjetaPromoPush}
			onClickItem={handleChange}
			estado={expanded}
			dataCY='listado-promoPush'
		/>
	);
};

export default TarjetasPromoPush;
