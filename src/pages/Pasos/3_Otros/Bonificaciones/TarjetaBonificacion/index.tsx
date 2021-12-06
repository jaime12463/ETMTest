import React from 'react';
import Box from '@mui/material/Box';
import Controles from './Controles';
import Informacion from './Informacion';
import {useObtenerProductoPorCodigo} from 'hooks/useObtenerProductoPorCodigo';

interface Props {
	codigoProducto: number;
	unidadMedida: string;
	incrementar: (cantidad?: number) => void;
	decrementar: (cantidad?: number) => void;
	reiniciar: () => void;
	contador: number;
	estadoInicial: number;
	idBonificacion: number;
	idGrupo: number;
}

const TarjetaBonificacion: React.FC<Props> = ({
	codigoProducto,
	unidadMedida,
	incrementar,
	decrementar,
	reiniciar,
	contador,
	estadoInicial,
	idBonificacion,
	idGrupo,
}) => {
	const producto = useObtenerProductoPorCodigo(codigoProducto);
	if (!producto) return null;

	return (
		<Box display='flex'>
			<Informacion producto={producto} unidadMedida={unidadMedida} />
			<Controles
				producto={producto}
				contador={contador}
				estadoInicial={estadoInicial}
				incrementar={incrementar}
				decrementar={decrementar}
				reiniciar={reiniciar}
				idBonificacion={idBonificacion}
				unidadMedida={unidadMedida}
				idGrupo={idGrupo}
			/>
		</Box>
	);
};

export default TarjetaBonificacion;
