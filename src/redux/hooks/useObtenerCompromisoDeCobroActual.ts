import {TCompromisoDeCobro} from 'models';
import {useAppSelector} from 'redux/hooks';
import {selectCompromisoDeCobro} from 'redux/features/compromisoDeCobro/compromisoDeCobroSlice';

export const useObtenerCompromisoDeCobroActual = (): TCompromisoDeCobro => {
	const compromisoDeCobroActual: TCompromisoDeCobro = useAppSelector(
		selectCompromisoDeCobro
	);
	return compromisoDeCobroActual;
};
