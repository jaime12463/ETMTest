import {makeStyles, createStyles} from '@material-ui/styles';
import theme from 'theme';

export interface InputPropsEstilos {
	bordeError: boolean;
	cantidadMaximaConfig: number;
	subUnidades: number;
	unidades: number;
	unidadesDisponibles?: number;
}

export const useEstilos = makeStyles(() =>
	createStyles({
		input: {
			backgroundColor: '#fff',
			border: ({
				bordeError,
				cantidadMaximaConfig,
				subUnidades,
				unidades,
				unidadesDisponibles,
			}: InputPropsEstilos) => {
				if (bordeError) {
					if (unidades === 0 && subUnidades === 0) {
						return `1px solid ${theme.palette.primary.main}`;
					}

					if (unidadesDisponibles) {
						if (unidades > unidadesDisponibles) {
							return `1px solid ${theme.palette.primary.main}`;
						}
					}

					if (unidades > cantidadMaximaConfig) {
						return `1px solid ${theme.palette.primary.main}`;
					}
				}

				return `1px solid ${theme.palette.secondary.dark}`;
			},
			borderRadius: '10px',
			'& .MuiInput-input': {
				color: ({
					bordeError,
					cantidadMaximaConfig,
					subUnidades,
					unidades,
					unidadesDisponibles,
				}: InputPropsEstilos) => {
					if (bordeError) {
						if (unidades === 0 && subUnidades === 0) {
							return theme.palette.primary.main;
						}

						if (unidadesDisponibles) {
							if (unidades > unidadesDisponibles) {
								return theme.palette.primary.main;
							}
						}

						if (unidades > cantidadMaximaConfig) {
							return theme.palette.primary.main;
						}
					}

					return '#000';
				},
				fontFamily: 'Open Sans',
				fontSize: '12px',
				fontWeight: 600,
				lineHeight: '16px',
			},
			height: '16px',
			width: '42px',
		},
	})
);
