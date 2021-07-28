import {BrowserRouter, Route} from 'react-router-dom';
import useRutaAnidada from './useRutaAnidada';

const Rutas = () => {
	const rutasAnidadas = useRutaAnidada();
	return <BrowserRouter>{rutasAnidadas}</BrowserRouter>;
};

export default Rutas;
