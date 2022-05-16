import React from 'react';
import Box from '@mui/material/Box';
import Controles from './Controles';
import Informacion from './Informacion';
import {useObtenerProductoPorCodigo} from 'hooks/useObtenerProductoPorCodigo';
import {Contador} from 'hooks';

interface Props {
	codigoProducto: number;
	unidadMedida: string;
	contador: Contador;
	idBonificacion: number;
	idGrupo: number;
	resetBonificaciones: boolean;
	statefocusId: any;
	statePrimerProductoAgregado: any;
}

const TarjetaBonificacion: React.FC<Props> = ({
	codigoProducto,
	contador,
	idBonificacion,
	idGrupo,
	resetBonificaciones,
	statefocusId,
	statePrimerProductoAgregado,
	unidadMedida,
}) => {
	const obtenerProductoPorCodigo = useObtenerProductoPorCodigo();
	const producto = obtenerProductoPorCodigo(codigoProducto);
	if (!producto) return null;

	return (
		<>
			<Box display='flex'>
				<Informacion producto={producto} unidadMedida={unidadMedida} />
				<Controles
					contador={contador}
					idBonificacion={idBonificacion}
					idGrupo={idGrupo}
					producto={producto}
					resetBonificaciones={resetBonificaciones}
					statefocusId={statefocusId}
					statePrimerProductoAgregado={statePrimerProductoAgregado}
					unidadMedida={unidadMedida}
				/>
			</Box>
		</>
	);
};

export default TarjetaBonificacion;
