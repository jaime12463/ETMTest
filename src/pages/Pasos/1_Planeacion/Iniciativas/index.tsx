import React from 'react';
import TarjetaIniciativas from './TarjetaIniciativas';
import {useObtenerDatos} from 'redux/hooks';

const Iniciativas: React.FC = () => {
	const [expandido, setExpandido] = React.useState<string | boolean>(false);
	const datos = useObtenerDatos();

	return <TarjetaIniciativas />;
};

export default Iniciativas;
