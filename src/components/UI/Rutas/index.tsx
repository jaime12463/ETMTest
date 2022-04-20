import useObtenerRutas from './useObtenerRutas';

export const Rutas: React.VFC = () => {
	const obtenerRutas = useObtenerRutas();

	return <>{obtenerRutas}</>;
};
