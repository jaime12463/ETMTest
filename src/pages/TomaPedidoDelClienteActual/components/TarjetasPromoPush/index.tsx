import {List} from 'components/UI';
import {ItemTarjetaPromoPush} from '..';
import {useObtenerPromoPushDelCliente} from 'hooks';
import React, {useState} from 'react';

const TarjetasPromoPush = () => {
	const obtenerPromoPushDelCliente = useObtenerPromoPushDelCliente();
	const [expanded, setExpanded] = useState<string>('');

	const handleChange = (retorno: any) => (event: React.ChangeEvent<{}>) => {
		console.log("panel clik", retorno);
		if (retorno.modo=='expand')
		{
			setExpanded(retorno.estado);
		}
		
	};
	const handleSelect = (item: any) => (event: React.ChangeEvent<{}>) => {
		console.log("On Select", item);
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
