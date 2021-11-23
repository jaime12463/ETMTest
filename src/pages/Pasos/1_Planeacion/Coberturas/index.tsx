import React from 'react';
import {useObtenerCoberturas} from 'hooks';
import Stack from '@mui/material/Stack';
import TarjetaCoberturas from './TarjetaCoberturas';

const Coberturas: React.FC = () => {
	const coberturas = useObtenerCoberturas();
	const [expandido, setExpandido] = React.useState<string | boolean>(false);

	return (
		<Stack marginTop='18px' spacing='10px'>
			{coberturas?.map((cobertura) => {
				return (
					<TarjetaCoberturas
						key={cobertura.secuenciaGrupoCobertura}
						id={cobertura.secuenciaGrupoCobertura.toString()}
						expandido={expandido}
						setExpandido={setExpandido}
						grupo={cobertura.grupoCobertura}
						codigosProductos={cobertura.productosGrupoCobertura}
					/>
				);
			})}
		</Stack>
	);
};

export default Coberturas;
