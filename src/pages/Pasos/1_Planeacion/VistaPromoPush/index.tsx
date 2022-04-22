import React from 'react';
import {useObtenerPromoPushDelCliente} from 'hooks';
import {TarjetaVistaPromoPush} from './TarjetaVistaPromoPush';
import {Box, Stack} from '@mui/material';

export const VistaPromoPush: React.VFC = () => {
	const [expandidoPromoPush, setExpandidoexpandidoPromoPush] = React.useState<
		string | boolean
	>(false);
	const promociones = useObtenerPromoPushDelCliente();

	return (
		<Box display='flex' width='100%' justifyContent='center'>
			<Stack spacing='10px' marginTop='28px'>
				{promociones.length > 0 &&
					promociones.map((promocion: any) => {
						return (
							<TarjetaVistaPromoPush
								key={promocion.codigoProducto}
								item={promocion}
								id={promocion.nombreProducto}
								expandidoPromoPush={expandidoPromoPush}
								setExpandidoexpandidoPromoPush={setExpandidoexpandidoPromoPush}
							/>
						);
					})}
			</Stack>
		</Box>
	);
};
