import useObtenerRutas from './useObtenerRutas';

const Rutas = () => {
	const obtenerRutas = useObtenerRutas();

	return (
		<>
			{ obtenerRutas }
		</>
	);
};

export default Rutas;
