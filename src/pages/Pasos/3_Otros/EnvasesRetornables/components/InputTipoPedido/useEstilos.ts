import {makeStyles, createStyles} from '@material-ui/styles';
import theme from 'theme';

interface Props {
	estadoUnidad: string;
	estadoSubUnidad: string;
}

const useEstilos = makeStyles(() =>
	createStyles({
		celdaUnidad: {
			border: ({estadoUnidad}: Props) => {
				switch (estadoUnidad) {
					case 'celdaOk':
						return 'none';
					case 'celdaError':
						return '1px solid #ff0000';
					default:
						throw new Error('Estado no válido');
				}
			},
		},
		celdaSubUnidad: {
			border: ({estadoSubUnidad}: Props) => {
				switch (estadoSubUnidad) {
					case 'celdaOk':
						return 'none';
					case 'celdaError':
						return '1px solid #ff0000';
					default:
						throw new Error('Estado no válido');
				}
			},
		},
	})
);

export default useEstilos;
